import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LifeBot from '../components/ui/life-bot';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LifeLink - Organ Donation Platform",
  description:
    "Connecting lives through organ donation - a platform that bridges the gap between donors and recipients",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <LifeBot />
      </body>
    </html>
  )
}
