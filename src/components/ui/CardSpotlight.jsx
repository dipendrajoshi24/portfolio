import React, { useRef } from 'react'
import { cn } from '../../lib/utils'

export function CardSpotlight({ children, className, color = 'rgb(139,92,246)', onMouseEnter, onClick }) {
  const divRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    divRef.current.style.setProperty('--x', `${x}%`)
    divRef.current.style.setProperty('--y', `${y}%`)
    divRef.current.style.setProperty('--spotlight-color', color)
    const overlay = divRef.current.querySelector('.spotlight-overlay')
    if (overlay) {
      overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color}22, transparent 60%)`
      overlay.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    const overlay = divRef.current?.querySelector('.spotlight-overlay')
    if (overlay) overlay.style.opacity = '0'
  }

  return (
    <div
      ref={divRef}
      className={cn('card-spotlight', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div className="spotlight-overlay" />
      {children}
    </div>
  )
}
