"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Heart, User, Building2, UserPlus, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { registerUser } from "@/lib/actions"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const ORGANS = ["Heart", "Liver", "Kidney", "Lungs", "Pancreas", "Cornea", "Skin", "Bone"]

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "hospital"

  const [userType, setUserType] = useState(defaultType)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    bloodGroup: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    organs: [] as string[],
    hospitalName: "",
    licenseNumber: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleOrganChange = (organ: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      organs: checked ? [...prev.organs, organ] : prev.organs.filter((o) => o !== organ),
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const payload = {
      ...formData,
      age: parseInt(formData.age),
      blood_group: formData.bloodGroup, // ✅ rename for Django
      user_type: userType,              // ✅ snake_case
    }

     

    console.log("📦 Payload being sent to backend:", payload)  // 👀 Inspect this in browser

    const response = await registerUser(payload)

    alert("🎉 Registration successful! Please log in.")
    router.push("/login")
  } catch (error) {
    alert("❌ Registration failed. Please check your details.")
    console.error("❌ Registration error:", error)
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

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the LifeLink Network</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Register your institution or become a verified participant in our organ donation network
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Network
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* User Type Selection */}
          <Card className="mb-8 border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="text-center">Select Registration Type</CardTitle>
              <CardDescription className="text-center">
                Choose the type of registration that best describes your role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    userType === "hospital" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("hospital")}
                >
                  <div className="text-center">
                    <Building2
                      className={`h-12 w-12 mx-auto mb-4 ${
                        userType === "hospital" ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <h3 className="font-semibold text-lg mb-2">Healthcare Institution</h3>
                    <p className="text-sm text-gray-600">Hospitals, clinics, and medical centers joining our network</p>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    userType === "donor" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("donor")}
                >
                  <div className="text-center">
                    <Heart
                      className={`h-12 w-12 mx-auto mb-4 ${userType === "donor" ? "text-green-600" : "text-gray-400"}`}
                    />
                    <h3 className="font-semibold text-lg mb-2">Organ Donor</h3>
                    <p className="text-sm text-gray-600">Individuals willing to donate organs to save lives</p>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    userType === "recipient"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("recipient")}
                >
                  <div className="text-center">
                    <User
                      className={`h-12 w-12 mx-auto mb-4 ${
                        userType === "recipient" ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <h3 className="font-semibold text-lg mb-2">Organ Recipient</h3>
                    <p className="text-sm text-gray-600">Patients in need of organ transplantation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Registration Information
              </CardTitle>
              <CardDescription>
                {userType === "hospital" && "Provide your healthcare institution details for verification"}
                {userType === "donor" && "Complete your donor profile to help save lives"}
                {userType === "recipient" && "Register to find compatible organ donors"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{userType === "hospital" ? "Primary Contact Name" : "Full Name"}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Official Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={userType === "hospital" ? "contact@hospital.com" : "your.email@domain.com"}
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password">Secure Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91-XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Hospital-specific fields */}
                {userType === "hospital" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Institution Verification Required</h3>
                      </div>
                      <p className="text-sm text-blue-800">
                        All healthcare institutions undergo a verification process to ensure compliance with medical
                        standards.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="hospitalName">Institution Name</Label>
                        <Input
                          id="hospitalName"
                          placeholder="e.g., City General Hospital"
                          value={formData.hospitalName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, hospitalName: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="licenseNumber">Medical License Number</Label>
                        <Input
                          id="licenseNumber"
                          placeholder="Enter license/registration number"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Medical Information for donors/recipients */}
                {(userType === "donor" || userType === "recipient") && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Medical Information</h3>
                      </div>
                      <p className="text-sm text-green-800">
                        This information helps us match compatible donors and recipients effectively.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="80"
                          value={formData.age}
                          onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodGroup: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            {BLOOD_GROUPS.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Organ Selection */}
                    <div>
                      <Label className="text-base font-medium">
                        {userType === "donor" ? "Organs Available for Donation" : "Organs Needed"}
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        {ORGANS.map((organ) => (
                          <div
                            key={organ}
                            className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50"
                          >
                            <Checkbox
                              id={organ}
                              checked={formData.organs.includes(organ)}
                              onCheckedChange={(checked) => handleOrganChange(organ, checked as boolean)}
                            />
                            <Label htmlFor={organ} className="text-sm font-medium">
                              {organ}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>

                  <div>
                    <Label htmlFor="address">Complete Address</Label>
                    <Input
                      id="address"
                      placeholder="Street address, building number"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="e.g., New Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        placeholder="e.g., Delhi"
                        value={formData.state}
                        onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className={`w-full ${
                      userType === "hospital"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : userType === "donor"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing Registration..."
                      : `Complete ${userType === "hospital" ? "Institution" : userType === "donor" ? "Donor" : "Recipient"} Registration`}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already registered?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Sign in to your account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
