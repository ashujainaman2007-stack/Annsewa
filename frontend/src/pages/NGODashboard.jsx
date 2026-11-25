import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { useNotifications } from '../context/NotificationContext'
import { PulaoImage, SnacksImage, RiceCurryImage } from '../components/FoodIllustrations'
import { FiBell, FiSearch, FiClock, FiMapPin, FiX, FiCheckCircle } from 'react-icons/fi'
import { getAvailableDonations } from '../services/api'
import './NGODashboard.css'

const filterTabs = ['All', 'Veg', 'Non-Veg', 'Nearby']

const defaultAvailableDonations = [
  {
    id: 1,
    name: 'Vegetable Pulao & Dal',
    servings: '50 servings • Veg',
    location: 'AITR Canteen, Indore',
    expiry: 'Today, 8:00 PM',
    food_type: 'Veg',
    component: PulaoImage,
  },
  {
    id: 2,
    name: 'Bread & Snacks',
    servings: '30 servings • Veg',
    location: 'Campus Cafe, Indore',
    expiry: 'Today, 7:30 PM',
    food_type: 'Veg',
    component: SnacksImage,
  },
  {
    id: 3,
    name: 'Rice & Curry',
    servings: '40 servings • Veg',
    location: 'Hotel Mewar, Indore',
    expiry: 'Tomorrow, 12:00 PM',
    food_type: 'Veg',
    component: RiceCurryImage,
  },
]

export default function NGODashboard() {
  const navigate = useNavigate()
  const { notifications, markAsRead } = useNotifications()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [donations, setDonations] = useState(defaultAvailableDonations)

  // Find latest available food alert sent to NGOs
  const latestFoodAlert = notifications.find(n => n.type === 'food_available' && n.status === 'Available')

  useEffect(() => {
    getAvailableDonations()
      .then((res) => {
        if (res && res.donations && res.donations.length > 0) {
          const mapped = res.donations.map((d, index) => {
            const Visual = index === 0 ? PulaoImage : index === 1 ? SnacksImage : RiceCurryImage
            return {
              id: d.id,
              name: d.food_name,
              servings: `${d.quantity} servings • ${d.food_type === 'vegetarian' ? 'Veg' : 'Non-Veg'}`,
              location: d.pickup_location,
              expiry: d.safe_until,
              food_type: d.food_type === 'vegetarian' ? 'Veg' : 'Non-Veg',
              component: Visual
            }
          })
          setDonations(mapped)
        }
      })
      .catch((err) => console.warn('Using default available donations for NGO:', err))
  }, [])

  // Filter donations
  const filteredDonations = donations.filter((item) => {
    if (activeFilter === 'Veg' && item.food_type !== 'Veg') return false
    if (activeFilter === 'Non-Veg' && item.food_type !== 'Non-Veg') return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q)
    }
    return true
  })

  const handleClaimClick = (donationId) => {
    navigate(`/donation-details/${donationId}`)
  }

  return (
    <div className="ngo-page-container">
      {/* 1. TOP GREEN GRADIENT HEADER */}
      <div className="ngo-top-green-header">
        <StatusBar dark={true} />

        <div className="ngo-brand-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>
      </div>

      {/* 2. SUBHEADER: GREETING & SEARCH */}
      <div className="ngo-greeting-section">
        <div className="ngo-greeting-text-col">
          <h2 className="ngo-salute-title">Hi NGO,</h2>
          <p className="ngo-salute-subtitle">
            Here are nearby food donations <br />
            you can claim.
          </p>
        </div>

        <button 
          type="button" 
          className="ngo-search-trigger-circle"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search Donations"
        >
          {searchOpen ? <FiX size={18} color="#2E7D32" /> : <FiSearch size={18} color="#2E7D32" />}
        </button>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="ngo-search-expand-bar">
          <FiSearch size={16} color="#757575" />
          <input
            type="text"
            className="ngo-search-input"
            placeholder="Search by food name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      )}

      {/* Real-Time Food Alert Notification Card for NGO */}
      {latestFoodAlert && (
        <div 
          className="ngo-incoming-alert-card"
          onClick={() => {
            markAsRead(latestFoodAlert.id)
            handleClaimClick(latestFoodAlert.donation_id || 1)
          }}
        >
          <div className="incoming-alert-badge-row">
            <span className="alert-pulse-tag">
              <span className="alert-pulse-circle"></span>
              <span>LIVE FOOD ALERT FOR YOUR NGO</span>
            </span>
            <span className="alert-time-tag">{latestFoodAlert.time_ago || 'Just now'}</span>
          </div>

          <div className="incoming-alert-content-row">
            <div className="alert-food-symbol">🍲</div>
            <div className="alert-food-meta">
              <h4 className="alert-food-title">{latestFoodAlert.food_name || 'Vegetable Pulao'}</h4>
              <p className="alert-food-details">
                <strong>{latestFoodAlert.quantity || 50} servings</strong> • {latestFoodAlert.pickup_location || 'AITR Canteen'}
              </p>
            </div>
            <button 
              type="button" 
              className="alert-claim-action-btn"
              onClick={(e) => {
                e.stopPropagation()
                markAsRead(latestFoodAlert.id)
                handleClaimClick(latestFoodAlert.donation_id || 1)
              }}
            >
              Claim Food
            </button>
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <div className="ngo-filter-pills-row">
        {filterTabs.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`ngo-pill-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 3. SCROLLABLE AVAILABLE DONATIONS LIST */}
      <div className="ngo-scroll-body">
        <div className="ngo-donations-feed">
          {filteredDonations.map((item) => {
            const FoodVisual = item.component
            return (
              <div key={item.id} className="ngo-claim-card">
                <div className="ngo-food-thumb">
                  <FoodVisual size={64} />
                </div>

                <div className="ngo-card-details">
                  <h4 className="ngo-food-title">{item.name}</h4>
                  <p className="ngo-food-servings">{item.servings}</p>
                  <p className="ngo-food-location">
                    <FiMapPin size={11} color="#2E7D32" />
                    <span>{item.location}</span>
                  </p>
                  <p className="ngo-food-expiry">
                    <FiClock size={11} color="#D32F2F" />
                    <span>Safe until: <strong>{item.expiry}</strong></span>
                  </p>
                </div>

                <div className="ngo-card-action">
                  <button 
                    type="button" 
                    className="claim-green-pill-btn"
                    onClick={() => handleClaimClick(item.id)}
                  >
                    Claim
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. PERSISTENT 5-TAB FIXED BOTTOM NAVIGATION */}
      <BottomNav />
    </div>
  )
}
