import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { PulaoImage, SnacksImage, RiceCurryImage, RotiSabziImage } from '../components/FoodIllustrations'
import { FiClock } from 'react-icons/fi'
import './VolunteerDashboard.css'

const quickActionTiles = [
  { id: 'available', label: 'Available\nTasks', icon: '📋', active: true, path: '/volunteer-dashboard' },
  { id: 'mytasks', label: 'My Tasks', icon: '📋', path: '/volunteer-active-task/1' },
  { id: 'impact', label: 'Impact', icon: '📊', path: '/impact' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '🏆', path: '/profile' },
]

const nearbyVolunteerTasks = [
  {
    id: 1,
    name: 'Vegetable Pulao',
    tag: 'Pickup & Deliver',
    route: 'AITR Canteen → Seva NGO',
    pickupTime: 'Today, 12:30 PM',
    component: PulaoImage,
  },
  {
    id: 2,
    name: 'Bread & Snacks',
    tag: 'Pickup Only',
    route: 'Campus Cafe',
    pickupTime: 'Today, 02:00 PM',
    component: SnacksImage,
  },
  {
    id: 3,
    name: 'Rice & Curry',
    tag: 'Pickup & Deliver',
    route: 'Hotel Mewar → Seva NGO',
    pickupTime: 'Today, 03:15 PM',
    component: RiceCurryImage,
  },
  {
    id: 4,
    name: 'Roti & Sabzi',
    tag: 'Pickup & Deliver',
    route: 'Hostel Mess Block B → Food For All NGO',
    pickupTime: 'Today, 04:00 PM',
    component: RotiSabziImage,
  },
]

export default function VolunteerDashboard() {
  const navigate = useNavigate()
  const [selectedTile, setSelectedTile] = useState('available')

  const handleClaimTask = (taskId) => {
    navigate(`/volunteer-task-details/${taskId}`)
  }

  return (
    <div className="volunteer-page-container">
      {/* 1. TOP GREEN GRADIENT HEADER */}
      <div className="volunteer-top-green-header">
        <StatusBar dark={true} />

        <div className="volunteer-brand-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>
      </div>

      {/* 2. GREETING & 4 QUICK TILES SECTION */}
      <div className="volunteer-intro-section">
        <div className="volunteer-greeting-block">
          <h2 className="volunteer-hi-title">Hi Volunteer! 👋</h2>
          <p className="volunteer-hi-subtitle">
            Pick a task and help deliver food to those in need.
          </p>
        </div>

        {/* 4 Quick Tiles */}
        <div className="volunteer-tiles-grid">
          {quickActionTiles.map((tile) => {
            const isSelected = selectedTile === tile.id
            return (
              <button
                key={tile.id}
                type="button"
                className={`vol-action-tile ${isSelected ? 'active-tile' : ''}`}
                onClick={() => {
                  setSelectedTile(tile.id)
                  if (tile.path && tile.path !== '/volunteer-dashboard') {
                    navigate(tile.path)
                  }
                }}
              >
                <span className="tile-emoji">{tile.icon}</span>
                <span className="tile-label-text">{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. SCROLLABLE NEARBY TASKS LIST */}
      <div className="volunteer-scroll-body">
        {/* Nearby Tasks Header */}
        <div className="nearby-tasks-header-row">
          <h3 className="nearby-tasks-heading">Nearby Tasks (4)</h3>
          <button 
            type="button" 
            className="nearby-view-all-link"
            onClick={() => navigate('/volunteer-dashboard')}
          >
            View All →
          </button>
        </div>

        {/* Task Cards Feed */}
        <div className="volunteer-tasks-feed">
          {nearbyVolunteerTasks.map((task) => {
            const FoodVisual = task.component
            return (
              <div key={task.id} className="vol-task-card">
                <div className="vol-food-thumb">
                  <FoodVisual size={64} />
                </div>

                <div className="vol-card-meta">
                  <span className="vol-task-tag-pill">{task.tag}</span>
                  <h4 className="vol-task-food-title">{task.name}</h4>
                  <p className="vol-task-route-desc">{task.route}</p>
                  <p className="vol-task-time-row">
                    <FiClock size={11} color="#2E7D32" />
                    <span>{task.pickupTime}</span>
                  </p>
                </div>

                <div className="vol-card-action">
                  <button 
                    type="button" 
                    className="vol-claim-pill-btn"
                    onClick={() => handleClaimTask(task.id)}
                  >
                    Claim Task
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
