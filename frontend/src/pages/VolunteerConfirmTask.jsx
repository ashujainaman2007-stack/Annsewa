import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { DeliveryRiderIllustration } from '../components/FoodIllustrations'
import { FiArrowLeft, FiClock, FiMapPin, FiFileText } from 'react-icons/fi'
import './VolunteerConfirmTask.css'

export default function VolunteerConfirmTask() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [task] = useState({
    id: id || 1,
    title: 'Vegetable Pulao',
    servings: '50 servings',
    from: 'AITR Canteen, Indore',
    to: 'Seva Foundation (NGO), Indore',
    time: 'Today, 12:30 PM'
  })

  const handleConfirm = () => {
    navigate(`/volunteer-active-task/${task.id}`)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="confirm-task-page-container">
      {/* 1. TOP HEADER BAR */}
      <div className="confirm-task-header-bar">
        <StatusBar dark={false} />
        <div className="confirm-task-header-row">
          <button 
            type="button" 
            className="confirm-back-btn" 
            onClick={handleCancel}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="confirm-task-header-title">Confirm Task</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="confirm-task-scroll-body">
        {/* Delivery Rider Graphic */}
        <div className="confirm-rider-visual-wrap">
          <DeliveryRiderIllustration width={150} height={135} />
        </div>

        {/* Headings */}
        <div className="confirm-headings-block">
          <h2 className="confirm-question-title">Claim Task?</h2>
          <p className="confirm-prompt-subtitle">
            You are about to claim this delivery task.
          </p>
        </div>

        {/* Route Summary Card */}
        <div className="confirm-route-summary-card">
          {/* Food & Servings */}
          <div className="route-item-row food-row">
            <span className="route-icon">📋</span>
            <strong className="route-food-bold">
              {task.title} ({task.servings})
            </strong>
          </div>

          {/* Route: From -> To with Down Arrow */}
          <div className="route-item-row location-flow-row">
            <span className="route-icon">📍</span>
            <div className="location-arrow-flow">
              <span className="loc-stop origin">{task.from}</span>
              <span className="loc-arrow-indicator">↓</span>
              <span className="loc-stop destination">{task.to}</span>
            </div>
          </div>

          {/* Time */}
          <div className="route-item-row time-row">
            <span className="route-icon">⏰</span>
            <span className="route-time-text">{task.time}</span>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM DUAL ACTION BUTTONS (Cancel & Confirm Claim) */}
      <div className="confirm-task-bottom-bar">
        <button 
          type="button" 
          className="confirm-cancel-outline-btn"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button 
          type="button" 
          className="confirm-accept-solid-btn"
          onClick={handleConfirm}
        >
          Confirm Claim
        </button>
      </div>
    </div>
  )
}

