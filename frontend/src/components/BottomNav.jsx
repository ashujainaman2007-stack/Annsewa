import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiMap, FiPlus, FiClipboard, FiUser } from 'react-icons/fi'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/home' || location.pathname === '/'
  const isMap = location.pathname === '/map'
  const isDonate = location.pathname === '/create-donation' || location.pathname === '/donate'
  const isActivity = location.pathname === '/activity' || location.pathname === '/donation-tracking'
  const isProfile = location.pathname === '/profile' || location.pathname === '/impact'

  return (
    <nav className="bottom-nav">
      {/* 1. Home Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isHome ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <FiHome size={21} />
        <span>Home</span>
      </button>

      {/* 2. Map Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isMap ? 'active' : ''}`}
        onClick={() => navigate('/map')}
      >
        <FiMap size={21} />
        <span>Map</span>
      </button>

      {/* 3. Donate Tab (Center Elevated Green Circular FAB) */}
      <button
        type="button"
        className={`bottom-nav-fab-wrap ${isDonate ? 'active' : ''}`}
        onClick={() => navigate('/create-donation')}
        title="Donate Food"
        aria-label="Donate Food"
      >
        <div className="fab-inner">
          <FiPlus size={24} color="#FFFFFF" strokeWidth={3} />
        </div>
        <span className="fab-label">Donate</span>
      </button>

      {/* 4. My Activity Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isActivity ? 'active' : ''}`}
        onClick={() => navigate('/activity')}
      >
        <FiClipboard size={21} />
        <span>My Activity</span>
      </button>

      {/* 5. Profile Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isProfile ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <FiUser size={21} />
        <span>Profile</span>
      </button>
    </nav>
  )
}
