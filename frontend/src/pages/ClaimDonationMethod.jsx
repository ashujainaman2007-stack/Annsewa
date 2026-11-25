import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { ProduceBoxIllustration } from '../components/FoodIllustrations'
import { useNotifications } from '../context/NotificationContext'
import { claimDonation } from '../services/api'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import './ClaimDonationMethod.css'

export default function ClaimDonationMethod() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { markDonationClaimed } = useNotifications()

  const foodName = searchParams.get('food') || 'Vegetable Pulao & Dal'
  const [pickupMethod, setPickupMethod] = useState('self') // 'self' or 'delivery'

  const handleProceed = async () => {
    const targetId = id || 1
    try {
      await claimDonation(targetId, 'Seva Foundation')
    } catch (e) {
      console.warn('Backend claim sync note:', e)
    }
    markDonationClaimed(targetId, 'Seva Foundation')
    navigate(`/track-donation/${targetId}?method=${pickupMethod}`)
  }

  return (
    <div className="claim-method-page-container">
      {/* 1. TOP HEADER WITH BACK BUTTON */}
      <div className="claim-method-header-bar">
        <StatusBar dark={false} />
        <div className="claim-method-header-row">
          <button 
            type="button" 
            className="claim-back-btn" 
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="claim-header-title">Claim Donation</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="claim-method-scroll-body">
        {/* Top Success Banner */}
        <div className="claim-success-celebration-card">
          <div className="celebration-visual-wrap">
            <div className="success-check-badge-top">
              <FiCheck size={18} color="#FFFFFF" strokeWidth={3} />
            </div>
            <ProduceBoxIllustration width={100} height={85} />
          </div>

          <h2 className="celebration-title">Donation Claimed!</h2>
          <p className="celebration-subtitle">
            You have successfully claimed <br />
            <strong>{foodName}</strong>.
          </p>
        </div>

        {/* Choose Pickup Method Section */}
        <div className="pickup-methods-section">
          <h3 className="pickup-methods-heading">Choose Pickup Method</h3>

          {/* Option 1: NGO Self-Pickup */}
          <div 
            className={`pickup-method-card ${pickupMethod === 'self' ? 'selected' : ''}`}
            onClick={() => setPickupMethod('self')}
            role="button"
            tabIndex={0}
          >
            <div className="method-left-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>

            <div className="method-content-col">
              <div className="method-title-badge-row">
                <h4 className="method-title">NGO Self-Pickup</h4>
                <span className="method-free-badge">Free</span>
              </div>
              <p className="method-desc">
                We will arrange our own volunteer or vehicle to collect the food.
              </p>
            </div>

            <div className="method-radio-col">
              <div className={`custom-radio-circle ${pickupMethod === 'self' ? 'checked' : ''}`}>
                {pickupMethod === 'self' && <div className="radio-inner-dot"></div>}
              </div>
            </div>
          </div>

          {/* Option 2: Annsewa Delivery */}
          <div 
            className={`pickup-method-card ${pickupMethod === 'delivery' ? 'selected' : ''}`}
            onClick={() => setPickupMethod('delivery')}
            role="button"
            tabIndex={0}
          >
            <div className="method-left-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="19" r="3"></circle>
                <circle cx="17" cy="19" r="3"></circle>
                <path d="M9 19h5"></path>
                <path d="M12 12h4l2 4"></path>
                <path d="M16 8h-3l-2-4H7"></path>
              </svg>
            </div>

            <div className="method-content-col">
              <div className="method-title-badge-row">
                <h4 className="method-title">Annsewa Delivery</h4>
                <span className="method-paid-badge">Paid</span>
              </div>
              <p className="method-desc">
                Assign a nearby delivery partner to pick up and deliver the food.
              </p>
            </div>

            <div className="method-radio-col">
              <div className={`custom-radio-circle ${pickupMethod === 'delivery' ? 'checked' : ''}`}>
                {pickupMethod === 'delivery' && <div className="radio-inner-dot"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON */}
      <div className="claim-method-bottom-bar">
        <button 
          type="button" 
          className="proceed-claim-action-btn"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  )
}

