import React, { useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export function CardContainer({ children, className }) {
  return (
    <div className={cn('card-3d-container', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`)
  }

  const handleMouseLeave = () => setTransform('')

  return (
    <div
      ref={ref}
      className={cn('card-3d-body', className)}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export function CardItem({ children, as: Tag = 'div', translateZ = 0, className, ...props }) {
  return (
    <Tag
      className={className}
      style={{ transform: `translateZ(${translateZ}px)` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
