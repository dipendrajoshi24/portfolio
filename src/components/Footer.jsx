import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(180deg,#03040a,#020308)',
    borderTop: '1px solid rgba(0,212,255,0.1)',
    padding: '2.5rem 2rem 1.5rem',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#e8174a,#00d4ff,#f5c518,transparent)' }} />

    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>

        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.2rem', fontWeight: 900, background: 'linear-gradient(135deg,#e8174a,#00d4ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            ⬡ DIPENDRA JOSHI
          </div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
            FULL STACK DEVELOPER · MERN · PYTHON · ML
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
            {[
              { href: 'https://github.com/dipendrajoshi24', icon: <FaGithub />, color: '#00d4ff' },
              { href: 'https://www.linkedin.com/in/dipendrajoshi', icon: <FaLinkedin />, color: '#0077b5' },
              { href: 'mailto:dipendrajoshi062@gmail.com', icon: <FaEnvelope />, color: '#e8174a' },
            ].map(({ href, icon, color }, i) => (
              <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.9rem', transition: 'all 0.2s', textDecoration: 'none',
                  clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}15` }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>NAVIGATION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[['/', 'Home'], ['/about', 'About'], ['/skills', 'Skills'], ['/projects', 'Projects'], ['/contact', 'Contact']].map(([path, label]) => (
              <Link key={path} to={path} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.06em' }}
                onMouseEnter={e => e.target.style.color = '#00d4ff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>
                → {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>CONTACT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="mailto:dipendrajoshi062@gmail.com" style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>dipendrajoshi062@gmail.com</a>
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>Dehradun, Uttarakhand, India</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,255,136,0.7)' }}>AVAILABLE FOR WORK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} DIPENDRA JOSHI · ALL RIGHTS RESERVED
        </div>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 5 }}>
          CRAFTED WITH <FaHeart style={{ color: '#e8174a', fontSize: '0.6rem' }} /> &amp; PRECISION
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
