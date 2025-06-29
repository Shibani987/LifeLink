"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle,
  ArrowRight,
  Building2,
  Globe,
  Shield,
  Zap,
  Phone,
  Mail,
  Star,
} from "lucide-react"

export default function ScheduleDemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    organization: "",
    organizationType: "",
    hospitalSize: "",
    currentSystem: "",
    primaryInterest: "",
    preferredDate: "",
    preferredTime: "",
    timeZone: "",
    demoType: "",
    specificRequirements: "",
    attendees: "",
    hearAboutUs: "",
    marketingConsent: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      alert("Demo scheduled successfully! You'll receive a confirmation email shortly.")
      // Reset form or redirect
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">LifeLink</span>
                <p className="text-sm text-gray-600">Organ Donation Network</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
                Services
              </Link>
              <Link href="/hospitals" className="text-gray-700 hover:text-blue-600 font-medium">
                Hospitals
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600 font-medium">
                Resources
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
            </nav>

            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-6">
              <Video className="h-4 w-4 mr-1" />
              Personalized Platform Demo
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Schedule Your Demo</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              See how LifeLink can transform your organ donation program with a personalized demonstration tailored to
              your institution's specific needs.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>45-minute personalized demo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Q&A with our experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Custom implementation plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-blue-100 rounded-lg p-6 mb-4 mx-auto w-fit">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Platform Tour</h3>
              <p className="text-gray-600 text-sm">Interactive walkthrough of all key features</p>
            </div>
            <div>
              <div className="bg-green-100 rounded-lg p-6 mb-4 mx-auto w-fit">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Consultation</h3>
              <p className="text-gray-600 text-sm">Direct access to our medical and technical experts</p>
            </div>
            <div>
              <div className="bg-purple-100 rounded-lg p-6 mb-4 mx-auto w-fit">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Use Cases</h3>
              <p className="text-gray-600 text-sm">Scenarios specific to your hospital's needs</p>
            </div>
            <div>
              <div className="bg-yellow-100 rounded-lg p-6 mb-4 mx-auto w-fit">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Implementation Plan</h3>
              <p className="text-gray-600 text-sm">Detailed roadmap for your organization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Demo Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Personalized Demo</h2>
                <p className="text-gray-600">
                  Complete the form below to schedule a demo that's tailored to your organization's specific
                  requirements.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      1
                    </div>
                    <span className={`text-sm ${currentStep >= 1 ? "text-blue-600" : "text-gray-500"}`}>
                      Organization Info
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      2
                    </div>
                    <span className={`text-sm ${currentStep >= 2 ? "text-blue-600" : "text-gray-500"}`}>
                      Demo Preferences
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      3
                    </div>
                    <span className={`text-sm ${currentStep >= 3 ? "text-blue-600" : "text-gray-500"}`}>
                      Schedule & Confirm
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Card className="border-2 border-gray-100">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Organization Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Organization Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Business Email</Label>
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
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="+1 (555) 123-4567"
                              value={formData.phone}
                              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input
                              id="jobTitle"
                              placeholder="e.g., Chief Medical Officer"
                              value={formData.jobTitle}
                              onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="organization">Organization Name</Label>
                            <Input
                              id="organization"
                              placeholder="Hospital or Institution Name"
                              value={formData.organization}
                              onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="organizationType">Organization Type</Label>
                            <Select
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, organizationType: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hospital">Hospital</SelectItem>
                                <SelectItem value="medical-center">Medical Center</SelectItem>
                                <SelectItem value="transplant-center">Transplant Center</SelectItem>
                                <SelectItem value="organ-bank">Organ Procurement Organization</SelectItem>
                                <SelectItem value="clinic">Clinic</SelectItem>
                                <SelectItem value="government">Government Health Agency</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="hospitalSize">Organization Size</Label>
                            <Select
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, hospitalSize: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small (1-100 beds)</SelectItem>
                                <SelectItem value="medium">Medium (101-300 beds)</SelectItem>
                                <SelectItem value="large">Large (301-500 beds)</SelectItem>
                                <SelectItem value="enterprise">Enterprise (500+ beds)</SelectItem>
                                <SelectItem value="network">Hospital Network</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="currentSystem">Current Organ Donation Management System</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, currentSystem: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select current system" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No current system</SelectItem>
                              <SelectItem value="manual">Manual/Paper-based</SelectItem>
                              <SelectItem value="basic-software">Basic software solution</SelectItem>
                              <SelectItem value="legacy-system">Legacy hospital system</SelectItem>
                              <SelectItem value="competitor">Competitor solution</SelectItem>
                              <SelectItem value="custom">Custom-built system</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end">
                          <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                            Next Step
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Demo Preferences */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Demo Preferences</h3>
                        </div>

                        <div>
                          <Label htmlFor="primaryInterest">Primary Area of Interest</Label>
                          <Select
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, primaryInterest: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="What interests you most?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="donor-matching">Donor-Recipient Matching</SelectItem>
                              <SelectItem value="emergency-coordination">Emergency Coordination</SelectItem>
                              <SelectItem value="network-integration">Network Integration</SelectItem>
                              <SelectItem value="compliance-reporting">Compliance & Reporting</SelectItem>
                              <SelectItem value="data-analytics">Data Analytics</SelectItem>
                              <SelectItem value="mobile-access">Mobile Access</SelectItem>
                              <SelectItem value="api-integration">API Integration</SelectItem>
                              <SelectItem value="training-support">Training & Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="demoType">Preferred Demo Format</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, demoType: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select demo format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video-call">Video Call (Recommended)</SelectItem>
                              <SelectItem value="in-person">In-Person Visit</SelectItem>
                              <SelectItem value="webinar">Group Webinar</SelectItem>
                              <SelectItem value="recorded">Pre-recorded Demo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="attendees">Expected Number of Attendees</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, attendees: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="How many people will attend?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2">1-2 people</SelectItem>
                              <SelectItem value="3-5">3-5 people</SelectItem>
                              <SelectItem value="6-10">6-10 people</SelectItem>
                              <SelectItem value="10+">More than 10 people</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="specificRequirements">Specific Requirements or Questions</Label>
                          <Textarea
                            id="specificRequirements"
                            placeholder="Tell us about any specific features you'd like to see or questions you have..."
                            value={formData.specificRequirements}
                            onChange={(e) => setFormData((prev) => ({ ...prev, specificRequirements: e.target.value }))}
                            rows={4}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="hearAboutUs">How did you hear about LifeLink?</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, hearAboutUs: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="google">Google Search</SelectItem>
                              <SelectItem value="colleague">Colleague Referral</SelectItem>
                              <SelectItem value="conference">Medical Conference</SelectItem>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="partner">Partner Hospital</SelectItem>
                              <SelectItem value="advertisement">Advertisement</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-between">
                          <Button onClick={prevStep} variant="outline">
                            Previous
                          </Button>
                          <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                            Next Step
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Schedule & Confirm */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule Your Demo</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="preferredDate">Preferred Date</Label>
                            <Input
                              id="preferredDate"
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                              required
                              className="mt-1"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="preferredTime">Preferred Time</Label>
                            <Select
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredTime: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                                <SelectItem value="16:00">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="timeZone">Time Zone</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, timeZone: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select your time zone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IST">IST (India Standard Time)</SelectItem>
                              <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                              <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                              <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                              <SelectItem value="CET">CET (Central European Time)</SelectItem>
                              <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                              <SelectItem value="AEST">AEST (Australian Eastern Time)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Demo Summary</h4>
                          <div className="space-y-1 text-sm text-blue-800">
                            <p>
                              <strong>Duration:</strong> 45 minutes
                            </p>
                            <p>
                              <strong>Format:</strong> {formData.demoType || "Video Call"}
                            </p>
                            <p>
                              <strong>Focus:</strong> {formData.primaryInterest || "General Platform Overview"}
                            </p>
                            <p>
                              <strong>Attendees:</strong> {formData.attendees || "To be confirmed"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="marketingConsent"
                              checked={formData.marketingConsent}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, marketingConsent: checked as boolean }))
                              }
                            />
                            <Label htmlFor="marketingConsent" className="text-sm leading-relaxed">
                              I agree to receive marketing communications from LifeLink about product updates, industry
                              insights, and relevant healthcare technology news. You can unsubscribe at any time.
                            </Label>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button onClick={prevStep} variant="outline">
                            Previous
                          </Button>
                          <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={isLoading}
                            size="lg"
                          >
                            {isLoading ? "Scheduling Demo..." : "Schedule Demo"}
                            <Calendar className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Demo Information */}
              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-blue-600" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-sm">45-Minute Session</p>
                        <p className="text-xs text-gray-600">Comprehensive platform walkthrough</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Expert Guidance</p>
                        <p className="text-xs text-gray-600">Medical and technical specialists</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Custom Scenarios</p>
                        <p className="text-xs text-gray-600">Tailored to your use cases</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Implementation Plan</p>
                        <p className="text-xs text-gray-600">Next steps discussion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="border-2 border-blue-100 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-blue-900 mb-3 italic">
                    "The LifeLink demo was incredibly thorough. Our team was impressed by the platform's capabilities
                    and how it could streamline our organ donation coordination."
                  </p>
                  <div className="text-xs text-blue-700">
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p>Chief Medical Officer, City General Hospital</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle>Need Immediate Assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Sales Team</p>
                        <p className="text-xs text-gray-600">+91-11-4567-8900</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Email Support</p>
                        <p className="text-xs text-gray-600">sales@lifelink.org</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Available Hours</p>
                        <p className="text-xs text-gray-600">Mon-Fri, 9 AM - 6 PM IST</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card className="border-2 border-green-100 bg-green-50">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-900 mb-1">Secure Demo Environment</p>
                  <p className="text-xs text-green-700">
                    All demos use anonymized data and comply with HIPAA regulations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
