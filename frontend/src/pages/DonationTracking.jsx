import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { DeliveryTruckIllustration } from '../components/FoodIllustrations'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { getTracking } from '../services/api'
import './DonationTracking.css'

const defaultSteps = [
  {
    id: 1,
    title: 'Donation Listed',
    subtitle: null,
    time: 'Today, 10:30 AM',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Claimed by NGO',
    subtitle: 'Seva Foundation',
    time: 'Today, 11:00 AM',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Volunteer Assigned',
    subtitle: 'Aman Jain',
    time: 'Today, 11:15 AM',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Picked Up',
    subtitle: null,
    time: 'Today, 12:05 PM',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Delivered',
    subtitle: null,
    time: 'Pending',
    status: 'pending',
  },
]

export default function DonationTracking() {
  const navigate = useNavigate()
  const [trackingSteps, setTrackingSteps] = useState(defaultSteps)

  useEffect(() => {
    getTracking(1)
      .then((res) => {
        if (res && res.steps && res.steps.length > 0) {
          setTrackingSteps(res.steps)
        }
      })
      .catch((err) => {
        console.warn('Using default tracking steps:', err)
      })
  }, [])

  return (
    <div className="tracking-page-container">
      <StatusBar dark={false} />

      {/* Top Header */}
      <div className="tracking-top-bar">
        <button 
          type="button" 
          className="tracking-back-btn" 
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <FiArrowLeft size={22} color="#1A1A1A" />
        </button>
        <h1 className="tracking-page-title">Donation Tracking</h1>
      </div>

      <div className="tracking-scroll-body">
        {/* Stepper Timeline */}
        <div className="vertical-timeline-tree">
          {trackingSteps.map((step, index) => {
            const isCompleted = step.status === 'completed'
            const isLast = index === trackingSteps.length - 1

            return (
              <div key={step.id} className="timeline-node-row">
                {/* Node Indicator & Connecting Line */}
                <div className="node-indicator-col">
                  <div className={`step-circle ${isCompleted ? 'step-completed' : 'step-pending'}`}>
                    {isCompleted ? (
                      <FiCheck size={14} color="#FFFFFF" strokeWidth={3} />
                    ) : (
                      <div className="pending-inner-dot"></div>
                    )}
                  </div>
                  {!isLast && (
                    <div className={`vertical-connector-line ${isCompleted ? 'line-completed' : 'line-pending'}`}></div>
                  )}
                </div>

                {/* Step Text Details */}
                <div className="step-text-details">
                  <h4 className={`step-title ${isCompleted ? 'title-done' : 'title-pending'}`}>
                    {step.title}
                  </h4>
                  {step.subtitle && (
                    <p className="step-subtitle-name">
                      {step.subtitle}
                    </p>
                  )}
                  <span className="step-timestamp">
                    {step.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Eco Delivery Truck Illustration on Green Hills */}
        <div className="tracking-bottom-illustration">
          <DeliveryTruckIllustration width={220} height={95} />
        </div>
      </div>
    </div>
  )
}
