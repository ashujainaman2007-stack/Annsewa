import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { useNotifications } from '../context/NotificationContext'
import { ProduceBoxIllustration, PulaoImage, RiceCurryImage, SnacksImage, RotiSabziImage } from '../components/FoodIllustrations'
import { 
  FiBell, 
  FiCalendar, 
  FiMapPin, 
  FiCrosshair, 
  FiCheck, 
  FiCamera, 
  FiUploadCloud, 
  FiPlus, 
  FiMinus, 
  FiX,
  FiClock,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi'
import { createDonation } from '../services/api'
import './CreateDonation.css'

const PRESET_FOODS = ['Vegetable Pulao', 'Roti & Sabzi', 'Dal Khichdi', 'Paneer Rice', 'Bread & Snacks']
const CATEGORIES = ['Cooked Meal', 'Bakery', 'Packaged Food', 'Raw Groceries']
const TIME_SLOTS = [
  'Today, 08:00 PM',
  'Today, 10:00 PM',
  'Tomorrow, 08:00 AM',
  'Next 2 Hours'
]

export default function CreateDonation() {
  const navigate = useNavigate()
  const { broadcastNewFood } = useNotifications()
  const fileInputRef = useRef(null)

  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [broadcastModalData, setBroadcastModalData] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedPresetVisual, setSelectedPresetVisual] = useState('pulao')

  const [formData, setFormData] = useState({
    foodName: 'Vegetable Pulao',
    foodType: 'vegetarian',
    foodCategory: 'Cooked Meal',
    quantity: 50,
    description: 'Fresh and hygienic surplus food from campus canteen.',
    safeUntil: 'Today, 08:00 PM',
    pickupLocation: 'AITR Canteen, Indore',
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleQuantityAdjust = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(5, (parseInt(prev.quantity, 10) || 0) + delta)
    }))
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
        setSelectedPresetVisual(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.foodName.trim()) return

    setSubmitting(true)
    let createdDonationId = Date.now()

    try {
      const res = await createDonation({
        food_name: formData.foodName,
        food_type: formData.foodType,
        food_category: formData.foodCategory,
        quantity: parseInt(formData.quantity, 10) || 50,
        description: formData.description,
        safe_until: formData.safeUntil,
        pickup_location: formData.pickupLocation,
        urgent: false
      })

      if (res && res.donation) {
        createdDonationId = res.donation.id
      }
    } catch (err) {
      console.warn('Backend offline or note, proceeding with broadcast:', err)
    }

    // Broadcast notification to all nearby NGOs in real-time
    await broadcastNewFood({
      id: createdDonationId,
      food_name: formData.foodName,
      food_type: formData.foodType,
      quantity: parseInt(formData.quantity, 10) || 50,
      safe_until: formData.safeUntil,
      pickup_location: formData.pickupLocation
    })

    setSubmitting(false)

    // Show Broadcast Confirmation Modal
    setBroadcastModalData({
      donationId: createdDonationId,
      foodName: formData.foodName,
      servings: formData.quantity,
      location: formData.pickupLocation,
      ngos: [
        { name: 'Seva Foundation', distance: '2.4 km away' },
        { name: 'Food For All Trust', distance: '3.1 km away' },
        { name: 'Robin Hood Army Indore', distance: '1.8 km away' },
        { name: 'Annapurna Seva Sansthan', distance: '2.9 km away' },
        { name: 'Roti Bank Indore', distance: '3.5 km away' }
      ]
    })
  }

  return (
    <div className="donate-tab-page-container">
      {/* 1. TOP HEADER (Fixed Docked at Top) */}
      <div className="donate-top-green-header">
        <StatusBar dark={true} />

        <div className="donate-brand-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>
      </div>

      {/* BROADCAST SUCCESS MODAL OVERLAY */}
      {broadcastModalData && (
        <div className="broadcast-modal-backdrop">
          <div className="broadcast-modal-card">
            <div className="broadcast-header-icon">
              <span className="broadcast-bell-anim">🔔</span>
            </div>

            <h3 className="broadcast-modal-title">Food Listed & Broadcasted!</h3>
            <p className="broadcast-modal-sub">
              <strong>{broadcastModalData.servings} Servings</strong> of <strong>{broadcastModalData.foodName}</strong> are now live. Real-time alert dispatched to <strong>5 Nearby NGOs</strong>!
            </p>

            <div className="notified-ngos-box">
              <div className="notified-ngos-box-title">
                <FiSend size={12} color="#2E7D32" />
                <span>Alert Delivered to Verified NGOs:</span>
              </div>
              <div className="notified-ngos-list">
                {broadcastModalData.ngos.map((ngo) => (
                  <div key={ngo.name} className="notified-ngo-item">
                    <span className="ngo-bullet-check">✓</span>
                    <span className="notified-ngo-name">{ngo.name}</span>
                    <span className="notified-ngo-dist">({ngo.distance})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="broadcast-modal-actions">
              <button 
                type="button" 
                className="btn-view-as-ngo"
                onClick={() => {
                  setBroadcastModalData(null)
                  navigate('/ngo-dashboard')
                }}
              >
                <span>🏢 Switch to NGO & Claim Food</span>
              </button>

              <button 
                type="button" 
                className="btn-view-activity"
                onClick={() => {
                  setBroadcastModalData(null)
                  navigate('/activity')
                }}
              >
                <span>📋 Track My Donations</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION TOAST OVERLAY */}
      {successMessage && (
        <div className="donation-success-toast">
          <FiCheck size={18} color="#FFFFFF" strokeWidth={3} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. SCROLLABLE FORM BODY (ONLY THIS AREA SCROLLS) */}
      <form className="donate-scroll-form-body" onSubmit={handleSubmit}>
        {/* Top Banner Card */}
        <div className="donate-top-banner">
          <div className="donate-banner-text">
            <h2 className="donate-banner-title">Donate Food</h2>
            <p className="donate-banner-subtitle">
              Share surplus food and help someone in need
            </p>
          </div>
          <div className="donate-banner-visual">
            <ProduceBoxIllustration width={84} height={74} />
          </div>
        </div>

        {/* SLOT A: Food Photo Upload Slot */}
        <div className="donate-slot-card photo-upload-slot">
          <div className="slot-header-row">
            <label className="donate-field-label">Food Photo / Image Slot</label>
            <span className="slot-optional-tag">Optional</span>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          {previewImage ? (
            <div className="photo-preview-box">
              <img src={previewImage} alt="Uploaded Food" className="uploaded-photo-img" />
              <button 
                type="button" 
                className="remove-photo-circle-btn" 
                onClick={handleRemovePhoto}
                title="Remove Photo"
              >
                <FiX size={15} color="#FFFFFF" />
              </button>
            </div>
          ) : (
            <div 
              className="upload-dropzone-box" 
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              <div className="camera-icon-circle">
                <FiCamera size={20} color="#2E7D32" />
              </div>
              <div className="dropzone-text-group">
                <strong className="dropzone-main-text">Upload / Take Food Photo</strong>
                <span className="dropzone-sub-text">PNG, JPG up to 10MB or tap to browse</span>
              </div>
            </div>
          )}

          {/* Quick Preset Photo Selector */}
          {!previewImage && (
            <div className="preset-photos-row">
              <span className="preset-label">Or choose sample:</span>
              <div className="preset-pills-list">
                <button
                  type="button"
                  className={`preset-pill ${selectedPresetVisual === 'pulao' ? 'active' : ''}`}
                  onClick={() => { setSelectedPresetVisual('pulao'); handleChange('foodName', 'Vegetable Pulao'); }}
                >
                  🍲 Pulao
                </button>
                <button
                  type="button"
                  className={`preset-pill ${selectedPresetVisual === 'roti' ? 'active' : ''}`}
                  onClick={() => { setSelectedPresetVisual('roti'); handleChange('foodName', 'Roti & Sabzi'); }}
                >
                  🥘 Roti Sabzi
                </button>
                <button
                  type="button"
                  className={`preset-pill ${selectedPresetVisual === 'snacks' ? 'active' : ''}`}
                  onClick={() => { setSelectedPresetVisual('snacks'); handleChange('foodName', 'Bread & Snacks'); }}
                >
                  🍞 Snacks
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SLOT B: Food Information Slots */}
        <div className="donate-slot-card">
          {/* 1. Food Name Slot */}
          <div className="donate-form-group">
            <label className="donate-field-label">Food Name *</label>
            <input
              type="text"
              className="donate-input-field"
              value={formData.foodName}
              onChange={(e) => handleChange('foodName', e.target.value)}
              placeholder="e.g. Vegetable Pulao"
              required
            />
            {/* Quick Suggestions Chips */}
            <div className="food-suggestions-chips">
              {PRESET_FOODS.slice(0, 3).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="quick-suggestion-chip"
                  onClick={() => handleChange('foodName', preset)}
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Food Type (Vegetarian / Non-Vegetarian) */}
          <div className="donate-form-group">
            <label className="donate-field-label">Food Type *</label>
            <div className="food-type-radio-pair">
              <button
                type="button"
                className={`type-option-pill ${formData.foodType === 'vegetarian' ? 'selected-veg' : ''}`}
                onClick={() => handleChange('foodType', 'vegetarian')}
              >
                <div className="veg-select-dot">
                  {formData.foodType === 'vegetarian' && <FiCheck size={11} color="#FFFFFF" strokeWidth={3} />}
                </div>
                <span>Vegetarian</span>
              </button>

              <button
                type="button"
                className={`type-option-pill ${formData.foodType === 'non-vegetarian' ? 'selected-nonveg' : ''}`}
                onClick={() => handleChange('foodType', 'non-vegetarian')}
              >
                <div className="nonveg-select-dot">
                  {formData.foodType === 'non-vegetarian' && <FiCheck size={11} color="#FFFFFF" strokeWidth={3} />}
                </div>
                <span>Non-Vegetarian</span>
              </button>
            </div>
          </div>

          {/* 3. Category Selector */}
          <div className="donate-form-group">
            <label className="donate-field-label">Food Category</label>
            <div className="category-chips-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${formData.foodCategory === cat ? 'active' : ''}`}
                  onClick={() => handleChange('foodCategory', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Quantity (Servings) with Stepper Buttons */}
          <div className="donate-form-group">
            <label className="donate-field-label">Quantity (Servings) *</label>
            <div className="stepper-input-wrapper">
              <button 
                type="button" 
                className="stepper-btn minus" 
                onClick={() => handleQuantityAdjust(-10)}
                title="Decrease 10"
              >
                <FiMinus size={14} />
              </button>
              <input
                type="number"
                className="donate-stepper-field"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', parseInt(e.target.value, 10) || 0)}
                required
                min="1"
              />
              <button 
                type="button" 
                className="stepper-btn plus" 
                onClick={() => handleQuantityAdjust(10)}
                title="Increase 10"
              >
                <FiPlus size={14} />
              </button>

              {/* Quick Increment Pills */}
              <button type="button" className="qty-quick-add" onClick={() => handleQuantityAdjust(25)}>+25</button>
              <button type="button" className="qty-quick-add" onClick={() => handleQuantityAdjust(50)}>+50</button>
            </div>
          </div>

          {/* 5. Description Slot */}
          <div className="donate-form-group">
            <label className="donate-field-label">Description</label>
            <textarea
              className="donate-textarea-field"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Fresh and hygienic food from canteen / campus event."
              rows={2}
            />
          </div>
        </div>

        {/* SLOT C: Safe Until & Pickup Location Slots */}
        <div className="donate-slot-card">
          {/* Safe Until Slot */}
          <div className="donate-form-group">
            <div className="slot-header-row">
              <label className="donate-field-label">Safe Until (Time Slot) *</label>
              <span className="slot-hint">Expiry window</span>
            </div>

            <div className="donate-icon-input-wrap">
              <FiCalendar className="field-prefix-icon" size={16} color="#616161" />
              <input
                type="text"
                className="donate-input-field with-prefix"
                value={formData.safeUntil}
                onChange={(e) => handleChange('safeUntil', e.target.value)}
                placeholder="Today, 08:00 PM"
                required
              />
            </div>

            {/* Quick Time Slot Selector Pills */}
            <div className="time-slot-pills-row">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot-pill ${formData.safeUntil === slot ? 'active' : ''}`}
                  onClick={() => handleChange('safeUntil', slot)}
                >
                  <FiClock size={11} />
                  <span>{slot}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Location Slot */}
          <div className="donate-form-group">
            <label className="donate-field-label">Pickup Location *</label>
            <div className="donate-icon-input-wrap">
              <FiMapPin className="field-prefix-icon" size={16} color="#2E7D32" />
              <input
                type="text"
                className="donate-input-field with-prefix with-suffix"
                value={formData.pickupLocation}
                onChange={(e) => handleChange('pickupLocation', e.target.value)}
                placeholder="AITR Canteen, Indore"
                required
              />
              <button 
                type="button" 
                className="gps-locate-icon-btn"
                title="Detect Campus Location"
                onClick={() => handleChange('pickupLocation', 'AITR Main Canteen, Indore (Current)')}
              >
                <FiCrosshair size={17} color="#2E7D32" />
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="list-donation-action-btn"
          disabled={submitting}
        >
          {submitting ? (
            <span>Uploading Donation...</span>
          ) : (
            <>
              <FiUploadCloud size={19} color="#FFFFFF" />
              <span>List Food Donation</span>
            </>
          )}
        </button>
      </form>

      {/* 3. PERSISTENT FIXED BOTTOM NAV (NEVER MOVES ON SCROLL) */}
      <BottomNav />
    </div>
  )
}
