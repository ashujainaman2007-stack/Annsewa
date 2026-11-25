import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { PulaoImage } from '../components/FoodIllustrations'
import { 
  FiArrowLeft, 
  FiCheck, 
  FiClock, 
  FiMapPin, 
  FiNavigation,
  FiBox,
  FiTruck
} from 'react-icons/fi'
import './VolunteerActiveTask.css'

export default function VolunteerActiveTask() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Stepper state: 'claimed', 'picked_up', 'delivered'
  const [taskStatus, setTaskStatus] = useState('claimed')

  const handleActionClick = () => {
    if (taskStatus === 'claimed') {
      setTaskStatus('picked_up')
    } else if (taskStatus === 'picked_up') {
      navigate(`/volunteer-task-completed/${id || 1}`)
    }
  }

  return (
    <div className="active-task-page-container">
      {/* 1. TOP HEADER BAR */}
      <div className="active-task-header-bar">
        <StatusBar dark={false} />
        <div className="active-task-header-row">
          <button 
            type="button" 
            className="active-back-btn" 
            onClick={() => navigate('/volunteer-dashboard')}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
          <h1 className="active-task-header-title">My Task</h1>
          <div style={{ width: 32 }}></div>
        </div>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="active-task-scroll-body">
        {/* Horizontal 4-Node Stepper */}
        <div className="horizontal-stepper-wrap">
          {/* Step 1: Claimed */}
          <div className="h-step-item completed">
            <div className="h-node-circle completed">
              <FiCheck size={13} color="#FFFFFF" strokeWidth={3} />
            </div>
            <span className="h-node-label">Claimed</span>
          </div>

          <div className={`h-track-connector ${taskStatus !== 'claimed' ? 'completed' : 'active'}`}></div>

          {/* Step 2: Pickup */}
          <div className={`h-step-item ${taskStatus !== 'claimed' ? 'completed' : 'current'}`}>
            <div className={`h-node-circle ${taskStatus !== 'claimed' ? 'completed' : 'current'}`}>
              <FiTruck size={13} color={taskStatus !== 'claimed' ? '#FFFFFF' : '#2E7D32'} />
            </div>
            <span className="h-node-label">Pickup</span>
          </div>

          <div className="h-track-connector"></div>

          {/* Step 3: Deliver */}
          <div className="h-step-item">
            <div className="h-node-circle pending">
              <FiTruck size={13} color="#9E9E9E" />
            </div>
            <span className="h-node-label">Deliver</span>
          </div>

          <div className="h-track-connector"></div>

          {/* Step 4: Complete */}
          <div className="h-step-item">
            <div className="h-node-circle pending">
              <FiBox size={13} color="#9E9E9E" />
            </div>
            <span className="h-node-label">Complete</span>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className="task-status-callout-card">
          <div className="callout-circle-icon">
            <FiCheck size={16} color="#FFFFFF" strokeWidth={3} />
          </div>
          <div className="callout-text-group">
            <h4 className="callout-main-title">
              {taskStatus === 'claimed' ? 'Task Claimed' : 'Food Picked Up!'}
            </h4>
            <p className="callout-sub-desc">
              {taskStatus === 'claimed'
                ? 'Go to the pickup location at the scheduled time.'
                : 'Now proceed to Seva Foundation (NGO) for delivery.'}
            </p>
          </div>
        </div>

        {/* Task Details Card with Navigation Shortcuts */}
        <div className="task-execution-card">
          {/* Food Header Row */}
          <div className="execution-food-header">
            <div className="execution-thumb">
              <PulaoImage size={56} />
            </div>
            <div className="execution-food-info">
              <h4 className="execution-food-title">Vegetable Pulao</h4>
              <p className="execution-servings-text">50 servings</p>
            </div>
          </div>

          <div className="execution-divider"></div>

          {/* Location 1: Pickup From */}
          <div className="execution-location-unit">
            <div className="loc-text-col">
              <span className="loc-type-label">
                <FiMapPin size={12} color="#2E7D32" /> Pickup From
              </span>
              <strong className="loc-name-text">AITR Canteen, Indore</strong>
            </div>

            <button 
              type="button" 
              className="navigate-pill-btn"
              onClick={() => navigate('/map')}
            >
              <FiNavigation size={12} color="#2E7D32" />
              <span>Navigate</span>
            </button>
          </div>

          {/* Location 2: Deliver To */}
          <div className="execution-location-unit">
            <div className="loc-text-col">
              <span className="loc-type-label">
                <FiMapPin size={12} color="#1976D2" /> Deliver To
              </span>
              <strong className="loc-name-text">Seva Foundation (NGO)</strong>
            </div>

            <button 
              type="button" 
              className="navigate-pill-btn"
              onClick={() => navigate('/map')}
            >
              <FiNavigation size={12} color="#2E7D32" />
              <span>Navigate</span>
            </button>
          </div>

          <div className="execution-divider"></div>

          {/* Time & Safe Until */}
          <div className="execution-time-grid">
            <div className="time-spec-unit">
              <span className="time-spec-label">
                <FiClock size={12} color="#616161" /> Pickup Time:
              </span>
              <strong className="time-spec-val">12:30 PM</strong>
            </div>

            <div className="time-spec-unit">
              <span className="time-spec-label">
                <FiClock size={12} color="#D32F2F" /> Safe Until:
              </span>
              <strong className="time-spec-val urgency">3:00 PM</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON (Mark as Picked Up / Mark as Delivered) */}
      <div className="active-task-bottom-bar">
        <button 
          type="button" 
          className="execution-step-action-btn"
          onClick={handleActionClick}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
            <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
            <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
            <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
            <rect x="7" y="7" width="10" height="10" rx="1"></rect>
          </svg>
          <span>
            {taskStatus === 'claimed' ? 'Mark as Picked Up' : 'Mark as Delivered'}
          </span>
        </button>
      </div>
    </div>
  )
}

