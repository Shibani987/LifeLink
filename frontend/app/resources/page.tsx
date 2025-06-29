import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  BookOpen,
  Download,
  Video,
  FileText,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Play,
  Calendar,
  Clock,
} from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Documentation",
      icon: FileText,
      items: [
        {
          title: "Platform User Guide",
          description: "Comprehensive guide for healthcare professionals",
          type: "PDF",
          size: "2.5 MB",
          updated: "Dec 2024",
        },
        {
          title: "API Documentation",
          description: "Technical integration guide for developers",
          type: "Web",
          size: "Online",
          updated: "Dec 2024",
        },
        {
          title: "Compliance Manual",
          description: "HIPAA and regulatory compliance guidelines",
          type: "PDF",
          size: "1.8 MB",
          updated: "Nov 2024",
        },
      ],
    },
    {
      category: "Training Materials",
      icon: Video,
      items: [
        {
          title: "Getting Started Video Series",
          description: "Step-by-step platform introduction",
          type: "Video",
          size: "45 min",
          updated: "Dec 2024",
        },
        {
          title: "Best Practices Webinar",
          description: "Optimizing organ donation workflows",
          type: "Video",
          size: "60 min",
          updated: "Nov 2024",
        },
        {
          title: "Emergency Procedures Training",
          description: "Critical case management protocols",
          type: "Video",
          size: "30 min",
          updated: "Oct 2024",
        },
      ],
    },
    {
      category: "Research & Reports",
      icon: BookOpen,
      items: [
        {
          title: "2024 Transplant Outcomes Report",
          description: "Annual analysis of network performance",
          type: "PDF",
          size: "3.2 MB",
          updated: "Dec 2024",
        },
        {
          title: "Technology Impact Study",
          description: "Research on AI-powered matching effectiveness",
          type: "PDF",
          size: "2.1 MB",
          updated: "Sep 2024",
        },
        {
          title: "Global Organ Donation Trends",
          description: "International comparative analysis",
          type: "PDF",
          size: "4.5 MB",
          updated: "Aug 2024",
        },
      ],
    },
  ]

  const upcomingEvents = [
    {
      title: "LifeLink Annual Conference 2025",
      date: "March 15-17, 2025",
      location: "New Delhi, India",
      type: "Conference",
      description: "Join healthcare leaders for the latest in organ donation technology",
    },
    {
      title: "Advanced Matching Algorithms Webinar",
      date: "January 20, 2025",
      location: "Online",
      type: "Webinar",
      description: "Deep dive into our AI-powered matching system",
    },
    {
      title: "Compliance & Security Workshop",
      date: "February 10, 2025",
      location: "Mumbai, India",
      type: "Workshop",
      description: "Ensuring HIPAA compliance in organ donation networks",
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
              <Link href="/hospitals" className="text-gray-700 hover:text-blue-600 font-medium">
                Hospitals
              </Link>
              <Link href="/resources" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Resources
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
            </nav>

            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Access Resources
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
              <BookOpen className="h-4 w-4 mr-1" />
              Comprehensive Learning Resources
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Resources & Support</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access comprehensive documentation, training materials, research reports, and educational content to
              maximize your LifeLink platform experience.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resource Library</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed with LifeLink</p>
          </div>

          <div className="space-y-12">
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <category.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>Size: {item.size}</span>
                          <span>Updated: {item.updated}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Access Tools</h2>
            <p className="text-xl text-gray-600">Essential tools and calculators for healthcare professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Compatibility Calculator</CardTitle>
                <CardDescription>Check donor-recipient compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700">Launch Tool</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Transport Time Calculator</CardTitle>
                <CardDescription>Estimate organ transport duration</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Launch Tool</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Network Directory</CardTitle>
                <CardDescription>Find partner hospitals and contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Browse Directory</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Certification Portal</CardTitle>
                <CardDescription>Access training certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">View Certificates</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events & Training</h2>
            <p className="text-xl text-gray-600">Stay updated with the latest educational opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-100 text-blue-800">{event.type}</Badge>
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Register
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about the LifeLink platform</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle>How do I access the platform for the first time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After your hospital registration is approved, you'll receive login credentials via email. Use these to
                  access the platform and complete the initial setup process with our support team.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle>What training is required for staff members?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All staff members must complete our basic platform training course. Additional specialized training is
                  available for different roles such as coordinators, surgeons, and administrators.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle>How is patient data protected on the platform?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We use enterprise-grade encryption, HIPAA-compliant data handling, and strict access controls. All
                  data is stored in secure, certified data centers with comprehensive audit trails.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardHeader>
                <CardTitle>Can the platform integrate with our existing hospital systems?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, LifeLink supports integration with most major hospital information systems through HL7 FHIR
                  standards and custom APIs. Our technical team assists with the integration process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Contact */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Need Additional Support?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our expert support team is available 24/7 to help you make the most of the LifeLink platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Play className="mr-2 h-5 w-5" />
                Schedule Training
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
