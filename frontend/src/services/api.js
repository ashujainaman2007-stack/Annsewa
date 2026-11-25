const API_BASE_URL = '/api'

/**
 * Universal API helper that handles requests, JSON serialization, and fallback errors
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`[Annsewa API] Error on ${endpoint}:`, error.message)
    throw error
  }
}

// 1. Donations API
export async function getDonations(params = {}) {
  const query = new URLSearchParams(params).toString()
  return apiRequest(`/donations${query ? `?${query}` : ''}`)
}

export async function getAvailableDonations() {
  return apiRequest('/donations/available')
}

export async function getDonationById(id) {
  return apiRequest(`/donations/${id}`)
}

export const getDonation = getDonationById

export async function createDonation(data) {
  return apiRequest('/donations', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function claimDonation(id, ngoName = 'Seva Foundation') {
  return apiRequest(`/donations/${id}/claim`, {
    method: 'POST',
    body: JSON.stringify({ ngo_name: ngoName })
  })
}

// 2. NGOs API
export async function getNGOs() {
  return apiRequest('/ngos')
}

export async function getNearbyNGOs() {
  return apiRequest('/ngos/nearby')
}

export async function getNGOStats() {
  return apiRequest('/ngos/stats')
}

// 3. Volunteers API
export async function getVolunteerTasks(status = 'open') {
  return apiRequest(`/volunteers/tasks?status=${status}`)
}

export async function claimVolunteerTask(donationId, volunteerName = 'Aman Jain') {
  return apiRequest(`/volunteers/tasks/${donationId}/claim`, {
    method: 'POST',
    body: JSON.stringify({ volunteer_name: volunteerName })
  })
}

export async function getVolunteerStats() {
  return apiRequest('/volunteers/stats')
}

// 4. Live Tracking API
export async function getTracking(donationId = 1) {
  return apiRequest(`/tracking/${donationId}`)
}

// 5. Impact Metrics API
export async function getImpact() {
  return apiRequest('/impact')
}

export async function getWeeklyImpact() {
  return apiRequest('/impact/weekly')
}

export async function getMonthlySummary() {
  return apiRequest('/impact/monthly')
}

// 6. User Profile API
export async function getUserProfile() {
  return apiRequest('/auth/profile')
}

export async function updateUserProfile(data) {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

// 7. Notifications API (Food Alerts for NGOs & Donors)
export async function getNotifications(params = {}) {
  const query = new URLSearchParams(params).toString()
  return apiRequest(`/notifications${query ? `?${query}` : ''}`)
}

export async function getUnreadNotificationsCount() {
  return apiRequest('/notifications/unread-count')
}

export async function markNotificationAsRead(id) {
  return apiRequest(`/notifications/${id}/read`, {
    method: 'POST'
  })
}

export async function markAllNotificationsAsRead() {
  return apiRequest('/notifications/mark-all-read', {
    method: 'POST'
  })
}

export async function broadcastFoodNotification(data) {
  return apiRequest('/notifications/broadcast-food', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}


