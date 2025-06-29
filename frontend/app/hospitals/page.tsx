import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Building2,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Globe,
  Star,
  Activity,
  Shield,
} from "lucide-react"

export default function HospitalsPage() {
  const partnerHospitals = [
    {
      name: "AIIMS Delhi",
      location: "New Delhi, India",
      specialties: ["Cardiothoracic Surgery", "Liver Transplant", "Kidney Transplant"],
      rating: 5,
      transplants: "500+ annually",
      established: "2019",
    },
    {
      name: "Apollo Hospitals",
      location: "Chennai, India",
      specialties: ["Multi-organ Transplant", "Pediatric Surgery", "Heart Surgery"],
      rating: 5,
      transplants: "800+ annually",
      established: "2020",
    },
    {
      name: "Fortis Healthcare",
      location: "Mumbai, India",
      specialties: ["Liver Transplant", "Kidney Transplant", "Corneal Transplant"],
      rating: 4,
      transplants: "300+ annually",
      established: "2020",
    },
    {
      name: "Max Healthcare",
      location: "Gurugram, India",
      specialties: ["Heart Transplant", "Lung Transplant", "Liver Transplant"],
      rating: 5,
      transplants: "400+ annually",
      established: "2021",
    },
    {
      name: "Medanta Hospital",
      location: "Gurugram, India",
      specialties: ["Multi-organ Transplant", "Robotic Surgery", "Critical Care"],
      rating: 5,
      transplants: "600+ annually",
      established: "2021",
    },
    {
      name: "Christian Medical College",
      location: "Vellore, India",
      specialties: ["Pediatric Transplant", "Heart Surgery", "Liver Transplant"],
      rating: 5,
      transplants: "350+ annually",
      established: "2022",
    },
  ]

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
              <Link href="/hospitals" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
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
              <Building2 className="h-4 w-4 mr-1" />
              500+ Partner Hospitals Worldwide
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Hospital Network</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join the world's most trusted organ donation network, connecting leading healthcare institutions to save
              more lives through coordinated transplant programs.
            </p>
          </div>
        </div>
      </section>

      {/* Network Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">Successful Transplants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">99.9%</div>
              <div className="text-gray-600">Network Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Partner Hospitals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading healthcare institutions that trust LifeLink for their organ donation and transplant coordination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerHospitals.map((hospital, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(hospital.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{hospital.name}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Annual Transplants</p>
                        <p className="font-semibold text-green-600">{hospital.transplants}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Partner Since</p>
                        <p className="font-semibold text-blue-600">{hospital.established}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Globe className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Hospitals */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Hospitals Choose LifeLink</h2>
            <p className="text-xl text-gray-600">
              Comprehensive benefits that enhance your transplant program capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100">
              <CardHeader className="text-center">
                <Activity className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <CardTitle>Improved Outcomes</CardTitle>
                <CardDescription>Better patient outcomes through optimized matching</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>25% faster organ matching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Reduced cold ischemia time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Higher success rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader className="text-center">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Compliance & Security</CardTitle>
                <CardDescription>Meet all regulatory requirements with confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>HIPAA compliant platform</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Automated audit trails</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Regulatory reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader className="text-center">
                <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <CardTitle>Network Access</CardTitle>
                <CardDescription>Connect with a global network of healthcare providers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>500+ partner hospitals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cross-border coordination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Shared best practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600">Choose the right level of access for your institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic Network</CardTitle>
                <CardDescription>Essential features for smaller institutions</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">Free</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic donor matching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Email notifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Standard support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic reporting</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription>Advanced features for active transplant centers</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">Contact Us</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">AI-powered matching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-time tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">24/7 priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">API access</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>Complete solution for large hospital networks</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Dedicated support team</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">White-label options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Training programs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">SLA guarantees</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Join Our Network</h2>
            <p className="text-xl text-gray-600">Simple steps to become a LifeLink partner hospital</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Application</h3>
              <p className="text-gray-600 text-sm">
                Submit your hospital's credentials and transplant program information
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Verification</h3>
              <p className="text-gray-600 text-sm">Our team verifies your medical licenses and accreditations</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Integration</h3>
              <p className="text-gray-600 text-sm">Technical setup and staff training for platform usage</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Go Live</h3>
              <p className="text-gray-600 text-sm">Start coordinating organ donations through our network</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Network?</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with leading healthcare institutions worldwide and enhance your transplant program capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=hospital">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Building2 className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
