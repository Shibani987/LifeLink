import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Award,
  Globe,
  Shield,
  Target,
  CheckCircle,
  ArrowRight,
  Building2,
  Stethoscope,
  Activity,
} from "lucide-react"

export default function AboutPage() {
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
              <Link href="/about" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
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
                Join Network
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
              <Award className="h-4 w-4 mr-1" />
              Leading Healthcare Technology Platform
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About LifeLink</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are revolutionizing organ donation through advanced technology, connecting healthcare institutions
              worldwide to save more lives through efficient organ matching and coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To bridge the critical gap between organ donors and recipients through innovative technology, ensuring
                that every viable organ reaches the right patient at the right time, ultimately saving more lives and
                reducing waiting times.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reduce Waiting Times</h3>
                    <p className="text-gray-600">Optimize matching algorithms to minimize organ waiting periods</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Increase Success Rates</h3>
                    <p className="text-gray-600">Improve transplant outcomes through better coordination</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Network</h3>
                    <p className="text-gray-600">Connect healthcare institutions across geographical boundaries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A world where no patient dies waiting for an organ transplant due to logistical barriers or inefficient
                coordination systems.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Platform Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">ISO</div>
                  <div className="text-sm text-gray-600">Certified Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">
                Founded by healthcare professionals and technology experts united by a common goal
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2019</h3>
                  <p className="text-gray-600">Founded by a team of transplant surgeons and software engineers</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2020</h3>
                  <p className="text-gray-600">First 50 hospitals joined our network across major cities</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2024</h3>
                  <p className="text-gray-600">Expanded to 500+ hospitals with international presence</p>
                </div>
              </div>

              <Card className="border-2 border-gray-100">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge That Inspired Us</h3>
                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      "In 2018, we witnessed a heart become available for transplant, but due to communication delays
                      and logistical challenges, it couldn't reach the patient in time. That day, we realized that
                      technology could solve this problem and save countless lives. LifeLink was born from this
                      determination to ensure no organ goes to waste due to preventable coordination failures."
                    </p>
                    <p className="text-sm text-gray-500 mt-4 italic">
                      - Dr. Sarah Johnson, Co-Founder & Chief Medical Officer
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals from healthcare and technology sectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
                <p className="text-blue-600 font-medium mb-3">Chief Medical Officer</p>
                <p className="text-gray-600 text-sm">
                  20+ years in transplant surgery, former head of organ procurement at AIIMS Delhi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rajesh Kumar</h3>
                <p className="text-green-600 font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Former Google engineer, expert in healthcare AI and real-time systems
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Michael Chen</h3>
                <p className="text-purple-600 font-medium mb-3">Chief Executive Officer</p>
                <p className="text-gray-600 text-sm">
                  Healthcare entrepreneur, former McKinsey consultant specializing in health systems
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-6 mb-4">
                <Heart className="h-12 w-12 text-red-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600 text-sm">
                Every decision is made with empathy for patients and families in need
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-4">
                <Shield className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">Maintaining the highest standards of security and data protection</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-4">
                <Target className="h-12 w-12 text-green-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Continuous improvement in technology and service delivery</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6 mb-4">
                <Users className="h-12 w-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">Working together with healthcare professionals worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the global network that's transforming organ donation and saving lives every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Building2 className="mr-2 h-5 w-5" />
                  Register Your Institution
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
