import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import AnnsewaLogo from '../components/AnnsewaLogo'
import './SplashScreen.css'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 3200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-page">
      <StatusBar dark />

      {/* Main Center Logo & Brand Content */}
      <div className="splash-center">
        <div className="splash-logo-box">
          <AnnsewaLogo 
            size={78} 
            variant="white" 
            direction="column" 
            showText={true} 
            showTagline={true} 
          />
        </div>

        {/* Loading Progress Bar */}
        <div className="splash-loading-bar-wrap">
          <div className="splash-loading-bar-fill"></div>
        </div>
      </div>

      {/* Beautiful Layered Fluid Wave Curves at Bottom matching the UI design */}
      <div className="splash-waves-container">
        <svg 
          viewBox="0 0 390 240" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back Wave: Lime Green */}
          <path 
            d="M0 80 Q100 130 200 70 T390 110 L390 240 L0 240 Z" 
            fill="#81C784" 
            opacity="0.45" 
          />
          {/* Mid Wave: Vibrant Leaf Green */}
          <path 
            d="M0 120 Q110 50 240 130 T390 90 L390 240 L0 240 Z" 
            fill="#43A047" 
            opacity="0.65" 
          />
          {/* Front Wave: Emerald Accent */}
          <path 
            d="M0 150 Q130 110 260 170 T390 130 L390 240 L0 240 Z" 
            fill="#2E7D32" 
          />
        </svg>
      </div>
    </div>
  )
}
