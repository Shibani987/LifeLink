import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MapPin,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Award,
  Building2,
  Phone,
  Mail,
  Globe,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6"></div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/90 border-b-2 border-blue-100 sticky top-0 z-50 shadow-md backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2 rounded-xl shadow-lg">
                <Heart className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">LifeLink</span>
                <p className="text-base text-blue-600 font-medium">Organ Donation Network</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-2 rounded-full shadow border border-blue-200">
              <Link
                href="/about"
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-200/60"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-200/60"
              >
                Services
              </Link>
              <Link
                href="/hospitals"
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-200/60"
              >
                Hospitals
              </Link>
              <Link
                href="/resources"
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-200/60"
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-200/60"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold shadow-sm">
                  Healthcare Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold shadow-lg">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-white py-20 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Large blue/purple blurred blob */}
          <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-gradient-to-br from-blue-400 via-purple-300 to-blue-200 opacity-30 rounded-full blur-[120px] animate-pulse-slow" />
          {/* Pink floating orb */}
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-pink-300 to-pink-100 opacity-30 rounded-full blur-2xl animate-float" />
          {/* Green floating orb */}
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-br from-green-300 to-green-100 opacity-20 rounded-full blur-2xl animate-float2" />
          {/* Yellow orb with rotate */}
          <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-yellow-200 to-yellow-100 opacity-20 rounded-full blur-2xl animate-float3 rotate-12" />
          {/* Animated grid dots */}
          <div className="absolute top-1/2 left-1/4 w-48 h-48 opacity-10 animate-fade-in">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              {Array.from({ length: 10 }).map((_, i) => (
                Array.from({ length: 10 }).map((_, j) => (
                  <circle key={i + '-' + j} cx={i * 10} cy={j * 10} r="1.5" fill="#3b82f6" />
                ))
              ))}
            </svg>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center space-x-2 mb-6 justify-center">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Trusted by 500+ Hospitals
                </Badge>
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Advanced Organ Donation
                <span className="text-blue-600 block">Management System</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                LifeLink is a comprehensive healthcare platform that connects organ donors with recipients through
                advanced matching algorithms, real-time coordination, and secure medical data management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <Link href="/register?type=hospital">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Building2 className="mr-2 h-5 w-5" />
                    Hospital Registration
                  </Button>
                </Link>
                <Link href="/register?type=donor">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Heart className="mr-2 h-5 w-5" />
                    Become a Donor
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 justify-center">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Matching</span>
                </div>
              </div>
            </div>

            {/* Platform Statistics Card redesigned */}
            <section className="w-full mt-12">
              <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 tracking-wide uppercase">Platform Statistics</h3>
                  <p className="text-base text-gray-500">Real-time data from our network</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-blue-500 mx-auto" />
                    </div>
                    <div className="text-3xl font-extrabold text-blue-700 mb-1">1,247</div>
                    <div className="text-sm text-gray-700 font-medium">Lives Saved</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-2">
                      <Heart className="h-8 w-8 text-green-500 mx-auto" />
                    </div>
                    <div className="text-3xl font-extrabold text-green-700 mb-1">5,832</div>
                    <div className="text-sm text-gray-700 font-medium">Active Donors</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-2">
                      <Building2 className="h-8 w-8 text-purple-500 mx-auto" />
                    </div>
                    <div className="text-3xl font-extrabold text-purple-700 mb-1">342</div>
                    <div className="text-sm text-gray-700 font-medium">Partner Hospitals</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-2">
                      <Zap className="h-8 w-8 text-red-500 mx-auto" />
                    </div>
                    <div className="text-3xl font-extrabold text-red-700 mb-1">24/7</div>
                    <div className="text-sm text-gray-700 font-medium">Emergency Support</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trusted by Leading Healthcare Institutions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium mt-2">AIIMS Delhi</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium mt-2">Apollo Hospitals</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium mt-2">Fortis Healthcare</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium mt-2">Max Healthcare</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Building2 className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium mt-2">Medanta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Organ Donation Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides end-to-end solutions for organ donation management, from donor registration to
              successful transplantation coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Geographic Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed mb-4">
                  Advanced algorithms match donors and recipients based on medical compatibility, geographic proximity,
                  and urgency levels.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time location tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Optimized transport routes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multi-hospital coordination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Emergency Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed mb-4">
                  Instant notification system for critical cases with automated escalation protocols and emergency
                  coordination.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant SMS/Email alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Priority queue management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 emergency hotline</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Secure Data Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed mb-4">
                  Enterprise-grade security with encrypted data storage, audit trails, and compliance with healthcare
                  regulations.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>HIPAA compliance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Audit trail logging</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Our System Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined process designed for efficiency, accuracy, and optimal patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Registration & Verification</h3>
              <p className="text-gray-600 text-sm">
                Secure registration process with medical verification and background checks for all participants.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligent Matching</h3>
              <p className="text-gray-600 text-sm">
                AI-powered algorithms analyze medical data, compatibility factors, and geographic proximity.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Coordination & Transport</h3>
              <p className="text-gray-600 text-sm">
                Real-time coordination between hospitals with optimized logistics and transport management.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Successful Transplantation</h3>
              <p className="text-gray-600 text-sm">
                Complete documentation, follow-up care coordination, and outcome tracking for quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 tracking-tight drop-shadow-sm">Certifications & Compliance</h2>
            <p className="text-lg text-blue-600 max-w-2xl mx-auto">
              Meeting the highest standards in healthcare technology and data security
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* HIPAA */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/3 border-t-4 border-green-400 hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-100 p-4 rounded-full shadow-lg">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-green-700 mb-2">HIPAA</h3>
              <p className="text-gray-600 text-base">Healthcare Data Protection</p>
            </div>

            {/* SOC 2 Type II */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/3 border-t-4 border-purple-400 hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-100 p-4 rounded-full shadow-lg">
                <CheckCircle className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-purple-700 mb-2">SOC 2 Type II</h3>
              <p className="text-gray-600 text-base">Security & Availability</p>
            </div>

            {/* FDA Compliant */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/3 border-t-4 border-red-400 hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-100 p-4 rounded-full shadow-lg">
                <Globe className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-red-700 mb-2">FDA Compliant</h3>
              <p className="text-gray-600 text-base">Medical Device Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Network?</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with our team to learn how LifeLink can enhance your organ donation program and improve patient
              outcomes at your healthcare facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule a Demo
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Users className="mr-2 h-5 w-5" />
                 <span className="text-blue-600">Start Registration</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-red-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold">LifeLink</span>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2024 LifeLink Organ Donation Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
