import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { PulaoDalHeroImage } from '../components/FoodIllustrations'
import { 
  FiArrowLeft, 
  FiCheck, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiCalendar, 
  FiFileText,
  FiMap
} from 'react-icons/fi'
import { getDonation } from '../services/api'
import './DonationDetails.css'

export default function DonationDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [donation, setDonation] = useState({
    id: id || 1,
    food_name: 'Vegetable Pulao & Dal',
    food_type: 'Vegetarian',
    quantity: 50,
    servings_desc: '50 servings (≈ 20–25 people)',
    donor_name: 'AITR Canteen',
    pickup_location: 'AITR Canteen, Indore',
    prepared_at: 'Today, 12:30 PM',
    safe_until: 'Today, 8:00 PM (≈ 7 hrs left)',
    instructions: 'Food is packed in containers. Please bring carrying boxes.'
  })

  useEffect(() => {
    if (id) {
      getDonation(id)
        .then((res) => {
          if (res && res.donation) {
            setDonation(prev => ({
              ...prev,
              ...res.donation,
              servings_desc: `${res.donation.quantity} servings (≈ ${Math.round(res.donation.quantity / 2)} people)`,
              donor_name: res.donation.donor_name || prev.donor_name,
              pickup_location: res.donation.pickup_location || prev.pickup_location,
              safe_until: `${res.donation.safe_until || 'Today, 8:00 PM'} (≈ 7 hrs left)`
            }))
          }
        })
        .catch(err => console.warn('Using default donation details:', err))
    }
  }, [id])

  const handleConfirmClaim = () => {
    navigate(`/claim-donation/${donation.id}`)
  }

  return (
    <div className="donation-details-container">
      {/* 1. TOP HEADER WITH BACK BUTTON */}
      <div className="details-header-bar">
        <StatusBar dark={false} />
        <div className="details-header-row">
          <button 
            type="button" 
            className="details-back-btn" 
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="details-header-title">Donation Details</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <div className="details-scroll-body">
        {/* Hero Food Photography / Graphic Card */}
        <div className="details-hero-card">
          <PulaoDalHeroImage width="100%" height={190} />
        </div>

        {/* Food Title & Veg Badge */}
        <div className="details-title-section">
          <h2 className="details-food-name">{donation.food_name}</h2>
          <span className="details-veg-badge">
            <span className="veg-badge-check"><FiCheck size={11} strokeWidth={3} /></span>
            <span>{donation.food_type}</span>
          </span>
        </div>

        {/* Detailed Information Grid */}
        <div className="details-meta-card">
          {/* Quantity */}
          <div className="meta-info-row">
            <div className="meta-label-col">
              <span className="meta-icon">🍽️</span>
              <span className="meta-key">Quantity</span>
            </div>
            <div className="meta-value-col">
              <strong className="meta-strong-val">{donation.servings_desc}</strong>
            </div>
          </div>

          {/* Donor */}
          <div className="meta-info-row">
            <div className="meta-label-col">
              <span className="meta-icon">👤</span>
              <span className="meta-key">Donor</span>
            </div>
            <div className="meta-value-col">
              <span className="meta-donor-val">{donation.donor_name}</span>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="meta-info-row location-row">
            <div className="meta-label-col">
              <span className="meta-icon">📍</span>
              <span className="meta-key">Pickup Location</span>
            </div>
            <div className="meta-value-col location-col">
              <span className="meta-location-val">{donation.pickup_location}</span>
              <button 
                type="button" 
                className="view-map-link-btn"
                onClick={() => navigate('/map')}
              >
                <FiMap size={12} />
                <span>View on Map</span>
              </button>
            </div>
          </div>

          {/* Prepared At */}
          <div className="meta-info-row">
            <div className="meta-label-col">
              <span className="meta-icon">📅</span>
              <span className="meta-key">Prepared At</span>
            </div>
            <div className="meta-value-col">
              <span className="meta-text-val">{donation.prepared_at}</span>
            </div>
          </div>

          {/* Safe Until (Highlighted Urgency) */}
          <div className="meta-info-row">
            <div className="meta-label-col">
              <span className="meta-icon">🕒</span>
              <span className="meta-key">Safe Until</span>
            </div>
            <div className="meta-value-col">
              <span className="meta-safe-until-val">{donation.safe_until}</span>
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="meta-info-row instructions-row">
            <div className="meta-label-col align-top">
              <span className="meta-icon">📝</span>
              <span className="meta-key">Pickup Instructions</span>
            </div>
            <div className="meta-value-col">
              <p className="meta-instruction-text">{donation.instructions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON */}
      <div className="details-bottom-bar">
        <button 
          type="button" 
          className="confirm-claim-action-btn"
          onClick={handleConfirmClaim}
        >
          Confirm Claim
        </button>
      </div>
    </div>
  )
}

