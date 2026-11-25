import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'
import { 
  FiBell, 
  FiX, 
  FiCheck, 
  FiClock, 
  FiMapPin, 
  FiExternalLink, 
  FiCheckCircle, 
  FiUsers,
  FiSend
} from 'react-icons/fi'
import './NotificationCenter.css'

export default function NotificationCenter() {
  const navigate = useNavigate()
  const { 
    notifications, 
    unreadCount, 
    isOpen, 
    closeNotifications, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications()

  const [filterTab, setFilterTab] = useState('all') // 'all', 'available', 'claimed'

  if (!isOpen) return null

  const filtered = notifications.filter(n => {
    if (filterTab === 'available') return n.status === 'Available' && n.type === 'food_available'
    if (filterTab === 'claimed') return n.status === 'Claimed' || n.type === 'donation_claimed'
    return true
  })

  const handleClaimClick = (notif) => {
    markAsRead(notif.id)
    closeNotifications()
    const targetId = notif.donation_id || 1
    navigate(`/donation-details/${targetId}`)
  }

  const handleTrackClick = (notif) => {
    markAsRead(notif.id)
    closeNotifications()
    const targetId = notif.donation_id || 1
    navigate(`/track-donation/${targetId}`)
  }

  return (
    <div className="notif-modal-backdrop" onClick={closeNotifications}>
      <div className="notif-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="notif-sheet-header">
          <div className="notif-title-group">
            <div className="notif-icon-circle">
              <FiBell size={18} color="#2E7D32" />
            </div>
            <div>
              <h3 className="notif-sheet-title">Notifications</h3>
              <p className="notif-sheet-subtitle">
                {unreadCount > 0 ? `${unreadCount} unread food alert${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="notif-header-actions">
            {unreadCount > 0 && (
              <button 
                type="button" 
                className="notif-mark-all-btn"
                onClick={markAllAsRead}
              >
                Mark all read
              </button>
            )}
            <button 
              type="button" 
              className="notif-close-btn"
              onClick={closeNotifications}
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="notif-filter-tabs">
          <button 
            type="button" 
            className={`notif-tab-pill ${filterTab === 'all' ? 'active' : ''}`}
            onClick={() => setFilterTab('all')}
          >
            All Alerts ({notifications.length})
          </button>
          <button 
            type="button" 
            className={`notif-tab-pill ${filterTab === 'available' ? 'active' : ''}`}
            onClick={() => setFilterTab('available')}
          >
            🍲 Food for NGOs
          </button>
          <button 
            type="button" 
            className={`notif-tab-pill ${filterTab === 'claimed' ? 'active' : ''}`}
            onClick={() => setFilterTab('claimed')}
          >
            ✅ Claimed
          </button>
        </div>

        {/* Scrollable Notifications Feed */}
        <div className="notif-feed-scroll">
          {filtered.length === 0 ? (
            <div className="notif-empty-state">
              <span className="notif-empty-icon">🔔</span>
              <p className="notif-empty-text">No notifications in this tab</p>
            </div>
          ) : (
            filtered.map((notif) => {
              const isFoodAlert = notif.type === 'food_available'
              const isAvailable = notif.status === 'Available'

              return (
                <div 
                  key={notif.id} 
                  className={`notif-card ${!notif.is_read ? 'unread' : ''} ${isAvailable ? 'available-food' : ''}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notif-card-header">
                    <span className="notif-target-badge">
                      <FiUsers size={11} />
                      <span>{notif.recipient_name || 'Nearby NGOs'}</span>
                    </span>
                    <span className="notif-time-text">{notif.time_ago || 'Just now'}</span>
                  </div>

                  <div className="notif-card-body">
                    <div className="notif-badge-icon">
                      {isFoodAlert ? '🍲' : '🎉'}
                    </div>

                    <div className="notif-card-content">
                      <h4 className="notif-card-title">{notif.title}</h4>
                      <p className="notif-card-message">{notif.message}</p>

                      {/* Food Metadata Chips */}
                      {notif.food_name && (
                        <div className="notif-meta-chips">
                          {notif.safe_until && (
                            <span className="notif-chip time-chip">
                              <FiClock size={11} />
                              <span>{notif.safe_until}</span>
                            </span>
                          )}
                          {notif.pickup_location && (
                            <span className="notif-chip location-chip">
                              <FiMapPin size={11} />
                              <span>{notif.pickup_location}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar for the Notification */}
                  <div className="notif-card-actions">
                    {isAvailable ? (
                      <div className="notif-available-claim-row">
                        <span className="live-food-status-badge">
                          <span className="pulse-green-dot"></span>
                          <span>Ready to Claim</span>
                        </span>
                        <button 
                          type="button" 
                          className="claim-from-notif-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClaimClick(notif)
                          }}
                        >
                          <span>Claim Food Now</span>
                          <FiExternalLink size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="notif-claimed-row">
                        <span className="claimed-status-badge">
                          <FiCheckCircle size={13} color="#2E7D32" />
                          <span>{notif.status === 'Claimed' ? 'Claimed' : 'Completed'}</span>
                        </span>
                        <button 
                          type="button" 
                          className="view-tracking-link-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTrackClick(notif)
                          }}
                        >
                          View Status →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Push Alert Banner that floats at the top of the mobile chassis
 */
export function RealtimeAlertBanner() {
  const navigate = useNavigate()
  const { activeAlert, dismissAlert, markAsRead, closeNotifications } = useNotifications()

  if (!activeAlert) return null

  const handleBannerAction = () => {
    dismissAlert()
    if (activeAlert.donation_id) {
      navigate(`/donation-details/${activeAlert.donation_id}`)
    } else {
      navigate('/ngo-dashboard')
    }
  }

  return (
    <div className="realtime-push-banner" onClick={handleBannerAction}>
      <div className="push-banner-left">
        <div className="push-banner-icon">🍲</div>
        <div className="push-banner-text">
          <strong className="push-banner-title">{activeAlert.title}</strong>
          <p className="push-banner-desc">{activeAlert.message}</p>
        </div>
      </div>

      <div className="push-banner-actions">
        <button 
          type="button" 
          className="push-banner-cta-btn"
          onClick={(e) => {
            e.stopPropagation()
            handleBannerAction()
          }}
        >
          {activeAlert.actionText || 'Claim'}
        </button>
        <button 
          type="button" 
          className="push-banner-dismiss-btn"
          onClick={(e) => {
            e.stopPropagation()
            dismissAlert()
          }}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

