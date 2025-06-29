"use client"

import { useState, useEffect } from "react"
import { Heart, Droplets, Activity, Pill, Stethoscope } from "lucide-react"
import React from "react"

export function FloatingElements() {
  const [elements, setElements] = useState<JSX.Element[]>([])

  useEffect(() => {
    const icons = [
      <Heart key="heart" className="text-red-500 opacity-20" />,
      <Droplets key="droplets" className="text-blue-500 opacity-20" />,
      <Activity key="activity" className="text-green-500 opacity-20" />,
      <Pill key="pill" className="text-yellow-500 opacity-20" />,
      <Stethoscope key="stethoscope" className="text-purple-500 opacity-20" />,
    ]

    const floatingElements = Array.from({ length: 15 }, (_, i) => {
      const size = Math.floor(Math.random() * 20) + 10 // 10px to 30px
      const icon = icons[Math.floor(Math.random() * icons.length)]
      const left = `${Math.random() * 100}%`
      const top = `${Math.random() * 100}%`
      const animationDuration = `${Math.random() * 10 + 10}s` // 10s to 20s
      const animationDelay = `${Math.random() * 5}s` // 0s to 5s

      return (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left,
            top,
            width: `${size}px`,
            height: `${size}px`,
            animation: `float-element ${animationDuration} ease-in-out infinite`,
            animationDelay,
          }}
        >
          {React.cloneElement(icon, { style: { width: "100%", height: "100%" } })}
        </div>
      )
    })

    setElements(floatingElements)
  }, [])

  return <div className="absolute inset-0 overflow-hidden z-0">{elements}</div>
}
