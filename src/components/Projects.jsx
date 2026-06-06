import React, { useEffect, useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'Complaint Box Management',
    description: 'Full-stack MERN complaint platform. Users submit complaints; admins track, manage, and resolve them via a real-time dashboard with auth and status updates.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    code: 'https://github.com/dipendrajoshi24',
    live: null,
    status: 'online',
    emoji: '🗂️',
    tag: 'FEATURED',
    tagColor: '#e8174a',
    number: '01',
    highlight: true,
  },
  {
    title: 'Stress Prediction System',
    description: 'ML-powered web app that predicts stress levels from user data using Python, Pandas, NumPy and scikit-learn predictive models with interactive data visualizations.',
    tech: ['Python', 'ML', 'Pandas', 'NumPy', 'scikit-learn'],
    code: 'https://github.com/dipendrajoshi24',
    live: null,
    status: 'local',
    emoji: '🧠',
    tag: 'ML / AI',
    tagColor: '#7c3aed',
    number: '02',
  },
  {
    title: 'Student Attendance Manager',
    description: 'Desktop app with Python & Tkinter. Teachers add students, mark attendance, manage records, and generate PDF reports. Persisted with SQLite.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    code: 'https://github.com/dipendrajoshi24',
    live: null,
    status: 'local',
    emoji: '📋',
    tag: 'DESKTOP',
    tagColor: '#00d4ff',
    number: '03',
  },
  {
    title: 'Movie Ticket Booking',
    description: 'Console-based C application with user authentication, seat selection, booking & cancellation, file handling, and a complete admin management panel.',
    tech: ['C', 'File I/O', 'Data Structures'],
    code: 'https://github.com/dipendrajoshi24',
    live: null,
    status: 'local',
    emoji: '🎬',
    tag: 'SYSTEMS',
    tagColor: '#f5c518',
    number: '04',
  },
]

const Projects = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(180deg, #060912 0%, #03040a 100%)' }}>

      <div className="circuit-bg absolute inset-0" />
      <div className="hex-bg absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="energy-orb orb-red" style={{ opacity: 0.35 }} />
      <div className="energy-orb orb-blue" style={{ opacity: 0.25 }} />

      <span className="kanji-deco" style={{ left: '1%', top: '5%', fontSize: '13rem' }}>作</span>
      <span className="kanji-deco" style={{ right: '1%', bottom: '5%', fontSize: '10rem' }}>品</span>

      <div className="relative z-20 max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <div className="power-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>PROJECTS.EXE</div>
          <h1 className="section-title section-title-blue">THINGS I'VE BUILT</h1>
          <p className="section-sub" style={{ margin: '0.75rem auto 0' }}>
            // Full-stack web · ML pipelines · Systems programming
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div key={p.number} className="project-card"
              style={{
                padding: '1.75rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
                ...(p.highlight ? { border: '1px solid rgba(232,23,74,0.25)', boxShadow: '0 0 30px rgba(232,23,74,0.07)' } : {}),
              }}>

              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}>PROJECT {p.number}</span>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '0.18rem 0.55rem', background: `${p.tagColor}12`,
                    border: `1px solid ${p.tagColor}35`, color: p.tagColor,
                    fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', letterSpacing: '0.1em',
                    clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)'
                  }}>{p.tag}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', color: p.status === 'online' ? '#00ff88' : 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.status === 'online' ? '#00ff88' : '#555', boxShadow: p.status === 'online' ? '0 0 8px #00ff88' : 'none' }} />
                  {p.status === 'online' ? 'LIVE' : 'LOCAL'}
                </div>
              </div>

              {/* Emoji + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.7rem' }}>
                <span style={{ fontSize: '1.7rem' }}>{p.emoji}</span>
                <h3 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.92rem', fontWeight: 700, color: 'white', lineHeight: 1.3, margin: 0 }}>{p.title}</h3>
              </div>

              {/* Description */}
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
                {p.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {p.tech.map(t => (
                  <span key={t} style={{ padding: '0.18rem 0.55rem', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.16)', color: 'rgba(0,212,255,0.65)', fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', letterSpacing: '0.05em' }}>{t}</span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={p.code} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '0.4rem 0.9rem', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.55)', fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0,212,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent' }}>
                  <FaGithub size={10} /> SOURCE
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '0.4rem 0.9rem', border: '1px solid rgba(232,23,74,0.3)', color: 'rgba(232,23,74,0.7)', fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,23,74,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                    <FaExternalLinkAlt size={9} /> LIVE
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.4s' }}>
          <a href="https://github.com/dipendrajoshi24" target="_blank" rel="noopener noreferrer" className="outline-btn">
            <FaGithub size={12} /> VIEW ALL ON GITHUB
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
