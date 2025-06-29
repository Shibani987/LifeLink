"use client"

import { Heart } from "lucide-react"
import { useState, useEffect } from "react"

export function HeartbeatIcon({ className = "h-6 w-6" }: { className?: string }) {
  const [beating, setBeating] = useState(false)

  useEffect(() => {
    // Start the heartbeat animation
    const interval = setInterval(() => {
      setBeating(true)
      setTimeout(() => setBeating(false), 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Heart
        className={`${className} text-red-500 transition-transform duration-300 ${beating ? "scale-125" : "scale-100"}`}
        fill={beating ? "currentColor" : "none"}
      />
      <div
        className={`absolute inset-0 bg-red-500 rounded-full blur-lg transition-opacity duration-300 ${
          beating ? "opacity-50" : "opacity-20"
        }`}
      ></div>
    </div>
  )
}
