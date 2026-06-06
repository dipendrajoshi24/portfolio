import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { FaPaperPlane, FaUser, FaCircle } from 'react-icons/fa'
import { MessageCircle, X } from 'lucide-react'

const AUTO_REPLIES = [
  "Hey! Thanks for reaching out 👋",
  "Sure, happy to chat! What would you like to know?",
  "That's a great question. Let me think about it...",
  "I'm currently working on some exciting MERN stack projects!",
  "Feel free to reach me at dipendrajoshi062@gmail.com for serious inquiries.",
  "I'm open to internships and collaborations 🚀",
  "My strongest skills right now are React, Node.js and MongoDB.",
  "I'd love to connect on LinkedIn! linkedin.com/in/dipendrajoshi",
  "Thanks for your interest in my work! 😊",
  "Check out my GitHub for my latest projects: github.com/dipendrajoshi24",
]
let replyIdx = 0
function formatTime(d) { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'them', text: "Hey! 👋 I'm Dipendra. Feel free to drop a message.", time: formatTime(new Date()) }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text, time: formatTime(new Date()) }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply = AUTO_REPLIES[replyIdx % AUTO_REPLIES.length]
      replyIdx++
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: reply, time: formatTime(new Date()) }])
    }, 1200 + Math.random() * 1000)
    inputRef.current?.focus()
  }

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 bg-black">
      {/* Dot Grid */}
      <div className={cn('absolute inset-0 z-0', 'dot-grid')} />
      {/* Radial Mask */}
      <div className="absolute inset-0 z-10 pointer-events-none radial-mask" />

      <div className="relative z-20 max-w-lg w-full">
        <div className="text-center mb-10">
          <h1
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(to bottom, #d4d4d4, #737373)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Say Hello
          </h1>
          <p className="mt-4 text-neutral-400 text-lg">Drop a message — Dipendra usually replies fast.</p>
        </div>

        {/* Chat Window */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', boxShadow: '0 0 60px rgba(99,102,241,0.06)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, color: 'white', fontSize: '1rem', flexShrink: 0 }}>DJ</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Dipendra Joshi</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <FaCircle size={7} color="#34d399" />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>online</span>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {['#f43f5e', '#f59e0b', '#34d399'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: '18px 16px', minHeight: 280, maxHeight: 380, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                {m.from === 'them' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, color: 'white', flexShrink: 0, fontFamily: 'Syne,sans-serif' }}>DJ</div>
                )}
                <div>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.from === 'me' ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(255,255,255,0.06)',
                    border: m.from === 'me' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: 'white', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: 260, wordBreak: 'break-word',
                    boxShadow: m.from === 'me' ? '0 4px 15px rgba(99,102,241,0.3)' : 'none'
                  }}>{m.text}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', marginTop: 3, textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</div>
                </div>
                {m.from === 'me' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaUser size={11} color="rgba(255,255,255,0.6)" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, color: 'white', fontFamily: 'Syne,sans-serif' }}>DJ</div>
                <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0,1,2].map(j => (
                    <span key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', display: 'inline-block', animation: `bounce 1s ${j * 0.18}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(0,0,0,0.4)' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="chat-input"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0, cursor: input.trim() ? 'pointer' : 'not-allowed',
                background: input.trim() ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(255,255,255,0.1)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <FaPaperPlane size={14} color="white" />
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.2rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
          For real contact → dipendrajoshi062@gmail.com
        </p>
      </div>
    </section>
  )
}

export default Chat
