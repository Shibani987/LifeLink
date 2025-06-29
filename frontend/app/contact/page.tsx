"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, Mail, MapPin, Clock, Users, Building2, ArrowRight, Globe, Headphones } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    subject: "",
    message: "",
    urgency: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      alert("Thank you for your message. We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
        subject: "",
        message: "",
        urgency: "",
      })
    }, 2000)
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
              <Link href="/contact" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Contact
              </Link>
            </nav>

            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
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
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-6">
              <Headphones className="h-4 w-4 mr-1" />
              24/7 Support Available
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get in touch with our expert team for support, partnerships, or to learn more about how LifeLink can
              transform your organ donation program.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          placeholder="Hospital or Institution Name"
                          value={formData.organization}
                          onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Your Role</Label>
                        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor/Surgeon</SelectItem>
                            <SelectItem value="administrator">Hospital Administrator</SelectItem>
                            <SelectItem value="coordinator">Transplant Coordinator</SelectItem>
                            <SelectItem value="it">IT Professional</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="urgency">Priority Level</Label>
                        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">General Inquiry</SelectItem>
                            <SelectItem value="medium">Business Discussion</SelectItem>
                            <SelectItem value="high">Technical Support</SelectItem>
                            <SelectItem value="urgent">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending Message..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              {/* Emergency Contact */}
              <Card className="border-2 border-red-200 bg-red-50 mb-6">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Emergency Hotline
                  </CardTitle>
                  <CardDescription className="text-red-700">For critical organ donation emergencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-2">1-800-LIFELINK</div>
                  <p className="text-red-700 text-sm">Available 24/7 for urgent cases</p>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                        <p className="text-gray-600 mb-2">support@lifelink.org</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Inquiries</h3>
                        <p className="text-gray-600 mb-2">+91-11-4567-8900</p>
                        <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM IST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                        <p className="text-gray-600 mb-2">
                          Healthcare Technology Center
                          <br />
                          Sector 44, Gurugram
                          <br />
                          Haryana 122003, India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Support Hours</h3>
                        <div className="text-gray-600 space-y-1">
                          <p>Emergency: 24/7</p>
                          <p>Technical: 24/7</p>
                          <p>Business: Mon-Fri, 9 AM - 6 PM IST</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Regional Offices</h2>
            <p className="text-xl text-gray-600">LifeLink presence across major healthcare hubs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  India Headquarters
                </CardTitle>
                <CardDescription>Primary operations and development center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Gurugram, Haryana</p>
                  <p className="text-gray-600">+91-11-4567-8900</p>
                  <p className="text-gray-600">india@lifelink.org</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Southeast Asia
                </CardTitle>
                <CardDescription>Regional coordination and support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Singapore</p>
                  <p className="text-gray-600">+65-6789-0123</p>
                  <p className="text-gray-600">asia@lifelink.org</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Middle East
                </CardTitle>
                <CardDescription>Regional partnerships and expansion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Dubai, UAE</p>
                  <p className="text-gray-600">+971-4-567-8900</p>
                  <p className="text-gray-600">mena@lifelink.org</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to frequently asked questions</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">How quickly can we get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Most hospitals can be onboarded within 2-4 weeks, including verification, training, and system
                  integration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">What are the costs involved?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  We offer flexible pricing based on hospital size and usage. Contact us for a customized quote.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">Is training provided?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Yes, comprehensive training is included for all staff members, with ongoing support and resources.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">How secure is the platform?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Enterprise-grade security with HIPAA compliance, end-to-end encryption, and regular security audits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Lives?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the LifeLink network and start making a difference in organ donation coordination today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Building2 className="mr-2 h-5 w-5" />
                  Register Your Hospital
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
