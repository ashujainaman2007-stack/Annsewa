import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { PulaoImage } from '../components/FoodIllustrations'
import { FiClock, FiMapPin } from 'react-icons/fi'
import './HomeDashboard.css'

const quickActions = [
  { icon: '🍲', label: 'Donate', path: '/create-donation' },
  { icon: '📋', label: 'Claim\nFood', path: '/ngo-dashboard' },
  { icon: '🙋', label: 'Volunteer', path: '/volunteer-dashboard' },
  { icon: '📊', label: 'Impact', path: '/impact' },
]

export default function HomeDashboard() {
  const navigate = useNavigate()

  return (
    <div className="home-page-container">
      {/* Top Green Gradient Header */}
      <div className="home-top-header">
        <StatusBar dark={true} />

        <div className="home-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>

        {/* Hero Card */}
        <div className="home-hero-card">
          <div className="hero-text-block">
            <h2 className="hero-card-title">
              Turn<br />
              <span className="hero-green-highlight">Surplus Food</span><br />
              into a Meal
            </h2>
            <p className="hero-card-subtitle">for Someone in Need</p>
          </div>

          <div className="hero-food-visual">
            <PulaoImage size={86} />
          </div>
        </div>
      </div>

      {/* Main Scroll Content */}
      <div className="home-scroll-body">
        {/* 4 Quick Actions Row */}
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="quick-action-card"
              onClick={() => navigate(action.path)}
            >
              <div className="quick-action-icon-circle">
                <span className="action-emoji">{action.icon}</span>
              </div>
              <span className="quick-action-text">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Available Donations Section Header */}
        <div className="section-title-row">
          <h3 className="section-title">Available Donations</h3>
          <button 
            type="button" 
            className="view-all-link"
            onClick={() => navigate('/ngo-dashboard')}
          >
            View All →
          </button>
        </div>

        {/* Available Donation Card (Vegetable Pulao & Dal) */}
        <div className="donation-listing-card">
          <div className="donation-card-top-row">
            {/* Left Food Image with Veg Badge */}
            <div className="donation-food-thumb-wrap">
              <PulaoImage size={68} />
              <span className="veg-badge-pill">
                <span className="veg-green-circle"></span>
                <span>Veg</span>
              </span>
            </div>

            {/* Donation Details */}
            <div className="donation-card-details">
              <div className="donation-card-header-line">
                <h4 className="donation-food-name">Vegetable Pulao & Dal</h4>
                <span className="urgent-badge">Urgent</span>
              </div>
              <p className="donation-org-location">🏢 AITR Canteen</p>
              <p className="donation-safe-until">
                <FiClock size={11} color="#D32F2F" />
                <span>Safe Until: <strong style={{ color: '#D32F2F' }}>Today, 8:00 PM</strong></span>
              </p>
              <p className="donation-geo-address">
                <FiMapPin size={11} color="#757575" />
                <span>AITR Main Canteen, Indore</span>
              </p>
            </div>
          </div>

          {/* Donation Card Bottom Row */}
          <div className="donation-card-bottom-row">
            <div className="donation-tags-group">
              <span className="servings-count">
                🍽️ <strong>50</strong> servings
              </span>
              <span className="cooked-meal-pill">
                🍲 Cooked Meal
              </span>
            </div>

            <button 
              type="button" 
              className="claim-green-btn"
              onClick={() => navigate('/donation-details/1')}
            >
              Claim
            </button>
          </div>
        </div>

        {/* Our Impact (This Month) Bottom Banner */}
        <div className="home-impact-banner" onClick={() => navigate('/impact')}>
          <div className="impact-banner-left">
            <div className="impact-sprout-icon">🌱</div>
            <div className="impact-banner-label">
              <strong>Our Impact</strong>
              <span>(This Month)</span>
            </div>
          </div>

          <div className="impact-metrics-row">
            <div className="impact-mini-stat">
              <span className="stat-emoji">🍲</span>
              <strong>1,240</strong>
              <small>Meals Saved</small>
            </div>
            <div className="impact-mini-stat">
              <span className="stat-emoji">👥</span>
              <strong>28</strong>
              <small>Donors</small>
            </div>
            <div className="impact-mini-stat">
              <span className="stat-emoji">🏢</span>
              <strong>10</strong>
              <small>NGOs</small>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Nav with 5 Buttons */}
      <BottomNav />
    </div>
  )
}
