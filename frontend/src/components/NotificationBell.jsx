import React from 'react'
import { FiBell } from 'react-icons/fi'
import { useNotifications } from '../context/NotificationContext'

export default function NotificationBell({ color = '#FFFFFF', size = 20, className = '' }) {
  const { openNotifications, unreadCount } = useNotifications()

  return (
    <button 
      type="button" 
      className={`icon-badge-btn ${className}`} 
      aria-label="Notifications"
      onClick={openNotifications}
      title="View Notifications & Food Alerts for NGOs"
    >
      <FiBell size={size} color={color} />
      {unreadCount > 0 && (
        <span className="bell-red-dot">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

