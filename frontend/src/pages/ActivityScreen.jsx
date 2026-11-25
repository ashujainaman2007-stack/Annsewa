import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { PulaoImage, SnacksImage, RiceCurryImage } from '../components/FoodIllustrations'
import { FiChevronRight } from 'react-icons/fi'
import { getDonations, getMonthlySummary } from '../services/api'
import './ActivityScreen.css'

const activityTabs = ['Donations', 'Pickups', 'Deliveries']

const defaultActivities = [
  {
    id: 1,
    name: 'Vegetable Pulao & Dal',
    servings: '50 servings • Veg',
    time: 'Today, 11:20 AM',
    status: 'Claimed',
    statusClass: 'status-claimed',
    component: PulaoImage,
  },
  {
    id: 2,
    name: 'Bread & Snacks',
    servings: '30 servings • Veg',
    time: 'Today, 09:15 AM',
    status: 'Picked Up',
    statusClass: 'status-pickup',
    component: SnacksImage,
  },
  {
    id: 3,
    name: 'Rice & Curry',
    servings: '40 servings • Veg',
    time: 'Yesterday, 06:40 PM',
    status: 'Delivered',
    statusClass: 'status-delivered',
    component: RiceCurryImage,
  },
]

export default function ActivityScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Donations')
  const [activities, setActivities] = useState(defaultActivities)
  const [monthStats, setMonthStats] = useState({ donations: 5, pickups: 4, delivered: 4 })

  useEffect(() => {
    getDonations()
      .then((res) => {
        if (res && res.donations && res.donations.length > 0) {
          // Format from backend while keeping illustration mapping
          const formatted = res.donations.slice(0, 3).map((d, index) => {
            const visual = index === 0 ? PulaoImage : index === 1 ? SnacksImage : RiceCurryImage
            const statusClass = d.status === 'Picked Up' ? 'status-pickup' : d.status === 'Delivered' ? 'status-delivered' : 'status-claimed'
            return {
              id: d.id,
              name: d.food_name,
              servings: `${d.quantity} servings • ${d.food_type === 'vegetarian' ? 'Veg' : 'Non-Veg'}`,
              time: d.created_at ? 'Today, 11:20 AM' : 'Today',
              status: d.status,
              statusClass,
              component: visual
            }
          })
          setActivities(formatted)
        }
      })
      .catch((err) => console.warn('Using default activity items:', err))

    getMonthlySummary()
      .then((res) => {
        if (res && res.this_month) {
          setMonthStats(res.this_month)
        }
      })
      .catch((err) => console.warn('Using default monthly stats:', err))
  }, [])

  return (
    <div className="activity-page-container">
      {/* Top Green Gradient Header */}
      <div className="activity-top-green-header">
        <StatusBar dark={true} />

        <div className="activity-brand-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>
      </div>

      <div className="activity-scroll-body">
        {/* Title & Subtitle */}
        <div className="activity-title-block">
          <h2 className="activity-main-title">My Activity</h2>
          <p className="activity-subtitle">
            Track your donations, claims and deliveries
          </p>
        </div>

        {/* Filter Pills */}
        <div className="activity-filter-pill-row">
          {activityTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`activity-filter-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity Items List */}
        <div className="activity-items-list">
          {activities.map((item) => {
            const FoodVisual = item.component
            return (
              <div 
                key={item.id} 
                className="activity-item-card"
                onClick={() => navigate('/donation-tracking')}
                role="button"
                tabIndex={0}
              >
                <div className="activity-item-thumb">
                  <FoodVisual size={58} />
                </div>

                <div className="activity-item-details">
                  <h4 className="activity-item-title">{item.name}</h4>
                  <p className="activity-item-servings">{item.servings}</p>
                  <p className="activity-item-timestamp">{item.time}</p>
                </div>

                <div className="activity-item-right-col">
                  <span className={`activity-status-tag ${item.statusClass}`}>
                    {item.status}
                  </span>
                  <FiChevronRight size={18} color="#9E9E9E" />
                </div>
              </div>
            )
          })}
        </div>

        {/* This Month Summary Card */}
        <div className="this-month-summary-card">
          <h3 className="this-month-title">This Month</h3>
          
          <div className="this-month-stats-grid">
            <div className="month-stat-unit">
              <span className="month-stat-emoji">🍲</span>
              <strong className="month-stat-num">5</strong>
              <span className="month-stat-label">Donations</span>
            </div>

            <div className="month-stat-unit">
              <span className="month-stat-emoji">🚚</span>
              <strong className="month-stat-num">4</strong>
              <span className="month-stat-label">Pickups</span>
            </div>

            <div className="month-stat-unit">
              <span className="month-stat-emoji">✅</span>
              <strong className="month-stat-num">4</strong>
              <span className="month-stat-label">Delivered</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

