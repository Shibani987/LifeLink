"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, AlertTriangle, Clock, Phone } from "lucide-react"
import { createEmergencyRequest } from "@/lib/actions"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const ORGANS = ["Heart", "Liver", "Kidney", "Lungs", "Pancreas", "Cornea", "Skin", "Bone"]
const URGENCY_LEVELS = [
  { value: "critical", label: "Critical (0-24 hours)", color: "text-red-600" },
  { value: "urgent", label: "Urgent (1-7 days)", color: "text-orange-600" },
  { value: "moderate", label: "Moderate (1-4 weeks)", color: "text-yellow-600" },
  { value: "routine", label: "Routine (1-6 months)", color: "text-green-600" },
]

export default function EmergencyRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    organNeeded: "",
    urgencyLevel: "",
    hospitalName: "",
    doctorName: "",
    contactNumber: "",
    medicalHistory: "",
    additionalNotes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // map camelCase ➜ snake_case
  const payload = {
    patient_name:     formData.patientName,
    age:              Number(formData.age),
    blood_group:      formData.bloodGroup,
    organ:            formData.organNeeded,
    urgency_level:    formData.urgencyLevel,
    hospital_name:    formData.hospitalName,
    doctor_name:      formData.doctorName,
    contact_number:   formData.contactNumber,
    medical_history:  formData.medicalHistory,
    additional_notes: formData.additionalNotes,
  };

  try {
    await createEmergencyRequest(payload);
    router.push("/dashboard?success=emergency-request-created");
  } catch (err) {
    console.error("Failed to create emergency request:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">LifeLink</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Organ Request</h1>
            <p className="text-gray-600">Submit an urgent request to find organ donors in your area</p>
          </div>

          {/* Emergency Alert */}
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Emergency Hotline:</strong> For immediate assistance, call{" "}
              <span className="font-bold">1-800-LIFELINK</span> or contact your nearest hospital.
            </AlertDescription>
          </Alert>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Request Details
              </CardTitle>
              <CardDescription>
                Please provide accurate information to help us find the best matches quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodGroup: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
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
                    <div>
                      <Label htmlFor="organNeeded">Organ Needed</Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, organNeeded: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organ" />
                        </SelectTrigger>
                        <SelectContent>
                          {ORGANS.map((organ) => (
                            <SelectItem key={organ} value={organ}>
                              {organ}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="urgencyLevel">Urgency Level</Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, urgencyLevel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {URGENCY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Hospital Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        value={formData.hospitalName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hospitalName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorName">Doctor Name</Label>
                      <Input
                        id="doctorName"
                        value={formData.doctorName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, doctorName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactNumber">Emergency Contact Number</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>

                  <div>
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      placeholder="Brief medical history relevant to the organ transplant..."
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData((prev) => ({ ...prev, medicalHistory: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any additional information that might help in finding a suitable donor..."
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency: 1-800-LIFELINK
                  </div>
                  <div className="flex space-x-4">
                    <Link href="/dashboard">
                      <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
                      {isLoading ? "Submitting Request..." : "Submit Emergency Request"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p>Your request will be immediately sent to all compatible donors in your area</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p>Partner hospitals will be notified and can assist with coordination</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p>You'll receive updates on potential matches and next steps</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <p>Our team will coordinate with medical professionals for the transplant process</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
