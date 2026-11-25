import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { PulaoImage } from '../components/FoodIllustrations'
import { 
  FiArrowLeft, 
  FiCheck, 
  FiClock, 
  FiMapPin, 
  FiFlag,
  FiTarget
} from 'react-icons/fi'
import './TrackDonation.css'

export default function TrackDonation() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const methodParam = searchParams.get('method')
  const isDelivery = methodParam === 'delivery'
  const methodLabel = isDelivery ? 'Annsewa Delivery' : 'NGO Self-Pickup'

  const [activeStep, setActiveStep] = useState(2) // 1: Claimed, 2: Arranged, 3: Picked Up, 4: Delivered

  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1)
    }
  }

  return (
    <div className="track-donation-container">
      {/* 1. TOP HEADER WITH BACK BUTTON */}
      <div className="track-header-bar">
        <StatusBar dark={false} />
        <div className="track-header-row">
          <button 
            type="button" 
            className="track-back-btn" 
            onClick={() => navigate('/ngo-dashboard')}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="track-header-title">Track Donation</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="track-scroll-body">
        {/* Timeline Stepper Tree */}
        <div className="track-timeline-card">
          {/* Node 1: Donation Claimed */}
          <div className="track-step-item">
            <div className="track-node-col">
              <div className="step-badge-circle completed">
                <FiCheck size={14} color="#FFFFFF" strokeWidth={3} />
              </div>
              <div className="track-stem-line completed"></div>
            </div>
            <div className="track-step-content">
              <h4 className="step-title">Donation Claimed</h4>
              <p className="step-subtitle">You claimed this donation.</p>
              <span className="step-timestamp">Today, 12:40 PM</span>
            </div>
          </div>

          {/* Node 2: Pickup Arranged */}
          <div className="track-step-item">
            <div className="track-node-col">
              <div className={`step-badge-circle ${activeStep >= 2 ? 'active-truck' : 'pending'}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
                  <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className={`track-stem-line ${activeStep >= 3 ? 'completed' : 'pending'}`}></div>
            </div>
            <div className="track-step-content">
              <div className="step-title-row">
                <h4 className="step-title">Pickup Arranged</h4>
                <span className="step-method-badge">{methodLabel}</span>
              </div>
              <p className="step-subtitle">
                {isDelivery 
                  ? 'Volunteer delivery partner assigned to pick up food.' 
                  : 'Your NGO will collect the food.'}
              </p>
            </div>
          </div>

          {/* Node 3: Picked Up */}
          <div className="track-step-item">
            <div className="track-node-col">
              <div className={`step-badge-circle ${activeStep >= 3 ? 'completed' : 'pending'}`}>
                {activeStep >= 3 ? (
                  <FiCheck size={14} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <div className="pending-ring-target"></div>
                )}
              </div>
              <div className={`track-stem-line ${activeStep >= 4 ? 'completed' : 'pending'}`}></div>
            </div>
            <div className="track-step-content">
              <h4 className="step-title">Picked Up</h4>
              <p className="step-subtitle">Mark as picked up after collection.</p>
              {activeStep === 2 && (
                <button 
                  type="button" 
                  className="step-action-trigger-btn"
                  onClick={handleNextStep}
                >
                  Confirm Pickup Now
                </button>
              )}
            </div>
          </div>

          {/* Node 4: Delivered */}
          <div className="track-step-item">
            <div className="track-node-col">
              <div className={`step-badge-circle ${activeStep >= 4 ? 'completed' : 'pending'}`}>
                {activeStep >= 4 ? (
                  <FiCheck size={14} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <FiFlag size={13} color="#9E9E9E" />
                )}
              </div>
            </div>
            <div className="track-step-content">
              <h4 className="step-title">Delivered</h4>
              <p className="step-subtitle">Confirm food delivery and complete the donation.</p>
              {activeStep === 3 && (
                <button 
                  type="button" 
                  className="step-action-trigger-btn complete-btn"
                  onClick={handleNextStep}
                >
                  Confirm Delivery
                </button>
              )}
              {activeStep === 4 && (
                <span className="step-completed-badge">🎉 Distribution Completed</span>
              )}
            </div>
          </div>
        </div>

        {/* Donation Summary Card at Bottom */}
        <div className="donation-summary-card">
          <h3 className="summary-card-heading">Donation Summary</h3>

          <div className="summary-item-row">
            <div className="summary-thumb-box">
              <PulaoImage size={56} />
            </div>

            <div className="summary-text-box">
              <h4 className="summary-food-title">Vegetable Pulao & Dal</h4>
              <p className="summary-servings-text">50 servings • Veg</p>
              <p className="summary-loc-text">
                <FiMapPin size={11} color="#616161" />
                <span>AITR Canteen, Indore</span>
              </p>
              <p className="summary-safe-expiry">
                <FiClock size={11} color="#D32F2F" />
                <span>Safe until: <strong>Today, 8:00 PM</strong></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

