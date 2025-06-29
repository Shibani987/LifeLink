import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, Calendar, Clock, Video, Mail, Phone, Download, Users, ArrowRight } from "lucide-react"

export default function DemoConfirmationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">LifeLink</span>
              <p className="text-sm text-gray-600">Organ Donation Network</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Confirmation Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Demo Scheduled Successfully!</h1>
              <p className="text-xl text-gray-600">
                Thank you for your interest in LifeLink. We're excited to show you how our platform can transform your
                organ donation program.
              </p>
            </div>

            {/* Demo Details */}
            <Card className="border-2 border-green-200 bg-green-50 mb-8">
              <CardHeader>
                <CardTitle className="text-green-900">Your Demo Details</CardTitle>
                <CardDescription className="text-green-700">
                  Please save these details and add the session to your calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Date & Time</p>
                        <p className="text-green-700">March 15, 2025 at 2:00 PM IST</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Duration</p>
                        <p className="text-green-700">45 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Video className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Format</p>
                        <p className="text-green-700">Video Call via Microsoft Teams</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Demo Specialist</p>
                        <p className="text-green-700">Dr. Rajesh Kumar, Solutions Architect</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Confirmation Email</p>
                        <p className="text-green-700">Sent to your registered email</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Contact</p>
                        <p className="text-green-700">+91-11-4567-8900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle>What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Confirmation Email</p>
                        <p className="text-xs text-gray-600">
                          You'll receive a detailed email with calendar invite and joining instructions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Pre-Demo Preparation</p>
                        <p className="text-xs text-gray-600">
                          Our team will review your requirements and prepare a customized demonstration
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Demo Session</p>
                        <p className="text-xs text-gray-600">
                          Interactive platform walkthrough with Q&A and implementation discussion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-sm">Follow-up</p>
                        <p className="text-xs text-gray-600">
                          Detailed proposal and implementation timeline based on your needs
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle>Prepare for Your Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Recommended Attendees:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Chief Medical Officer or Department Head</li>
                        <li>• Transplant Coordinator</li>
                        <li>• IT Director or Systems Administrator</li>
                        <li>• Quality Assurance Manager</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-sm mb-2">Questions to Consider:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Current organ donation volume and processes</li>
                        <li>• Integration requirements with existing systems</li>
                        <li>• Compliance and reporting needs</li>
                        <li>• Timeline for implementation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download Calendar Invite
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Resend Confirmation Email
              </Button>
              <Link href="/resources">
                <Button variant="outline">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Browse Resources
                </Button>
              </Link>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-gray-100 text-center">
                <CardContent className="p-6">
                  <Video className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Requirements</h3>
                  <p className="text-sm text-gray-600">
                    Stable internet connection and Microsoft Teams or web browser access required
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Need to Reschedule?</h3>
                  <p className="text-sm text-gray-600">
                    Contact our team at least 24 hours in advance to reschedule your demo session
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
                  <p className="text-sm text-gray-600">
                    Our sales team is available to answer any questions before your demo session
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking Forward to Our Demo!</h2>
          <p className="text-xl mb-6 opacity-90">
            We're excited to show you how LifeLink can transform your organ donation program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore Resources
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
