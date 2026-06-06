import React, { useEffect, useRef, useState } from 'react'

const EnterScreen = ({ onEnter }) => {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  /* ── Subtle particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
      c: Math.random() > 0.5 ? '0,212,255' : '232,23,74',
      o: Math.random() * 0.35 + 0.08,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},${p.o})`
        ctx.fill()
      })
      // Connection lines
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - d / 110)})`
          ctx.lineWidth = 0.4; ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setTimeout(onEnter, 600)
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label="Enter Portfolio"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        cursor: 'pointer', overflow: 'hidden',
        opacity: clicked ? 0 : 1,
        transition: 'opacity 0.6s ease',
        WebkitTapHighlightColor: 'transparent',
        display: 'flex', alignItems: 'stretch',
      }}
    >

      {/* ══ BG: deep space base ══ */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #010208 0%, #03060f 40%, #020110 70%, #010208 100%)',
      }} />

      {/* ══ LUFFY IMAGE — right half, tall & clear ══ */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: '58%',
        overflow: 'hidden',
      }}>
        <img
          src="/luffy-enter.jpg"
          alt="Luffy One Piece"
          loading="eager"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.9,
            filter: 'saturate(1.3) brightness(0.95) contrast(1.08)',
            animation: 'es-drift 28s ease-in-out infinite',
            display: 'block',
          }}
        />
        {/* Edge fade — left edge of image blends into dark */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(2,3,12,1) 0%, rgba(2,3,12,0.55) 22%, rgba(2,3,12,0.0) 55%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 55%, rgba(2,3,12,0.7) 85%, rgba(2,3,12,1) 100%)',
        }} />
      </div>

      {/* ══ MOBILE: full-screen image behind everything ══ */}
      <div className="es-mobile-bg" style={{ position: 'absolute', inset: 0, display: 'none' }}>
        <img
          src="/luffy-enter.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: 0.45,
            filter: 'saturate(1.2) brightness(0.85)',
            animation: 'es-drift 28s ease-in-out infinite',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(2,3,12,0.3) 0%, rgba(2,3,12,0.6) 60%, rgba(2,3,12,0.97) 100%)',
        }} />
      </div>

      {/* ══ Particles ══ */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none', zIndex: 2 }} />

      {/* ══ Hex grid overlay ══ */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 1l28 16v33z' fill='none' stroke='rgba(0,212,255,0.04)' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V51l28-17 28 17v33z' fill='none' stroke='rgba(232,23,74,0.03)' stroke-width='1'/%3E%3C/svg%3E")`,
      }} />

      {/* ══ LEFT CONTENT PANEL ══ */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
        padding: 'clamp(2rem,5vw,5rem) clamp(2rem,6vw,7rem)',
      }}>
        <div style={{
          maxWidth: 520,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0) translateY(0)' : 'translateX(-30px) translateY(10px)',
          transition: 'opacity 1s ease 0.15s, transform 1s ease 0.15s',
        }}>

          {/* ── Status pill ── */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.28rem 0.9rem',
            border: '1px solid rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.06)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: 'clamp(0.55rem,1.2vw,0.65rem)',
            letterSpacing: '0.12em',
            color: 'rgba(0,212,255,0.85)',
            marginBottom: 'clamp(1.2rem,3vw,2rem)',
            clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00d4ff', boxShadow: '0 0 8px #00d4ff',
              animation: 'orb-pulse 2s ease-in-out infinite',
              display: 'inline-block', flexShrink: 0,
            }} />
            SYSTEM ONLINE · OPEN TO WORK
          </div>

          {/* ── Spinning hex logo ── */}
          <div style={{ position: 'relative', width: 'clamp(60px,7vw,88px)', height: 'clamp(60px,7vw,88px)', marginBottom: 'clamp(1rem,2.5vw,1.8rem)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spin-slow 7s linear infinite' }} viewBox="0 0 100 100">
              <defs>
                <linearGradient id="es-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8174a"/>
                  <stop offset="50%" stopColor="#00d4ff"/>
                  <stop offset="100%" stopColor="#e8174a"/>
                </linearGradient>
              </defs>
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="url(#es-g1)" strokeWidth="2" strokeDasharray="6 3"/>
            </svg>
            <svg style={{ position: 'absolute', inset: '14%', width: '72%', height: '72%', animation: 'spin-slow 12s linear infinite reverse' }} viewBox="0 0 100 100">
              <polygon points="50,8 92,31 92,69 50,92 8,69 8,31" fill="none" stroke="rgba(245,197,24,0.4)" strokeWidth="1" strokeDasharray="3 7"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                fontFamily: 'Orbitron,sans-serif', fontWeight: 900,
                fontSize: 'clamp(0.9rem,2vw,1.3rem)',
                background: 'linear-gradient(135deg,#fff,#a8c8ff)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>DJ</span>
            </div>
          </div>

          {/* ── Name ── */}
          <h1 style={{
            margin: 0,
            fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2.4rem,6.5vw,5.2rem)',
            lineHeight: 1.0, letterSpacing: '0.05em',
          }}>
            <span style={{
              display: 'block',
              background: 'linear-gradient(100deg, #c8dcff 0%, #ffffff 40%, #c8dcff 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>DIPENDRA</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(100deg, #e8174a 0%, #ff5533 45%, #f5c518 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 0 22px rgba(232,23,74,0.6))',
            }}>JOSHI</span>
          </h1>

          {/* ── Divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: 'clamp(0.8rem,2vw,1.4rem) 0' }}>
            <div style={{ height: 1, width: 'clamp(40px,5vw,65px)', background: 'linear-gradient(90deg,transparent,rgba(232,23,74,0.8))' }} />
            <span style={{ color: '#e8174a', fontSize: '0.45rem', opacity: 0.9 }}>◆</span>
            <div style={{ height: 1, width: 'clamp(40px,5vw,65px)', background: 'linear-gradient(270deg,transparent,rgba(0,212,255,0.8))' }} />
          </div>

          {/* ── Role line ── */}
          <p style={{
            margin: '0 0 clamp(0.6rem,1.5vw,1rem)',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 'clamp(0.85rem,2vw,1.15rem)',
            letterSpacing: '0.18em', color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
          }}>
            Full Stack Developer
          </p>

          <p style={{
            margin: '0 0 clamp(1rem,2.5vw,1.8rem)',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: 'clamp(0.58rem,1.3vw,0.68rem)',
            letterSpacing: '0.1em', color: 'rgba(0,212,255,0.55)',
          }}>
            ◆ BCA · GRAPHIC ERA HILL UNIVERSITY · DEHRADUN ◆
          </p>

          {/* ── Skill tags ── */}
          <div style={{ display: 'flex', gap: 'clamp(0.3rem,1vw,0.5rem)', flexWrap: 'wrap', marginBottom: 'clamp(1.5rem,4vw,2.8rem)' }}>
            {[
              { label: 'MERN Stack', color: '232,23,74' },
              { label: 'Full Stack', color: '0,212,255' },
            ].map(tag => (
              <span key={tag.label} style={{
                padding: 'clamp(0.18rem,0.5vw,0.25rem) clamp(0.55rem,1.5vw,0.85rem)',
                background: `rgba(${tag.color},0.08)`,
                border: `1px solid rgba(${tag.color},0.32)`,
                color: `rgba(${tag.color},0.9)`,
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: 'clamp(0.5rem,1.2vw,0.62rem)',
                letterSpacing: '0.08em',
                backdropFilter: 'blur(6px)',
                clipPath: 'polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)',
                transition: 'all 0.2s',
              }}>{tag.label}</span>
            ))}
          </div>

          {/* ── CTA button ── */}
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: 'clamp(0.65rem,1.8vw,0.9rem) clamp(1.6rem,4vw,2.8rem)',
              background: hover
                ? 'linear-gradient(135deg, rgba(232,23,74,0.28), rgba(0,212,255,0.2))'
                : 'linear-gradient(135deg, rgba(232,23,74,0.14), rgba(0,212,255,0.1))',
              border: `1px solid ${hover ? 'rgba(232,23,74,0.75)' : 'rgba(232,23,74,0.45)'}`,
              boxShadow: hover
                ? '0 0 40px rgba(232,23,74,0.35), 0 0 80px rgba(232,23,74,0.12), inset 0 0 20px rgba(232,23,74,0.08)'
                : '0 0 22px rgba(232,23,74,0.18), inset 0 0 12px rgba(232,23,74,0.04)',
              fontFamily: 'Orbitron, sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.6rem,1.6vw,0.75rem)',
              letterSpacing: '0.2em', color: '#fff',
              clipPath: 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {/* Pulse ring */}
            <div style={{
              position: 'absolute', inset: -5,
              border: '1px solid rgba(232,23,74,0.22)',
              animation: 'orb-pulse 2.4s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span style={{ fontSize: '0.8rem' }}>▶</span>
            PRESS ANYWHERE TO ENTER
          </div>

          {/* ── Pulse dots ── */}
          <div style={{ display: 'flex', gap: '0.45rem', marginTop: 'clamp(1rem,2.5vw,1.6rem)' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 'clamp(4px,0.8vw,6px)', height: 'clamp(4px,0.8vw,6px)', borderRadius: '50%',
                background: i === 1 ? '#e8174a' : 'rgba(255,255,255,0.18)',
                animation: `orb-pulse ${0.9 + i * 0.22}s ease-in-out infinite`,
                boxShadow: i === 1 ? '0 0 10px rgba(232,23,74,0.7)' : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ CORNER HUD BRACKETS ══ */}
      {[
        { top: 'clamp(10px,2vw,22px)', left: 'clamp(10px,2vw,22px)', borderTop: '2px solid rgba(0,212,255,0.7)', borderLeft: '2px solid rgba(0,212,255,0.7)' },
        { top: 'clamp(10px,2vw,22px)', right: 'clamp(10px,2vw,22px)', borderTop: '2px solid rgba(232,23,74,0.7)', borderRight: '2px solid rgba(232,23,74,0.7)' },
        { bottom: 'clamp(10px,2vw,22px)', left: 'clamp(10px,2vw,22px)', borderBottom: '2px solid rgba(232,23,74,0.7)', borderLeft: '2px solid rgba(232,23,74,0.7)' },
        { bottom: 'clamp(10px,2vw,22px)', right: 'clamp(10px,2vw,22px)', borderBottom: '2px solid rgba(0,212,255,0.7)', borderRight: '2px solid rgba(0,212,255,0.7)' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', zIndex: 11, pointerEvents: 'none',
          width: 'clamp(28px,4vw,52px)', height: 'clamp(28px,4vw,52px)', ...s,
        }} />
      ))}

      {/* ══ STATUS BAR ══ */}
      <div style={{
        position: 'absolute', bottom: 'clamp(10px,2vw,18px)',
        left: 0, right: 0, textAlign: 'center', zIndex: 11, pointerEvents: 'none',
        fontFamily: 'Share Tech Mono,monospace',
        fontSize: 'clamp(0.44rem,1vw,0.56rem)',
        color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em',
      }}>
        SYSTEM v2.0 · PORTFOLIO OS · {new Date().getFullYear()}
      </div>
    </div>
  )
}

export default EnterScreen
