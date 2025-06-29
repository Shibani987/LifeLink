"use client"
import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Users, AlertTriangle, Plus, Settings } from "lucide-react"
import { getCurrentUser, getEmergencyRequests, getDonorMatches } from "@/lib/actions"
export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [emergencyRequests, setEmergencyRequests] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [donors, setDonors] = useState<any[]>([])
  const [recipients, setRecipients] = useState<any[]>([])
 // Tracks which recipient IDs have their phone number visible
const [visiblePhones, setVisiblePhones] = useState<{ [id: number]: boolean }>({});
const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
const [showRequestModal, setShowRequestModal] = useState(false)
const router = useRouter();


useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const storedUser = localStorage.getItem("lifelink-user")
      if (!storedUser) return

      const parsedUser = JSON.parse(storedUser)

      // ✅ Normalize userType if missing
      if (!parsedUser.userType && parsedUser.user_type) {
        parsedUser.userType = parsedUser.user_type
      }

      setUser(parsedUser)

      // Recipient Dashboard → fetch matching donors
      if (parsedUser.userType === "recipient") {
        const matches = await getDonorMatches(parsedUser.id)
        setMatches(matches)
      }

      // Hospital Dashboard → fetch all emergency requests
      else if (parsedUser.userType === "hospital") {
        const requests = await getEmergencyRequests()
        setEmergencyRequests(requests)
      }

      // Donor Dashboard → fetch matching recipients
      else if (parsedUser.userType === "donor") {
        const res = await fetch(`http://127.0.0.1:8000/api/matching-recipients/${parsedUser.id}/`)
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Status ${res.status} - ${text}`)
        }
        const data = await res.json()
        setMatches(data.matches || [])
      }
    } catch (err) {
      console.error("💥 Dashboard fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  loadDashboardData()
}, [])


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Heart className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 animate-ping"></div>
          </div>
          <p className="text-white text-lg">Loading your dashboard...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    )
  }
 if (!user || !user.userType) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>Please log in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
localStorage.removeItem("lifelink-user")


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold text-white">LifeLink</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/map">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <MapPin className="mr-2 h-4 w-4" />
                Live Map
              </Button>
            </Link>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-300 text-lg">
            {user.userType === "donor" && "Thank you for being a life-saving donor. ❤️"}
            {user.userType === "recipient" && "We're here to help you find the match you need. 🙏"}
            {user.userType === "hospital" && "Manage emergency requests and coordinate organ donations. 🏥"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Your Status</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.userType === "donor" ? "Active" : user.userType === "recipient" ? "Searching" : "Verified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {user.userType === "hospital" ? "Active Cases" : "Potential Matches"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.userType === "hospital" ? emergencyRequests.length : matches.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-2xl font-bold text-gray-900">{user.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Last Active</p>
                  <p className="text-2xl font-bold text-gray-900">Now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Based on User Type */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donor Dashboard */}
            {user.userType === "donor" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Donation Profile</CardTitle>
                    <CardDescription>Organs available for donation</CardDescription>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Blood Group</p>
                        <Badge variant="outline" className="text-lg">
                            {user.bloodGroup || user.blood_group }
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Available Organs</p>
                        <div className="flex flex-wrap gap-2">
                          {user.organs?.map((organ: string) => (
                            <Badge key={organ} className="bg-green-100 text-green-800">
                              {organ}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your donation history and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm">Profile activated and verified</p>
                        <span className="text-xs text-gray-500 ml-auto">Today</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm">Added to donor registry</p>
                        <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

   <Card>
  <CardHeader>
    <CardTitle>Potential Matches</CardTitle>
    <CardDescription>Recipients that match your donation profile</CardDescription>
  </CardHeader>

  <CardContent>
    {matches.length > 0 ? (
      <div className="space-y-4">
        {matches.map((recipient: any) => (
          <div
            key={recipient.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
          >
            {/* Recipient details */}
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg text-gray-800">
                {recipient.name || recipient.patientName}
              </p>
              <p className="text-sm text-gray-600">City: {recipient.city}</p>
              <p className="text-sm text-gray-600">Organ Needed: {recipient.organs}</p>
              <p className="text-sm text-gray-600">Blood Group: {recipient.bloodGroup}</p>
              <p className="text-sm text-gray-600">Hospital: {recipient.hospitalName}</p>
              <p className="text-sm text-gray-600">Doctor: {recipient.doctorName}</p>
              <p className="text-sm text-gray-600">Urgency: {recipient.urgencyLevel}</p>

              {visiblePhones[recipient.id] && (
                <p className="text-sm text-red-600 font-semibold mt-2">
                  📞 {recipient.phone}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  window.location.href = `mailto:${recipient.email}`;
                }}
              >
                Contact
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setVisiblePhones(prev => ({
                    ...prev,
                    [recipient.id]: !prev[recipient.id],
                  }))
                }
              >
                {visiblePhones[recipient.id] ? "Hide Number" : "Call"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No matching recipients found</p>
      </div>
    )}
  </CardContent>
</Card>



              </>
            )}

            {/* Recipient Dashboard */}
            {user.userType === "recipient" && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Emergency Request</CardTitle>
                        <CardDescription>Submit an urgent organ request</CardDescription>
                      </div>
                      <Link href="/emergency-request">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          New Request
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No active emergency requests</p>
                      <Link href="/emergency-request">
                        <Button variant="outline">Create Emergency Request</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

<Card>
  <CardHeader>
    <CardTitle>Potential Matches</CardTitle>
    <CardDescription>Donors that match your requirements</CardDescription>
  </CardHeader>
  <CardContent>
    {matches.length > 0 ? (
      <div className="space-y-4">
        {matches.map((match: any) => (
          <div
            key={match.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg text-gray-800">{match.name}</p>
              <p className="text-sm text-gray-600">Organ: {match.organs?.join(", ")}</p>
              <p className="text-sm text-gray-600">Blood Group: {match.bloodGroup}</p>
              <p className="text-sm text-gray-600">Distance: {match.distance ?? "N/A"} km</p>
              <p className="text-sm text-gray-600">City: {match.city}</p>
              {visiblePhones[match.id] && (
                <p className="text-sm text-red-600 font-semibold mt-2">📞 {match.phone}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  window.location.href = `mailto:${match.email}`;
                }}
              >
                Contact
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setVisiblePhones(prev => ({
                    ...prev,
                    [match.id]: !prev[match.id],
                  }))
                }
              >
                {visiblePhones[match.id] ? "Hide Number" : "Call"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No matches found yet</p>
      </div>
    )}
  </CardContent>
</Card>

              </>
            )}

            {/* Hospital Dashboard */}
            {user.userType === "hospital" && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Emergency Requests</CardTitle>
                        <CardDescription>Active organ requests requiring attention</CardDescription>
                      </div>
                      <Badge variant="destructive">{emergencyRequests.length} Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {emergencyRequests.length > 0 ? (
                      <div className="space-y-4">
                        {emergencyRequests.map((request, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{request.organs} Request</h3>
                              <Badge variant="destructive">
                    {request.urgency_level.charAt(0).toUpperCase() + request.urgency_level.slice(1)}
                  </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Patient: {request.patient_name} | Blood Group: {request.blood_group}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              Requested: {new Date(request.timestamp).toLocaleDateString()}
                            </p>
                            <div className="flex space-x-2">
                              <Button
  size="sm"
  onClick={() => {
    router.push(
      `/map?organ=${request.organs}&bloodGroup=${request.blood_group}`
    )
  }}
>
  Find Donors
</Button>

                              <Button
  size="sm"
  variant="outline"
  onClick={() => {
    setSelectedRequest(request)
    setShowRequestModal(true)
  }}
>
  View Details
</Button>

                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No emergency requests at the moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/map">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Live Map
                  </Button>
                </Link>
                {user.userType === "recipient" && (
                  <Link href="/emergency-request">
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Emergency Request
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">24/7 Helpline</p>
                    <p className="text-lg font-bold text-red-500">1-800-LIFELINK</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emergency Email</p>
                    <p className="text-sm text-gray-600">emergency@lifelink.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {showRequestModal && selectedRequest && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
      <h2 className="text-xl font-bold mb-4">Emergency Request Details</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Patient:</strong> {selectedRequest.patient_name}</p>
        <p><strong>Age:</strong> {selectedRequest.age}</p>
        <p><strong>Organ Needed:</strong> {selectedRequest.organs}</p>
        <p><strong>Blood Group:</strong> {selectedRequest.blood_group}</p>
        <p><strong>Urgency Level:</strong> {selectedRequest.urgency_level}</p>
        <p><strong>Hospital:</strong> {selectedRequest.hospital_name}</p>
        <p><strong>Doctor:</strong> {selectedRequest.doctor_name}</p>
        <p><strong>Status:</strong> {selectedRequest.status}</p>
        <p><strong>Requested On:</strong> {new Date(selectedRequest.timestamp).toLocaleString()}</p>
      </div>
      <div className="mt-6 text-right">
        <Button onClick={() => setShowRequestModal(false)}>Close</Button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}
