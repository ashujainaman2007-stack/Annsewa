import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NotificationCenter, { RealtimeAlertBanner } from './NotificationCenter'
import { 
  FiSmartphone, 
  FiMaximize2, 
  FiRefreshCw
} from 'react-icons/fi'

const SCREENS = [
  { id: 'home', label: '🏠 Home Tab', path: '/home', tag: 'Home Tab' },
  { id: 'map', label: '📍 Map Tab', path: '/map', tag: 'Map Tab' },
  { id: 'donate', label: '➕ Donate Tab', path: '/create-donation', tag: 'Donate Tab' },
  { id: 'activity', label: '📋 My Activity', path: '/activity', tag: 'My Activity Tab' },
  { id: 'profile-donor', label: '👤 Donor Profile', path: '/profile?role=donor', tag: 'Donor Profile' },
  { id: 'profile-ngo', label: '🏢 NGO Profile', path: '/profile?role=ngo', tag: 'NGO Profile' },
  { id: 'profile-vol', label: '👷 Vol Profile', path: '/profile?role=volunteer', tag: 'Volunteer Profile' },
  { id: 'ngo', label: 'NGO: 1️⃣ Available', path: '/ngo-dashboard', tag: 'NGO: Available Donations' },
  { id: 'details', label: 'NGO: 2️⃣ Details', path: '/donation-details/1', tag: 'NGO: Donation Details' },
  { id: 'method', label: 'NGO: 3️⃣ Pickup', path: '/claim-donation/1', tag: 'NGO: Choose Pickup Method' },
  { id: 'track', label: 'NGO: 4️⃣ Track', path: '/track-donation/1', tag: 'NGO: Track Donation' },
  { id: 'vol-browse', label: 'Vol: 1️⃣ Browse', path: '/volunteer-dashboard', tag: 'Vol: Browse Tasks' },
  { id: 'vol-details', label: 'Vol: 2️⃣ Details', path: '/volunteer-task-details/1', tag: 'Vol: Task Details' },
  { id: 'vol-confirm', label: 'Vol: 3️⃣ Confirm', path: '/volunteer-confirm-task/1', tag: 'Vol: Confirm Task' },
  { id: 'vol-active', label: 'Vol: 4️⃣ Execute', path: '/volunteer-active-task/1', tag: 'Vol: My Task' },
  { id: 'vol-done', label: 'Vol: 5️⃣ Completed', path: '/volunteer-task-completed/1', tag: 'Vol: Task Completed' },
  { id: 'impact', label: 'Impact Dashboard', path: '/impact', tag: 'Impact Dashboard' },
  { id: 'roles', label: 'Role Selection', path: '/role-selection', tag: 'Role Selection' },
  { id: 'onboarding', label: 'Onboarding', path: '/onboarding', tag: 'Onboarding' },
  { id: 'splash', label: 'Splash Screen', path: '/', tag: 'Splash Screen' },
]

export default function MobileFrame({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [deviceFrame, setDeviceFrame] = useState(true)

  const currentUrl = location.pathname + location.search
  const currentScreen = SCREENS.find(s => s.path === currentUrl) || SCREENS.find(s => s.path === location.pathname) || { tag: 'App Screen' }

  return (
    <div className={`simulator-stage ${deviceFrame ? 'with-frame' : 'full-bleed'}`}>
      {/* Top Desktop Navigation & Controls Toolbar */}
      <header className="simulator-toolbar">
        <div className="toolbar-left">
          <div className="app-badge">
            <span className="app-dot"></span>
            <strong>Annsewa</strong>
            <span className="app-mode-tag">Mobile App (9:19.5 Ratio)</span>
          </div>
          <div className="current-screen-pill">
            <span className="screen-indicator">Active:</span>
            <strong>{currentScreen.tag}</strong>
          </div>
        </div>

        {/* 5 Core Tabs & All Screens Quick Selector */}
        <div className="screen-picker-scroll">
          <div className="screen-picker">
            {SCREENS.map((screen) => {
              const isActive = location.pathname === screen.path
              return (
                <button
                  key={screen.id}
                  type="button"
                  className={`screen-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(screen.path)}
                  title={`Jump to ${screen.tag}`}
                >
                  {screen.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="toolbar-right">
          <button 
            type="button"
            className="tool-btn"
            onClick={() => setDeviceFrame(!deviceFrame)}
            title={deviceFrame ? "Switch to Full View" : "Switch to Phone Frame"}
          >
            {deviceFrame ? <FiMaximize2 size={15} /> : <FiSmartphone size={15} />}
            <span>{deviceFrame ? "Full Width" : "Phone Shell"}</span>
          </button>
          
          <button 
            type="button"
            className="tool-btn"
            onClick={() => navigate('/')}
            title="Restart from Splash"
          >
            <FiRefreshCw size={14} />
            <span>Restart</span>
          </button>
        </div>
      </header>

      {/* Main Simulator Stage Body */}
      <div className="simulator-body">
        {deviceFrame ? (
          /* Realistic Smartphone Chassis Container */
          <div className="phone-chassis">
            {/* Side Hardware Buttons */}
            <div className="hardware-btn mute-switch"></div>
            <div className="hardware-btn volume-up"></div>
            <div className="hardware-btn volume-down"></div>
            <div className="hardware-btn power-btn"></div>

            {/* Phone Screen Bezel */}
            <div className="phone-screen-wrapper">
              {/* Dynamic Island / Top Camera Notch */}
              <div className="dynamic-island">
                <div className="camera-lens"></div>
                <div className="sensor-pill"></div>
              </div>

              {/* Speaker Slot */}
              <div className="speaker-slot"></div>

              {/* Internal Scrollable App Screen */}
              <div className="phone-screen-content">
                <RealtimeAlertBanner />
                {children}
                <NotificationCenter />
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="home-indicator-bar-wrap">
                <div className="home-indicator-bar"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Frameless mobile view for inspection */
          <div className="frameless-mobile-container" style={{ position: 'relative' }}>
            <RealtimeAlertBanner />
            {children}
            <NotificationCenter />
          </div>
        )}
      </div>
    </div>
  )
}
