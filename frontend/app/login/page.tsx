"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, CheckCircle } from "lucide-react"
import { loginUser } from "@/lib/actions"
import {  verifyOtp } from "@/lib/actions"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [otpMode, setOtpMode] = useState(false)
const [otp, setOtp] = useState("")
const [userIdForOtp, setUserIdForOtp] = useState<number | null>(null)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const res = await loginUser(formData)

    if (res.success === "otp-sent") {
      // donor needs OTP verification
      setOtpMode(true)
      setUserIdForOtp(res.user_id)
    } else if (res.success === true) {
      // normal login
      localStorage.setItem("lifelink-user", JSON.stringify(res.user))
      router.push("/dashboard")
    } else {
      alert(res.error || "Login failed")
    }
  } catch (error) {
    console.error("Login error:", error)
    alert("Login failed")
  } finally {
    setIsLoading(false)
  }
}




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">LifeLink</span>
              <p className="text-sm text-gray-600">Organ Donation Network</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Security Badges */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Professional Login</h1>
            <p className="text-gray-600 mb-6">Secure access to the LifeLink platform</p>
            <div className="flex justify-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                ISO 27001
              </Badge>
            </div>
          </div>

          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Sign In to Your Account</CardTitle>
              <CardDescription>Enter your credentials to access the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@hospital.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading} size="lg">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              {otpMode && (
  <form
    onSubmit={async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const user = await verifyOtp(userIdForOtp!, otp)
        localStorage.setItem("lifelink-user", JSON.stringify(user))
        router.push("/dashboard")
      } catch (err) {
        alert("Invalid OTP or expired")
      } finally {
        setIsLoading(false)
      }
    }}
    className="space-y-4 mt-6"
  >
    <Label htmlFor="otp">Enter OTP sent to your email</Label>
    <Input
      id="otp"
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="6-digit code"
      required
    />
    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
      {isLoading ? "Verifying..." : "Verify OTP"}
    </Button>
  </form>
)}

              <div className="mt-6 text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">New to LifeLink?</span>
                  </div>
                </div>

                <Link href="/register">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Register Your Institution
                  </Button>
                </Link>

                <p className="text-xs text-gray-500 mt-4">Demo credentials: admin@lifelink.com / password</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This is a secure healthcare platform. All data is encrypted and HIPAA compliant.
              <br />
              For technical support, contact: <span className="text-blue-600">support@lifelink.org</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
