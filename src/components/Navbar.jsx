import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el = document.documentElement
      setScrollPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { path: '/',         label: 'Home',     icon: '⌂' },
    { path: '/about',    label: 'About',    icon: '◉' },
    { path: '/skills',   label: 'Skills',   icon: '◈' },
    { path: '/projects', label: 'Projects', icon: '⬡' },
    { path: '/chat',     label: 'Chat',     icon: '◆' },
    { path: '/contact',  label: 'Contact',  icon: '✉' },
  ]

  return (
    <>
      {/* Scroll progress line */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2, zIndex: 10000,
        width: `${scrollPct}%`,
        background: 'linear-gradient(to right, #e8174a, #00d4ff, #f5c518)',
        transition: 'width 0.05s linear',
      }} />

      <nav style={{
        padding: '0 2rem', display: 'flex', alignItems: 'center', height: '4rem',
        color: 'white', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(3,4,10,0.92)' : 'rgba(3,4,10,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.08)'}`,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
      }}>
        <Link to="/" style={{
          fontFamily: 'Orbitron,sans-serif', fontSize: '1.15rem', fontWeight: 900,
          background: 'linear-gradient(135deg,#e8174a,#00d4ff)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          letterSpacing: '0.1em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: '#00d4ff', fontSize: '0.85rem' }}>⬡</span> DJ
          <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em', fontWeight: 400, marginLeft: 2 }}>v3.0</span>
        </Link>

        {/* Desktop links */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.2rem' }} className="nav-desktop">
          {links.map(link => (
            <Link key={link.path} to={link.path}
              className={`nav-a ${location.pathname === link.path ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(v => !v)}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: 8 }}
          className="nav-hamburger" aria-label="Menu">
          <div style={{ width: 22, height: 2, background: menuOpen ? '#e8174a' : '#00d4ff', marginBottom: 5, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <div style={{ width: 22, height: 2, background: '#00d4ff', opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
          <div style={{ width: 22, height: 2, background: menuOpen ? '#e8174a' : '#00d4ff', marginTop: 5, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '4rem', left: 0, right: 0, zIndex: 999,
          background: 'rgba(3,4,10,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,212,255,0.15)',
          padding: '1rem',
        }}>
          {links.map(link => (
            <Link key={link.path} to={link.path}
              style={{
                display: 'block', padding: '0.7rem 1rem',
                fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em',
                color: location.pathname === link.path ? '#00d4ff' : 'rgba(255,255,255,0.6)',
                textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
              }}>
              <span style={{ color: '#e8174a', marginRight: 8 }}>{link.icon}</span>{link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default Navbar
