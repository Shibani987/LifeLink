"use client"

import { useEffect, useState } from "react"

export function PulseEffect() {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 relative h-10">
      <div className="ekg-line"></div>
    </div>
  )
}
