import React, { useEffect, useRef, useState } from 'react'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    const stages = [
      { target: 30, speed: 40, delay: 0 },
      { target: 65, speed: 30, delay: 600 },
      { target: 90, speed: 50, delay: 1200 },
      { target: 100, speed: 20, delay: 1800 },
    ]

    let current = 0
    stages.forEach(({ target, speed, delay }, i) => {
      setTimeout(() => {
        setPhase(i)
        const interval = setInterval(() => {
          current += 1
          setProgress(current)
          if (current >= target) clearInterval(interval)
        }, speed)
      }, delay)
    })

    setTimeout(() => onComplete(), 2800)
  }, [onComplete])

  const labels = ['INITIALIZING SYSTEM...', 'LOADING ASSETS...', 'CALIBRATING UI...', 'ENTERING...']

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#03040a',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div className="circuit-bg absolute inset-0" />
      <div className="energy-orb orb-red" style={{ opacity: 0.3 }} />
      <div className="energy-orb orb-blue" style={{ opacity: 0.3 }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, width: 360 }}>
        {/* Hex logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <svg viewBox="0 0 80 80" style={{ width: 72, height: 72, animation: 'spin-slow 4s linear infinite' }}>
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
              fill="none" stroke="url(#lgrad)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="lgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8174a" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
            <text x="40" y="46" textAnchor="middle"
              style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '16px', fontWeight: 900, fill: 'white' }}>DJ</text>
          </svg>
        </div>

        <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.2rem', fontWeight: 900,
          background: 'linear-gradient(135deg,#e8174a,#00d4ff)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          letterSpacing: '0.15em', marginBottom: '2rem' }}>
          DIPENDRA JOSHI
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', marginBottom: '0.75rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg,#e8174a,#00d4ff)',
            boxShadow: '0 0 10px rgba(0,212,255,0.6)',
            transition: 'width 0.1s linear' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Share Tech Mono,monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
          marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
          <span style={{ color: 'rgba(0,212,255,0.7)' }}>{labels[phase]}</span>
          <span style={{ color: 'var(--accent1)', fontWeight: 700 }}>{progress}%</span>
        </div>

        {/* Blinking cursor */}
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.7rem',
          color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em' }}>
          {'> '}<span style={{ animation: 'orb-pulse 0.8s ease-in-out infinite' }}>█</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
