import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { PulaoDalHeroImage } from '../components/FoodIllustrations'
import { FiArrowLeft } from 'react-icons/fi'
import './VolunteerTaskDetails.css'

export default function VolunteerTaskDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [task] = useState({
    id: id || 1,
    title: 'Vegetable Pulao',
    tag: 'Pickup & Deliver',
    quantity: '50 servings',
    pickupFrom: 'AITR Canteen, Indore',
    deliverTo: 'Seva Foundation (NGO), Indore',
    pickupTime: 'Today, 12:30 PM',
    safeUntil: 'Today, 3:00 PM',
    instructions: 'Use clean containers. Keep food covered during delivery.'
  })

  const handleClaimThisTask = () => {
    navigate(`/volunteer-confirm-task/${task.id}`)
  }

  return (
    <div className="task-details-page-container">
      {/* 1. TOP HEADER BAR */}
      <div className="task-details-header-bar">
        <StatusBar dark={false} />
        <div className="task-details-header-row">
          <button 
            type="button" 
            className="task-back-btn" 
            onClick={() => navigate('/volunteer-dashboard')}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="task-details-header-title">Task Details</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <div className="task-details-scroll-body">
        {/* Hero Food Photography Card */}
        <div className="task-hero-card">
          <PulaoDalHeroImage width="100%" height={190} />
        </div>

        {/* Tag & Title Section */}
        <div className="task-title-section">
          <span className="task-type-badge">{task.tag}</span>
          <h2 className="task-main-title">{task.title}</h2>
        </div>

        {/* Metadata Information Card */}
        <div className="task-meta-info-card">
          {/* Quantity */}
          <div className="task-meta-row">
            <div className="task-meta-key-col">
              <span className="task-meta-icon">🍽️</span>
              <span className="task-meta-label">Quantity</span>
            </div>
            <div className="task-meta-val-col">
              <span className="task-val-text">{task.quantity}</span>
            </div>
          </div>

          {/* Pickup From */}
          <div className="task-meta-row">
            <div className="task-meta-key-col">
              <span className="task-meta-icon">📍</span>
              <span className="task-meta-label">Pickup From</span>
            </div>
            <div className="task-meta-val-col">
              <span className="task-val-text">{task.pickupFrom}</span>
            </div>
          </div>

          {/* Deliver To */}
          <div className="task-meta-row">
            <div className="task-meta-key-col">
              <span className="task-meta-icon">📍</span>
              <span className="task-meta-label">Deliver To</span>
            </div>
            <div className="task-meta-val-col">
              <span className="task-val-text">{task.deliverTo}</span>
            </div>
          </div>

          {/* Pickup Time */}
          <div className="task-meta-row">
            <div className="task-meta-key-col">
              <span className="task-meta-icon">⏰</span>
              <span className="task-meta-label">Pickup Time</span>
            </div>
            <div className="task-meta-val-col">
              <span className="task-val-text">{task.pickupTime}</span>
            </div>
          </div>

          {/* Safe Until */}
          <div className="task-meta-row">
            <div className="task-meta-key-col">
              <span className="task-meta-icon">🕒</span>
              <span className="task-meta-label">Safe Until</span>
            </div>
            <div className="task-meta-val-col">
              <span className="task-val-text">{task.safeUntil}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="task-meta-row instructions-row">
            <div className="task-meta-key-col align-top">
              <span className="task-meta-icon">📝</span>
              <span className="task-meta-label">Instructions</span>
            </div>
            <div className="task-meta-val-col">
              <p className="task-instructions-para">{task.instructions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON */}
      <div className="task-details-bottom-bar">
        <button 
          type="button" 
          className="claim-this-task-action-btn"
          onClick={handleClaimThisTask}
        >
          Claim This Task
        </button>
      </div>
    </div>
  )
}

