"use client"

import { Heart, TreesIcon as Lungs, Droplets, Eye, Dna } from "lucide-react"

type OrganIconProps = {
  type: "heart" | "lungs" | "liver" | "kidneys" | "pancreas" | "intestines" | "corneas" | "tissue"
  label: string
  description: string
}

export function OrganIcon({ type, label, description }: OrganIconProps) {
  const getIcon = () => {
    switch (type) {
      case "heart":
        return <Heart className="h-10 w-10 text-red-400" />
      case "lungs":
        return <Lungs className="h-10 w-10 text-blue-400" />
      case "liver":
        return <Droplets className="h-10 w-10 text-yellow-400" />
      case "kidneys":
        return <Droplets className="h-10 w-10 text-purple-400" />
      case "pancreas":
        return <Dna className="h-10 w-10 text-green-400" />
      case "intestines":
        return <Dna className="h-10 w-10 text-pink-400" />
      case "corneas":
        return <Eye className="h-10 w-10 text-cyan-400" />
      case "tissue":
        return <Dna className="h-10 w-10 text-orange-400" />
      default:
        return <Heart className="h-10 w-10 text-red-400" />
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group text-center">
      <div className="flex justify-center mb-3 group-hover:animate-float">{getIcon()}</div>
      <h3 className="text-white font-semibold mb-1">{label}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}
