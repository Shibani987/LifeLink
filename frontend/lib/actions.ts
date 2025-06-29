

type UserType = "hospital" | "donor" | "recipient"

interface User {
  id: number
  name: string
  email: string
  user_type: UserType
  age?: number
  bloodGroup?: string
  organs?: string[]
  city: string
  state: string
  phone: string
  hospitalName?: string
  licenseNumber?: string
  location?: {
    lat: number
    lng: number
  }
}

interface EmergencyRequest {
  id: number
  patientName: string
  age: number
  bloodGroup: string
  organ: string
  urgencyLevel: string
  hospitalName: string
  doctorName: string
  timestamp: string
  status: string
}

let currentUser: any = null

export async function registerUser(userData: any) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data.errors || "Registration failed"))

    return data
  } catch (error) {
    console.error("❌ Backend Error:", error)
    throw error
  }
}
export async function verifyOtp(user_id: number, otp: string) {
  const res = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, otp }),
  })

  const data = await res.json()
  if (!res.ok || !data.success) throw new Error(data.error || "OTP verification failed")
  return data.user
}

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })

    const data = await res.json()

    // ✅ if it's OTP flow
    if (data.success === "otp-sent") {
      return { success: "otp-sent", user_id: data.user_id }
    }

    // ✅ if login successful
    if (data.success === true && data.user) {
      return {
        success: true,
        user: {
          ...data.user,
          userType: data.user.user_type,
        },
      }
    }

    // ❌ otherwise return error
    return { success: false, error: data.error || "Login failed" }

  } catch (error) {
    console.error("Login API error:", error)
    return { success: false, error: "Network or server error" }
  }
}


export async function getCurrentUser() {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("lifelink-user")
  return user ? JSON.parse(user) : null
}

export async function getDonors() {
  const res = await fetch("http://localhost:8000/api/users/?user_type=donor");

  if (!res.ok) {
    throw new Error("Failed to fetch donors");
  }

  const data = await res.json();
  return data.users;
}

export const getEmergencyRequests = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/emergency-requests/");
    if (!res.ok) throw new Error("Failed to fetch emergency requests");

    const data = await res.json();
    return data.requests; // ✅ extract array only
  } catch (err) {
    console.error("❌ getEmergencyRequests error:", err);
    return [];
  }
};

export async function createEmergencyRequest(data: any) {
  const res = await fetch("http://127.0.0.1:8000/api/emergency-requests/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text(); // <-- get raw text
    console.error("🚨 Server Error Status:", res.status);
    console.error("🚨 Server Raw Response:", text);
    throw new Error(`Failed to create emergency request: ${res.status}`);
  }

  return await res.json();
}

export async function getDonorMatches(recipientId: number) {
  console.log("Fetching recipient matches for user ID:", recipientId)

  const res = await fetch(`http://localhost:8000/api/matching-donors/${recipientId}/`)
  if (!res.ok) throw new Error("Failed to fetch donor matches")
  const data = await res.json()
  return data.matches || []
}

export async function searchDonors(filters: {
  organ?: string
  bloodGroup?: string
  location?: string
  maxDistance?: number
}): Promise<User[]> {
  const donors = await getDonors()
  let filtered = donors

  if (filters.organ) {
    filtered = filtered.filter((donor: User) =>
      donor.organs?.includes(filters.organ!)
    )
  }

  if (filters.bloodGroup) {
    filtered = filtered.filter((donor: User) =>
      donor.bloodGroup === filters.bloodGroup
    )
  }

  if (filters.location) {
    filtered = filtered.filter((donor: User) =>
      donor.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
      donor.state.toLowerCase().includes(filters.location!.toLowerCase())
    )
  }

  return filtered
}
  