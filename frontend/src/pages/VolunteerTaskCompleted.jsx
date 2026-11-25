import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { PulaoImage } from '../components/FoodIllustrations'
import { FiCheck, FiMapPin, FiClock } from 'react-icons/fi'
import './VolunteerTaskCompleted.css'

export default function VolunteerTaskCompleted() {
  const navigate = useNavigate()

  return (
    <div className="task-completed-page-container">
      {/* 1. TOP HEADER BAR */}
      <div className="completed-header-bar">
        <StatusBar dark={false} />
        <div className="completed-header-row">
          <div style={{ width: 32 }}></div>
          <h1 className="completed-header-title">Task Completed</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="completed-scroll-body">
        {/* Celebration Visual & Burst */}
        <div className="celebration-hero-section">
          <div className="green-burst-circle-wrap">
            {/* Sparkle rays */}
            <div className="sparkle-ray r1"></div>
            <div className="sparkle-ray r2"></div>
            <div className="sparkle-ray r3"></div>
            <div className="sparkle-ray r4"></div>

            <div className="completed-big-check-circle">
              <FiCheck size={36} color="#FFFFFF" strokeWidth={3.5} />
            </div>
          </div>

          <h2 className="delivered-headline-title">Donation Delivered!</h2>
          <p className="delivered-thanks-para">
            You have successfully completed the task. Thank you for your contribution! 🙏
          </p>
        </div>

        {/* Task Summary Card */}
        <div className="completed-summary-card">
          <h3 className="summary-heading-text">Task Summary</h3>

          <div className="summary-food-row">
            <div className="summary-thumb-round">
              <PulaoImage size={56} />
            </div>
            <div className="summary-food-meta">
              <h4 className="summary-food-name">Vegetable Pulao</h4>
              <p className="summary-food-servings">50 servings</p>
            </div>
          </div>

          <div className="summary-route-unit">
            <FiMapPin size={13} color="#2E7D32" className="summary-pin-icon" />
            <span className="summary-route-text">
              AITR Canteen, Indore → Seva Foundation (NGO)
            </span>
          </div>

          <div className="summary-time-unit">
            <FiClock size={13} color="#616161" />
            <span>Completed at 02:45 PM</span>
          </div>

          {/* Impact Earned Box */}
          <div className="impact-points-earned-box">
            <span className="golden-star-icon">⭐</span>
            <div className="impact-points-text-group">
              <span className="impact-points-label">Impact Earned</span>
              <strong className="impact-points-val">+50 Points</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON */}
      <div className="completed-bottom-bar">
        <button 
          type="button" 
          className="back-to-home-action-btn"
          onClick={() => navigate('/volunteer-dashboard')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

