import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

const EMAILJS_SERVICE_ID  = 'service_84xiyt7'
const EMAILJS_TEMPLATE_ID = 'template_o1c6r99'
const EMAILJS_PUBLIC_KEY  = 'ytUpEVg1DI96J0caw'

const contacts = [
  { icon: <FaEnvelope />, label: 'EMAIL', value: 'dipendrajoshi062@gmail.com', href: 'mailto:dipendrajoshi062@gmail.com', color: '#e8174a' },
  { icon: <FaGithub />, label: 'GITHUB', value: 'github.com/dipendrajoshi24', href: 'https://github.com/dipendrajoshi24', color: '#00d4ff' },
  { icon: <FaLinkedin />, label: 'LINKEDIN', value: 'linkedin.com/in/dipendrajoshi', href: 'https://www.linkedin.com/in/dipendrajoshi', color: '#0077b5' },
  { icon: <FaMapMarkerAlt />, label: 'LOCATION', value: 'Dehradun, Uttarakhand, India', href: null, color: '#f5c518' },
]

const Contact = () => {
  const formRef = useRef(null)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [focused, setFocused] = useState(null)
  const configured = EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID'

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    if (!configured) {
      await new Promise(r => setTimeout(r, 1200))
      setStatus('demo')
      setFields({ name: '', email: '', subject: '', message: '' })
      return
    }
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  const statusMsg = {
    success: { text: '✓ MESSAGE TRANSMITTED SUCCESSFULLY', color: '#00ff88' },
    demo:    { text: '⚠ DEMO MODE — Configure EmailJS for real emails', color: '#f5c518' },
    error:   { text: '✗ FAILED — Please email directly', color: '#e8174a' },
  }

  const inputStyle = (name) => ({
    width: '100%', background: 'rgba(6,9,18,0.9)',
    border: `1px solid ${focused === name ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
    color: 'white', padding: '0.7rem 1rem',
    fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    boxShadow: focused === name ? '0 0 12px rgba(0,212,255,0.1)' : 'none',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
  })

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03040a 0%, #060912 100%)' }}>

      <div className="circuit-bg absolute inset-0" />
      <div className="hex-bg absolute inset-0" style={{ opacity: 0.4 }} />
      <div className="energy-orb orb-red" style={{ opacity: 0.45 }} />
      <div className="energy-orb orb-blue" style={{ right: '-5%', bottom: '-5%', top: 'auto', left: 'auto', opacity: 0.4 }} />
      <span className="kanji-deco" style={{ right: '2%', top: '10%', fontSize: '11rem' }}>話</span>
      <span className="kanji-deco" style={{ left: '2%', bottom: '10%', fontSize: '8rem' }}>繋</span>

      <div className="relative z-20 max-w-5xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="power-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>CONNECT.EXE</div>
          <h1 className="section-title section-title-red">GET IN TOUCH</h1>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0.75rem auto 0' }}>
            // Ready to collaborate? Transmit your message below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2.5rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            {/* Profile card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', marginBottom: '1.5rem', clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(0,212,255,0.35)', flexShrink: 0 }}>
                <img src="/profile.jpg" alt="Dipendra"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:Orbitron,sans-serif;font-size:0.9rem;font-weight:900;color:#00d4ff;">DJ</div>' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Dipendra Joshi</div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.55)', letterSpacing: '0.08em' }}>BCA · Full Stack Developer</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4, alignItems: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.56rem', color: 'rgba(0,255,136,0.7)' }}>AVAILABLE FOR WORK</span>
                </div>
              </div>
            </div>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {contacts.map(({ icon, label, value, href, color }) => (
                <div key={label} className="contact-card" style={{ borderLeftColor: color }}>
                  <div style={{ color, fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.56rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', margin: '0 0 2px' }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = color}
                        onMouseLeave={e => e.target.style.color = 'white'}>{value}</a>
                    ) : (
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', margin: 0 }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(232,23,74,0.04)', borderLeft: '3px solid rgba(232,23,74,0.4)', fontFamily: 'Share Tech Mono,monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.8, letterSpacing: '0.04em' }}>
              "The best code is written with purpose,<br />precision, and passion."<br />
              <span style={{ color: 'rgba(232,23,74,0.55)' }}>— Dipendra Joshi</span>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ position: 'relative', padding: '2rem', background: 'rgba(6,9,18,0.85)', border: '1px solid rgba(0,212,255,0.1)', clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
            <div className="corner-tl" />
            <div className="corner-br" />

            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.65rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              {'// '}<span style={{ color: 'rgba(0,212,255,0.28)' }}>contact_form.jsx</span>
              {!configured && <span style={{ color: 'rgba(245,197,24,0.45)', marginLeft: 8 }}>· DEMO MODE</span>}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>NAME *</label>
                  <input type="text" name="from_name" placeholder="Your name" value={fields.name}
                    onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    required style={inputStyle('name')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>EMAIL *</label>
                  <input type="email" name="from_email" placeholder="you@email.com" value={fields.email}
                    onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    required style={inputStyle('email')} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>SUBJECT</label>
                <input type="text" name="subject" placeholder="What's this about?" value={fields.subject}
                  onChange={e => setFields(f => ({ ...f, subject: e.target.value }))}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  style={inputStyle('subject')} />
              </div>

              <div>
                <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>MESSAGE *</label>
                <textarea name="message" placeholder="Your message..." value={fields.message}
                  onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  required rows={5} style={{ ...inputStyle('message'), resize: 'none' }} />
              </div>

              <button type="submit" disabled={status === 'sending'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.8rem', background: 'linear-gradient(135deg,#e8174a,#ff6b00)',
                  border: 'none', color: 'white', fontFamily: 'Orbitron,sans-serif', fontWeight: 700,
                  fontSize: '0.72rem', letterSpacing: '0.12em', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.6 : 1, transition: 'all 0.2s',
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                }}>
                <FaPaperPlane size={11} />
                {status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </button>

              {statusMsg[status] && (
                <div style={{ padding: '0.6rem 0.8rem', background: `${statusMsg[status].color}10`, border: `1px solid ${statusMsg[status].color}35`, fontFamily: 'Share Tech Mono,monospace', fontSize: '0.65rem', color: statusMsg[status].color, letterSpacing: '0.06em', lineHeight: 1.5 }}>
                  {statusMsg[status].text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
