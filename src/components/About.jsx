import React, { useEffect, useRef, useState } from 'react'

const stats = [
  { label: 'Projects', value: '6+', icon: '⬡', color: '#e8174a' },
  { label: 'Languages', value: '5+', icon: '◈', color: '#00d4ff' },
  { label: 'Frameworks', value: '4+', icon: '◆', color: '#f5c518' },
  { label: 'Degree', value: 'BCA', icon: '◉', color: '#7c3aed' },
]

const roles = ['Full Stack Developer', 'MERN Specialist', 'ML Engineer', 'Python Developer', 'Open Source']

const About = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-20 px-4"
      style={{ background: 'linear-gradient(180deg, #03040a 0%, #06090f 100%)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>

      <div className="circuit-bg absolute inset-0" />
      <div className="hex-bg absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="energy-orb orb-blue" style={{ opacity: 0.5 }} />
      <div className="energy-orb orb-red" style={{ opacity: 0.3, bottom: '-5%', left: '60%' }} />

      <span className="kanji-deco" style={{ left: '1%', top: '8%', fontSize: '11rem' }}>己</span>
      <span className="kanji-deco" style={{ right: '1%', bottom: '8%', fontSize: '8rem' }}>道</span>

      <div className="relative z-20 max-w-6xl w-full mx-auto">

        {/* Header */}
        <div style={{ marginBottom: '2.5rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <div className="power-badge" style={{ marginBottom: '0.75rem' }}>PROFILE.EXE</div>
          <h1 className="section-title section-title-blue">ABOUT ME</h1>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,#00d4ff,transparent)', marginTop: '0.6rem' }} />
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'center',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.8s ease 0.15s'
        }}>

          {/* Image — compact */}
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <div style={{ width: 170, height: 200, position: 'relative' }}>
              <div className="corner-tl" />
              <div className="corner-br" />
              <div style={{
                position: 'absolute', inset: 8, overflow: 'hidden',
                border: '1px solid rgba(0,212,255,0.25)',
                background: '#060912',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}>
                <img src="/profile.jpg" alt="Dipendra Joshi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:2.5rem;font-weight:900;background:linear-gradient(135deg,#e8174a,#00d4ff);-webkit-background-clip:text;background-clip:text;color:transparent;">DJ</div>`
                  }}
                />
              </div>
              {/* ID tag */}
              <div style={{
                position: 'absolute', bottom: -14, left: 8, right: 8,
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)',
                padding: '0.25rem 0.5rem', fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem',
                color: 'rgba(0,212,255,0.65)', letterSpacing: '0.07em',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
              }}>
                DIPENDRA_J · FULL STACK DEV
              </div>
            </div>
          </div>

          {/* Bio — compact but complete */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.35rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '0.04em' }}>
              Dipendra <span style={{ color: 'var(--accent1)' }}>Joshi</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', fontFamily: 'Share Tech Mono,monospace', marginLeft: 10, letterSpacing: '0.1em', verticalAlign: 'middle' }}>BCA · GEHU DEHRADUN</span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '0.8rem' }}>
              I'm a <strong style={{ color: '#00d4ff' }}>Full Stack Developer</strong> and BCA student at{' '}
              <strong style={{ color: 'white' }}>Graphic Era Hill University</strong>, Dehradun — building end-to-end web apps with the MERN stack, Python ML pipelines, and clean systems code in C/C++.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '1.1rem' }}>
              I architect pixel-perfect React frontends, robust Node.js/Express backends, and MongoDB databases — and I bring the same precision to data science with Pandas, NumPy, and scikit-learn.
            </p>

            {/* Role tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {roles.map(tag => (
                <span key={tag} style={{
                  padding: '0.3rem 0.8rem', background: 'rgba(232,23,74,0.06)',
                  border: '1px solid rgba(232,23,74,0.2)', color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'Share Tech Mono,monospace', fontSize: '0.66rem', letterSpacing: '0.07em',
                  clipPath: 'polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)'
                }}>{tag}</span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem' }}>
              {stats.map(({ label, value, icon, color }) => (
                <div key={label} className="stat-card" style={{ textAlign: 'center', padding: '0.7rem 0.4rem' }}>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem', letterSpacing: '0.08em' }}>{icon}</div>
                  <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.4rem', fontWeight: 900, background: `linear-gradient(135deg,${color},${color}99)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{value}</div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.07em', marginTop: '0.2rem' }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
