import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { ProduceBoxIllustration } from '../components/FoodIllustrations'
import './Onboarding.css'

const slides = [
  {
    title: 'Rescue Surplus Food,\nFeed People in Need',
    description: 'Connect donors, NGOs and volunteers for quick and safe food redistribution.',
  },
  {
    title: 'Smart Matching\nwith Verified NGOs',
    description: 'Instantly notify nearby hunger relief organizations when safe surplus food is available.',
  },
  {
    title: 'Real-Time Pickup &\nDelivery Tracking',
    description: 'Track dedicated volunteers from kitchen pickup to doorstep delivery safely.',
  }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      navigate('/role-selection')
    }
  }

  const handleSkip = () => {
    navigate('/role-selection')
  }

  return (
    <div className="onboarding-page">
      <StatusBar dark={false} />

      {/* Top Header with Skip Button */}
      <div className="onboarding-top-bar">
        <button type="button" className="onboarding-skip-btn" onClick={handleSkip}>
          Skip
        </button>
      </div>

      {/* Centered Food Donation Box Graphic */}
      <div className="onboarding-illustration-section">
        <div className="onboarding-box-wrapper">
          <ProduceBoxIllustration width={210} height={180} />
        </div>
      </div>

      {/* Typography Section */}
      <div className="onboarding-body">
        <h1 className="onboarding-title">
          {slides[current].title}
        </h1>
        <p className="onboarding-desc">
          {slides[current].description}
        </p>

        {/* 3 Pagination Dots */}
        <div className="onboarding-dots-row">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-pill ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button type="button" className="onboarding-action-btn" onClick={handleNext}>
          <span>{current === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}
