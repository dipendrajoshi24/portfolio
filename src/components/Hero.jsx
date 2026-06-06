import React, { useEffect, useRef, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaExternalLinkAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      color: ['0,212,255', '232,23,74', '245,197,24'][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.5 + 0.15,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`
        ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20"
      style={{ background: 'linear-gradient(180deg, #03040a 0%, #060912 50%, #030208 100%)' }}>

      <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.8 }} />
      <div className="hex-bg absolute inset-0" />
      <div className="circuit-bg absolute inset-0" style={{ opacity: 0.4 }} />

      <div className="energy-orb orb-red" />
      <div className="energy-orb orb-blue" />
      <div className="energy-orb orb-gold" />

      <span className="kanji-deco" style={{ right: '4%', top: '12%', fontSize: '11rem' }}>力</span>
      <span className="kanji-deco" style={{ left: '3%', bottom: '15%', fontSize: '9rem' }}>夢</span>

      {/* Accent lines */}
      <div style={{ position: 'absolute', top: '28%', left: 0, width: '140px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4))', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '28%', right: 0, width: '140px', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(232,23,74,0.4))', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.3))', pointerEvents: 'none' }} />

      <div className={`relative z-20 text-center max-w-3xl mx-auto transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        {/* Status badge */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '0.3rem 1rem',
            border: '1px solid rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.05)',
            fontFamily: 'Share Tech Mono,monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            color: 'rgba(0,212,255,0.85)',
            clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff', display: 'inline-block', animation: 'orb-pulse 2s ease-in-out infinite' }} />
            SYSTEM ONLINE · OPEN TO OPPORTUNITIES
          </div>
        </div>

        {/* Profile avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-block" style={{ width: 168, height: 168 }}>
            <svg className="profile-ring-1 absolute inset-0" viewBox="0 0 160 160" style={{ width: '100%', height: '100%' }}>
              <circle cx="80" cy="80" r="76" fill="none" stroke="url(#ring1)" strokeWidth="1.5" strokeDasharray="8 4" />
              <defs>
                <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8174a" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="profile-ring-2 absolute" viewBox="0 0 160 160"
              style={{ width: '84%', height: '84%', top: '8%', left: '8%' }}>
              <circle cx="80" cy="80" r="76" fill="none" stroke="rgba(245,197,24,0.35)" strokeWidth="1" strokeDasharray="3 8" />
            </svg>
            <div style={{ position: 'absolute', top: 4, left: 4, width: 14, height: 14, borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderBottom: '2px solid #e8174a', borderRight: '2px solid #e8174a' }} />
            <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(0,212,255,0.3)', background: '#030a14' }}>
              <img src="/profile.jpg" alt="Dipendra Joshi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                className="animate-float"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:900;background:linear-gradient(135deg,#e8174a,#00d4ff);-webkit-background-clip:text;background-clip:text;color:transparent;">DJ</div>`
                }}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}>
          <span style={{ background: 'linear-gradient(135deg,#ffffff 0%,#a0c4ff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Dipendra
          </span>{' '}
          <span style={{ background: 'linear-gradient(135deg,#e8174a 0%,#f5c518 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
            className="glitch-hover">
            Joshi
          </span>
        </h1>

        {/* Typewriter */}
        <h2 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.75)', marginTop: '1rem', fontFamily: 'Rajdhani,sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
          Building{' '}
          <span className="typing-text">
            <Typewriter
              words={['Full Stack Applications', 'MERN Stack Projects', 'Python & ML Pipelines', 'Clean, Scalable Backends', 'Pixel-Perfect Frontends']}
              loop={0} cursor cursorStyle="|" typeSpeed={85} deleteSpeed={55} delaySpeed={1400}
            />
          </span>
        </h2>

        <p style={{ color: 'rgba(0,212,255,0.5)', letterSpacing: '0.12em', fontFamily: 'Share Tech Mono,monospace', fontSize: '0.7rem', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
          ◆ BCA · GRAPHIC ERA HILL UNIVERSITY · DEHRADUN ◆
        </p>

        {/* Divider */}
        <div style={{ width: 130, height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.4),rgba(232,23,74,0.4),transparent)', margin: '0 auto 1.5rem' }} />

        {/* Social Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
          <a href="https://github.com/dipendrajoshi24" target="_blank" rel="noopener noreferrer" className="icon-circle" title="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/dipendrajoshi" target="_blank" rel="noopener noreferrer" className="icon-circle" style={{ borderColor: 'rgba(0,119,181,0.4)' }} title="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:dipendrajoshi062@gmail.com" className="icon-circle" style={{ borderColor: 'rgba(232,23,74,0.4)' }} title="Email"><FaEnvelope /></a>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <a href="/resume.pdf" download="Dipendra_Joshi_Resume.pdf" className="grad-btn">
            <FaDownload size={11} /> RESUME
          </a>
          <button onClick={() => navigate('/projects')} className="outline-btn">
            <FaCode size={11} /> VIEW PROJECTS
          </button>
          <button onClick={() => navigate('/contact')} className="outline-btn" style={{ borderColor: 'rgba(232,23,74,0.4)', color: 'rgba(232,23,74,0.8)' }}>
            <FaEnvelope size={11} /> HIRE ME
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.3, fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: '#00d4ff' }}>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg,#00d4ff,transparent)', animation: 'float-y 1.5s ease-in-out infinite' }} />
          SCROLL
        </div>
      </div>
    </div>
  )
}

export default Hero
