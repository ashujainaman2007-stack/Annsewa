import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { 
  getNotifications, 
  markNotificationAsRead as apiMarkAsRead, 
  markAllNotificationsAsRead as apiMarkAllRead,
  broadcastFoodNotification as apiBroadcast
} from '../services/api'

const NotificationContext = createContext(null)

const INITIAL_NOTIFICATIONS = [
  {
    id: 'init-1',
    recipient_type: 'ngo',
    recipient_name: 'All Nearby NGOs',
    title: '🍲 New Food Available!',
    message: 'Vegetable Pulao & Dal (50 servings) donated at AITR Main Canteen. Safe until Today, 8:00 PM.',
    type: 'food_available',
    donation_id: 1,
    food_name: 'Vegetable Pulao & Dal',
    quantity: 50,
    pickup_location: 'AITR Main Canteen, Indore',
    safe_until: 'Today, 8:00 PM',
    status: 'Available',
    is_read: false,
    time_ago: 'Just now'
  },
  {
    id: 'init-2',
    recipient_type: 'ngo',
    recipient_name: 'All Nearby NGOs',
    title: '🍲 New Food Available!',
    message: 'Roti & Sabzi (30 servings) donated at Hostel Mess Block B. Safe until Today, 9:00 PM.',
    type: 'food_available',
    donation_id: 2,
    food_name: 'Roti & Sabzi',
    quantity: 30,
    pickup_location: 'Hostel Mess Block B, Indore',
    safe_until: 'Today, 9:00 PM',
    status: 'Available',
    is_read: false,
    time_ago: '10m ago'
  },
  {
    id: 'init-3',
    recipient_type: 'donor',
    recipient_name: 'AITR Canteen',
    title: '🎉 Donation Claimed!',
    message: 'Seva Foundation claimed your donation of Bread & Snacks. Pickup scheduled for 01:00 PM.',
    type: 'donation_claimed',
    donation_id: 3,
    food_name: 'Bread & Snacks',
    quantity: 30,
    pickup_location: 'Campus Café, Indore',
    safe_until: 'Today, 9:00 PM',
    status: 'Claimed',
    is_read: true,
    time_ago: '1h ago'
  }
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('annsewa_notifications')
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS
    } catch {
      return INITIAL_NOTIFICATIONS
    }
  })

  const [isOpen, setIsOpen] = useState(false)
  const [activeAlert, setActiveAlert] = useState(null)

  // Sync unread count
  const unreadCount = notifications.filter(n => !n.is_read).length

  // Save to localStorage whenever notifications change
  useEffect(() => {
    try {
      localStorage.setItem('annsewa_notifications', JSON.stringify(notifications))
    } catch (e) {
      console.warn('LocalStorage error:', e)
    }
  }, [notifications])

  // Initial load from backend API
  const refreshNotifications = useCallback(async () => {
    try {
      const res = await getNotifications()
      if (res && res.notifications && res.notifications.length > 0) {
        setNotifications(res.notifications)
      }
    } catch (err) {
      console.warn('Using local notifications fallback:', err.message)
    }
  }, [])

  useEffect(() => {
    refreshNotifications()
  }, [refreshNotifications])

  // Open / Close modal
  const openNotifications = () => setIsOpen(true)
  const closeNotifications = () => setIsOpen(false)

  // Trigger temporary push alert banner on phone screen
  const triggerPushAlert = useCallback((alertData) => {
    setActiveAlert(alertData)
    // Auto dismiss after 7 seconds
    const timer = setTimeout(() => {
      setActiveAlert(null)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  // Broadcast newly created donation to all nearby NGOs
  const broadcastNewFood = useCallback(async (donationData) => {
    const newNotif = {
      id: `food-${Date.now()}`,
      recipient_type: 'ngo',
      recipient_name: 'All Nearby NGOs (5 Notified)',
      title: '🍲 New Food Available!',
      message: `${donationData.food_name || 'Fresh Food'} (${donationData.quantity || 50} servings) is available at ${donationData.pickup_location || 'Campus Canteen'}. Safe until ${donationData.safe_until || 'Today, 8:00 PM'}.`,
      type: 'food_available',
      donation_id: donationData.id || 1,
      food_name: donationData.food_name,
      quantity: donationData.quantity || 50,
      pickup_location: donationData.pickup_location,
      safe_until: donationData.safe_until,
      status: 'Available',
      is_read: false,
      time_ago: 'Just now',
      notified_ngos: [
        'Seva Foundation (2.4 km)',
        'Food For All Trust (3.1 km)',
        'Robin Hood Army Indore (1.8 km)',
        'Annapurna Seva Sansthan (2.9 km)',
        'Roti Bank Indore (3.5 km)'
      ]
    }

    setNotifications(prev => [newNotif, ...prev])

    // Trigger instant push alert banner
    triggerPushAlert({
      title: '🔔 New Food Alert for Nearby NGOs!',
      message: `${newNotif.food_name} (${newNotif.quantity} servings) posted! 5 NGOs notified.`,
      donation_id: newNotif.donation_id,
      food_name: newNotif.food_name,
      quantity: newNotif.quantity,
      safe_until: newNotif.safe_until,
      actionText: 'Claim Now'
    })

    // Sync with backend API
    try {
      await apiBroadcast({
        donation_id: donationData.id,
        food_name: donationData.food_name,
        quantity: donationData.quantity,
        pickup_location: donationData.pickup_location,
        safe_until: donationData.safe_until
      })
    } catch (err) {
      console.warn('Backend broadcast sync notice:', err.message)
    }

    return newNotif
  }, [triggerPushAlert])

  // Mark single as read
  const markAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    try {
      if (typeof id === 'number') {
        await apiMarkAsRead(id)
      }
    } catch (err) {
      console.warn('Mark read sync notice:', err.message)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    try {
      await apiMarkAllRead()
    } catch (err) {
      console.warn('Mark all read sync notice:', err.message)
    }
  }

  // Mark notification donation as claimed
  const markDonationClaimed = (donationId, ngoName = 'Seva Foundation') => {
    setNotifications(prev => prev.map(n => {
      if (n.donation_id === donationId || n.id === donationId) {
        return {
          ...n,
          status: 'Claimed',
          claimed_by: ngoName,
          is_read: true
        }
      }
      return n
    }))
  }

  const dismissAlert = () => setActiveAlert(null)

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isOpen,
      openNotifications,
      closeNotifications,
      activeAlert,
      dismissAlert,
      broadcastNewFood,
      markAsRead,
      markAllAsRead,
      markDonationClaimed,
      refreshNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

