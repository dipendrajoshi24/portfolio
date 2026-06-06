import React, { useEffect, useRef, useState } from 'react'
import { SiC, SiCplusplus, SiPython, SiJavascript, SiReact, SiHtml5, SiTailwindcss, SiGit, SiGithub, SiSqlite, SiNodedotjs, SiExpress, SiMongodb } from 'react-icons/si'
import { FaJava, FaCss3Alt } from 'react-icons/fa'

const skillGroups = [
  {
    category: 'Languages',
    color: '#e8174a',
    skills: [
      { icon: <SiC />, label: 'C', level: 85 },
      { icon: <SiCplusplus />, label: 'C++', level: 82 },
      { icon: <SiPython />, label: 'Python', level: 88 },
      { icon: <FaJava />, label: 'Java', level: 75 },
      { icon: <SiJavascript />, label: 'JavaScript', level: 92 },
    ],
  },
  {
    category: 'Frontend',
    color: '#00d4ff',
    skills: [
      { icon: <SiHtml5 />, label: 'HTML5', level: 95 },
      { icon: <FaCss3Alt />, label: 'CSS3', level: 90 },
      { icon: <SiReact />, label: 'React', level: 90 },
      { icon: <SiTailwindcss />, label: 'Tailwind', level: 88 },
    ],
  },
  {
    category: 'Backend & DB',
    color: '#f5c518',
    skills: [
      { icon: <SiNodedotjs />, label: 'Node.js', level: 85 },
      { icon: <SiExpress />, label: 'Express', level: 83 },
      { icon: <SiMongodb />, label: 'MongoDB', level: 82 },
      { icon: <SiSqlite />, label: 'SQL', level: 80 },
    ],
  },
  {
    category: 'Tools',
    color: '#7c3aed',
    skills: [
      { icon: <SiGit />, label: 'Git', level: 87 },
      { icon: <SiGithub />, label: 'GitHub', level: 88 },
    ],
  },
]

const allSkills = skillGroups.flatMap(g => g.skills.map(s => ({ ...s, catColor: g.color })))

const handleSound = (index) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [261, 294, 329, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1046]
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'; osc.frequency.value = notes[index % notes.length]
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5)
    osc.start(); osc.stop(ctx.currentTime + 0.5)
  } catch (_) {}
}

const Skills = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(180deg, #03040a 0%, #060912 100%)' }}>

      <div className="hex-bg absolute inset-0" />
      <div className="circuit-bg absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="energy-orb orb-gold" style={{ opacity: 0.4 }} />
      <div className="energy-orb orb-blue" style={{ opacity: 0.35 }} />

      <span className="kanji-deco" style={{ left: '1%', top: '8%', fontSize: '12rem' }}>技</span>
      <span className="kanji-deco" style={{ right: '1%', bottom: '8%', fontSize: '9rem' }}>術</span>

      <div className="relative z-20 max-w-5xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <div className="power-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>ARSENAL.SYS</div>
          <h1 className="section-title section-title-red">TECH ARSENAL</h1>
          <p className="section-sub" style={{ margin: '0.75rem auto 0' }}>
            // Hover to activate · Click to hear resonance frequency
          </p>
        </div>

        {/* Grouped skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          {skillGroups.map((group, gi) => (
            <div key={group.category}
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.6s ease ${gi * 0.12}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 3, height: 16, background: group.color, borderRadius: 2 }} />
                <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.68rem', color: group.color, letterSpacing: '0.12em' }}>{group.category.toUpperCase()}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${group.color}30,transparent)` }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {group.skills.map(({ icon, label, level }, i) => {
                  const globalIdx = allSkills.findIndex(s => s.label === label)
                  return (
                    <div key={label}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                      onMouseEnter={() => handleSound(globalIdx)}
                      onClick={() => handleSound(globalIdx)}>
                      <div style={{
                        width: 60, height: 60, borderRadius: '50%',
                        background: 'rgba(6,9,18,0.9)',
                        border: `1px solid ${group.color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', color: group.color,
                        transition: 'all 0.25s',
                        position: 'relative',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = `0 0 20px ${group.color}55, 0 0 40px ${group.color}22`
                          e.currentTarget.style.borderColor = group.color
                          e.currentTarget.style.transform = 'scale(1.18) translateY(-4px)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = 'none'
                          e.currentTarget.style.borderColor = `${group.color}33`
                          e.currentTarget.style.transform = 'scale(1)'
                        }}>
                        {icon}
                        {/* Level ring */}
                        <svg style={{ position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', transform: 'rotate(-90deg)' }} viewBox="0 0 66 66">
                          <circle cx="33" cy="33" r="30" fill="none" stroke={`${group.color}15`} strokeWidth="2" />
                          <circle cx="33" cy="33" r="30" fill="none" stroke={group.color} strokeWidth="1.5"
                            strokeDasharray={`${(level / 100) * 188.5} 188.5`} strokeLinecap="round"
                            style={{ opacity: 0.6 }} />
                        </svg>
                      </div>
                      <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.54rem', color: group.color, opacity: 0.7 }}>{level}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div style={{
          background: 'rgba(6,9,18,0.85)', border: '1px solid rgba(0,212,255,0.1)',
          padding: '2rem',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.35s',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          position: 'relative',
        }}>
          <div className="corner-tl" />
          <div className="corner-br" />
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.68rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            // proficiency_levels.dat · top skills
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem 2.5rem' }}>
            {allSkills.slice(0, 12).map(({ label, level, catColor }) => (
              <div key={label} className="skill-bar-wrap">
                <div className="skill-bar-label">
                  <span>{label}</span>
                  <span style={{ color: catColor }}>{level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{
                    width: visible ? `${level}%` : '0%',
                    background: `linear-gradient(90deg, ${catColor}, ${catColor}88)`,
                    transition: 'width 1s ease 0.5s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
