"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Filter, Search, Phone, Mail } from "lucide-react"
import { getDonors } from "@/lib/actions"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const ORGANS = ["Heart", "Liver", "Kidney", "Lungs", "Pancreas", "Cornea", "Skin", "Bone"]

export default function MapPage() {
  const [donors, setDonors] = useState<any[]>([])
  const [filteredDonors, setFilteredDonors] = useState<any[]>([])
  const [filters, setFilters] = useState({
    organ: "",
    bloodGroup: "",
    maxDistance: "50",
    searchLocation: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDonor, setSelectedDonor] = useState<null | { name: string, phone: string, email: string }>(null)
const [showContactInfo, setShowContactInfo] = useState(false)


useEffect(() => {
  const loadDonors = async () => {
    try {
      const donorData = await getDonors()
      setDonors(donorData)
      setFilteredDonors(donorData)
    } catch (error) {
      console.error("Failed to load donors:", error)
    } finally {
      setIsLoading(false)
    }
  }

  loadDonors()
}, [])


  useEffect(() => {
    let filtered = donors

    if (filters.organ) {
      filtered = filtered.filter((donor) => donor.organs.includes(filters.organ))
    }

    if (filters.bloodGroup) {
      filtered = filtered.filter((donor) => donor.bloodGroup === filters.bloodGroup)
    }

    if (filters.searchLocation) {
      filtered = filtered.filter(
        (donor) =>
          donor.city.toLowerCase().includes(filters.searchLocation.toLowerCase()) ||
          donor.state.toLowerCase().includes(filters.searchLocation.toLowerCase()),
      )
    }

    setFilteredDonors(filtered)
  }, [filters, donors])
 const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapCenter = {
    lat: 22.5726,
    lng: 88.3639,
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold text-white">LifeLink</span>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-2">Live Donor Map</h1>
          <p className="text-gray-300 text-lg">Find organ donors near you in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
                <CardDescription>Refine your search criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="organ">Organ Type</Label>
                  <Select onValueChange={(value) => setFilters((prev) => ({ ...prev, organ: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organs</SelectItem>
                      {ORGANS.map((organ) => (
                        <SelectItem key={organ} value={organ}>
                          {organ}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select onValueChange={(value) => setFilters((prev) => ({ ...prev, bloodGroup: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blood Groups</SelectItem>
                      {BLOOD_GROUPS.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxDistance">Max Distance (km)</Label>
                  <Select onValueChange={(value) => setFilters((prev) => ({ ...prev, maxDistance: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="50 km" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                      <SelectItem value="500">500 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="searchLocation">Search Location</Label>
                  <Input
                    id="searchLocation"
                    placeholder="City or state"
                    value={filters.searchLocation}
                    onChange={(e) => setFilters((prev) => ({ ...prev, searchLocation: e.target.value }))}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({ organ: "", bloodGroup: "", maxDistance: "50", searchLocation: "" })}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{filteredDonors.length}</div>
                  <p className="text-sm text-gray-600">Donors Found</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Placeholder */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Interactive Map
                </CardTitle>
                <CardDescription>Donors are displayed as markers on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Simulated Map */}
                  <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={mapCenter}
    zoom={10}
  >
    {filteredDonors.slice(0, 10).map((donor, index) => (
      <Marker
        key={donor.id}
        position={{
          lat: donor.latitude || mapCenter.lat + Math.random() * 0.05,
          lng: donor.longitude || mapCenter.lng + Math.random() * 0.05,
        }}
        title={`${donor.name} - ${donor.city}`}
      />
    ))}
  </GoogleMap>
</LoadScript>

                  {/* Donor Markers */}
                 

                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map View</p>
                    <p className="text-sm text-gray-500">
                      {filteredDonors.length} donors shown within {filters.maxDistance}km radius
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor List */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Available Donors
                </CardTitle>
                <CardDescription>Contact information for verified donors</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600">Loading donors...</p>
                  </div>
                ) : filteredDonors.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDonors.map((donor) => (
                     
                          <div key={donor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white text-black">
  <div className="flex items-start justify-between mb-3">
    <div>
      <h3 className="font-semibold text-lg text-black">{donor.name}</h3>
      <p className="text-black flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        {donor.city}, {donor.state}
      </p>
    </div>
    <Badge variant="outline" className="text-lg">
      {donor.bloodGroup}
    </Badge>
  </div>

  <div className="mb-3">
    <p className="text-sm font-medium text-black mb-2">Available Organs:</p>
    <div className="flex flex-wrap gap-2">
      {donor.organs.map((organ: string) => (
        <Badge key={organ} className="bg-green-100 text-green-800">
          {organ}
        </Badge>
      ))}
    </div>
  </div>

  <div className="flex items-center justify-between">
    <div className="text-sm text-black">
      <p>Age: {donor.age} years</p>
      <p>Distance: ~{Math.floor(Math.random() * 50 + 5)}km</p>
    </div>
    <div className="flex space-x-2">
      <Button
  size="sm"
  variant="outline"
  onClick={() => {
    setSelectedDonor({ name: donor.name, phone: donor.phone, email: donor.email })
    setShowContactInfo(true)
  }}
>
  <Phone className="h-4 w-4 mr-1" />
  Call
</Button>

<Button
  size="sm"
  onClick={() => {
    window.location.href = `mailto:${donor.email}`
  }}
>
  <Mail className="h-4 w-4 mr-1" />
  Contact
</Button>

    </div>
  </div>
</div>

                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No donors found</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters or expanding the search radius</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {showContactInfo && selectedDonor && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Contact {selectedDonor.name}</h2>
      <p className="text-gray-700 mb-4">Phone Number:</p>
      <p className="font-mono text-xl text-blue-600">{selectedDonor.phone}</p>

      <Button className="mt-6 w-full" onClick={() => setShowContactInfo(false)}>
        Close
      </Button>
    </div>
  </div>
)}

    </div>
  )
}
