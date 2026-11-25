import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { 
  FiArrowLeft,
  FiSettings, 
  FiEdit2, 
  FiCheck,
  FiChevronRight,
  FiClipboard,
  FiClock,
  FiTrendingUp,
  FiTruck,
  FiShield,
  FiAward,
  FiHelpCircle,
  FiLogOut,
  FiX
} from 'react-icons/fi'
import './ProfileScreen.css'

const ROLES_DATA = {
  donor: {
    id: 'donor',
    name: 'Aman Jain',
    roleTag: 'Donor',
    roleBadge: '📦 Donor',
    location: 'Indore, MP',
    verified: false,
    stats: [
      { id: 1, icon: '📦', value: '18', label: 'Donations' },
      { id: 2, icon: '👥', value: '1,240', label: 'Meals Shared' },
      { id: 3, icon: '🌱', value: '320 kg', label: 'Food Saved' }
    ],
    menu: [
      {
        id: 'donations',
        icon: FiClipboard,
        title: 'My Donations',
        subtitle: 'Create and manage donations',
        path: '/create-donation'
      },
      {
        id: 'history',
        icon: FiClock,
        title: 'Donation History',
        subtitle: 'Track past donations',
        path: '/activity'
      },
      {
        id: 'impact',
        icon: FiTrendingUp,
        title: 'My Impact',
        subtitle: "See the difference you've created",
        path: '/impact'
      },
      {
        id: 'edit',
        icon: FiEdit2,
        title: 'Edit Profile',
        subtitle: 'Update your details',
        action: 'edit'
      },
      {
        id: 'support',
        icon: FiHelpCircle,
        title: 'Help & Support',
        subtitle: 'Get help or report an issue',
        action: 'help'
      }
    ]
  },
  ngo: {
    id: 'ngo',
    name: 'Seva Foundation',
    roleTag: 'NGO',
    roleBadge: '🏢 NGO',
    location: 'Indore, MP',
    verified: true,
    stats: [
      { id: 1, icon: '📦', value: '42', label: 'Donations Claimed' },
      { id: 2, icon: '👥', value: '3,860', label: 'Meals Received' },
      { id: 3, icon: '🤝', value: '1,020', label: 'People Served' }
    ],
    menu: [
      {
        id: 'claimed',
        icon: FiClipboard,
        title: 'Claimed Donations',
        subtitle: 'Manage and track claimed food',
        path: '/ngo-dashboard'
      },
      {
        id: 'pickups',
        icon: FiTruck,
        title: 'Scheduled Pickups',
        subtitle: 'Upcoming and ongoing pickups',
        path: '/track-donation/1'
      },
      {
        id: 'impact',
        icon: FiTrendingUp,
        title: 'Our Impact',
        subtitle: 'Meals served, people helped',
        path: '/impact'
      },
      {
        id: 'kyc',
        icon: FiShield,
        title: 'Verification & Documents',
        subtitle: 'Manage NGO verification and KYC',
        action: 'kyc'
      },
      {
        id: 'edit',
        icon: FiEdit2,
        title: 'Edit Profile',
        subtitle: 'Update NGO details and contact',
        action: 'edit'
      }
    ]
  },
  volunteer: {
    id: 'volunteer',
    name: 'Aman Jain',
    roleTag: 'Volunteer',
    roleBadge: '👷 Volunteer',
    location: 'Indore, MP',
    verified: false,
    stats: [
      { id: 1, icon: '📋', value: '36', label: 'Tasks' },
      { id: 2, icon: '🍽️', value: '480', label: 'Meals Delivered' },
      { id: 3, icon: '🌱', value: '96 kg', label: 'Food Rescued' }
    ],
    menu: [
      {
        id: 'browse',
        icon: FiClipboard,
        title: 'Available Tasks',
        subtitle: 'Pick & deliver food nearby',
        path: '/volunteer-dashboard'
      },
      {
        id: 'mytasks',
        icon: FiTruck,
        title: 'My Tasks',
        subtitle: 'Track your accepted tasks',
        path: '/volunteer-active-task/1'
      },
      {
        id: 'achievements',
        icon: FiAward,
        title: 'Achievements',
        subtitle: 'Badges, points and milestones',
        action: 'badges'
      },
      {
        id: 'impact',
        icon: FiTrendingUp,
        title: 'My Impact',
        subtitle: 'See your total contribution',
        path: '/impact'
      }
    ]
  }
}

export default function ProfileScreen() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Get active role from URL param or storage
  const initialRole = searchParams.get('role') || localStorage.getItem('annsewa_active_role') || 'donor'
  const [selectedRole, setSelectedRole] = useState(
    ROLES_DATA[initialRole.toLowerCase()] ? initialRole.toLowerCase() : 'donor'
  )

  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam && ROLES_DATA[roleParam.toLowerCase()]) {
      setSelectedRole(roleParam.toLowerCase())
    }
  }, [searchParams])

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey)
    setSearchParams({ role: roleKey })
    localStorage.setItem('annsewa_active_role', roleKey)
  }

  const currentProfile = ROLES_DATA[selectedRole]

  const handleMenuItemClick = (item) => {
    if (item.path) {
      navigate(item.path)
    } else if (item.action) {
      setActiveModal(item.action)
    }
  }

  return (
    <div className="profile-page-container">
      {/* 1. TOP HEADER WITH BACK ARROW & SETTINGS GEAR */}
      <div className="profile-top-header-bar">
        <StatusBar dark={false} />

        <div className="profile-header-main-row">
          <button 
            type="button" 
            className="profile-nav-arrow-btn"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>

          <h1 className="profile-screen-title">My Profile</h1>

          <button 
            type="button" 
            className="profile-settings-gear-btn"
            onClick={() => navigate('/role-selection')}
            title="Settings & Switch Role"
            aria-label="Settings"
          >
            <FiSettings size={20} color="#1A1A1A" />
          </button>
        </div>
      </div>

      {/* 2. THREE SEPARATE PROFILE SWITCHER TABS (Donor | NGO | Volunteer) */}
      <div className="profile-role-switcher-bar">
        <button
          type="button"
          className={`role-tab-pill ${selectedRole === 'donor' ? 'active-tab' : ''}`}
          onClick={() => handleRoleChange('donor')}
        >
          <span>📦 Donor</span>
        </button>

        <button
          type="button"
          className={`role-tab-pill ${selectedRole === 'ngo' ? 'active-tab' : ''}`}
          onClick={() => handleRoleChange('ngo')}
        >
          <span>🏢 NGO</span>
        </button>

        <button
          type="button"
          className={`role-tab-pill ${selectedRole === 'volunteer' ? 'active-tab' : ''}`}
          onClick={() => handleRoleChange('volunteer')}
        >
          <span>👷 Volunteer</span>
        </button>
      </div>

      {/* 3. SCROLLABLE PROFILE CONTENT BODY */}
      <div className="profile-scroll-body">
        {/* User Identity Card */}
        <div className="profile-user-card">
          <div className="user-avatar-row">
            <div className="user-avatar-ring">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="#2E7D32">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <button 
                type="button" 
                className="avatar-edit-pencil" 
                title="Change Photo"
                onClick={() => setActiveModal('edit')}
              >
                <FiEdit2 size={10} color="#FFFFFF" />
              </button>
            </div>

            <div className="user-credentials-col">
              <div className="user-name-line">
                <h2 className="user-display-name">{currentProfile.name}</h2>
                {currentProfile.verified && (
                  <span className="verified-badge-check" title="Verified NGO">
                    <FiCheck size={11} color="#FFFFFF" strokeWidth={3.5} />
                  </span>
                )}
              </div>

              <div className="user-tags-line">
                <span className="profile-role-pill-badge">{currentProfile.roleBadge}</span>
                <span className="user-location-text">📍 {currentProfile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Key Stat Boxes Grid (Exact 3-column layout matching images) */}
        <div className="profile-three-stats-grid">
          {currentProfile.stats.map((stat) => (
            <div key={stat.id} className="profile-stat-box-unit">
              <span className="stat-unit-icon">{stat.icon}</span>
              <strong className="stat-unit-value">{stat.value}</strong>
              <span className="stat-unit-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Profile Menu Actions List */}
        <div className="profile-menu-card-list">
          {currentProfile.menu.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className="profile-menu-row-item"
                onClick={() => handleMenuItemClick(item)}
              >
                <div className="menu-left-icon-square">
                  <Icon size={18} color="#2E7D32" />
                </div>

                <div className="menu-text-details-col">
                  <h4 className="menu-item-main-title">{item.title}</h4>
                  <p className="menu-item-subtitle">{item.subtitle}</p>
                </div>

                <FiChevronRight size={18} color="#9E9E9E" className="menu-right-chevron" />
              </button>
            )
          })}
        </div>

        {/* Switch Role / Logout Button */}
        <button 
          type="button" 
          className="profile-logout-button"
          onClick={() => navigate('/role-selection')}
        >
          <FiLogOut size={16} color="#D32F2F" />
          <span>Switch Role / Logout</span>
        </button>
      </div>

      {/* 4. INTERACTIVE FEEDBACK POPUP MODAL */}
      {activeModal && (
        <div className="profile-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="modal-heading-title">
                {activeModal === 'edit' && '✏️ Edit Profile'}
                {activeModal === 'kyc' && '🛡️ NGO Verification & KYC'}
                {activeModal === 'badges' && '🏆 Volunteer Achievements'}
                {activeModal === 'help' && '❓ Help & Support'}
              </h3>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setActiveModal(null)}
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="modal-body-content">
              {activeModal === 'edit' && (
                <div className="modal-form-fields">
                  <p className="modal-lead-desc">Update your display information on Annsewa:</p>
                  <label className="modal-field-label">Name</label>
                  <input type="text" className="modal-input" defaultValue={currentProfile.name} />
                  <label className="modal-field-label">Location</label>
                  <input type="text" className="modal-input" defaultValue="Indore, Madhya Pradesh" />
                  <button 
                    type="button" 
                    className="modal-save-btn" 
                    onClick={() => setActiveModal(null)}
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {activeModal === 'kyc' && (
                <div className="modal-kyc-content">
                  <div className="kyc-status-pill approved">
                    <FiCheck size={14} /> NGO Verified & Compliant
                  </div>
                  <p className="kyc-desc">Registration No: <strong>MP/IND/2021/00842</strong></p>
                  <p className="kyc-desc">FSSAI License: <strong>10021026000192</strong></p>
                  <p className="kyc-sub">All 80G and 12A documentation is up to date.</p>
                </div>
              )}

              {activeModal === 'badges' && (
                <div className="modal-badges-grid">
                  <div className="badge-item">
                    <span className="badge-emoji">⭐</span>
                    <strong>Super Volunteer</strong>
                    <small>Completed 25+ deliveries</small>
                  </div>
                  <div className="badge-item">
                    <span className="badge-emoji">⚡</span>
                    <strong>Quick Responder</strong>
                    <small>Under 30 mins pickup</small>
                  </div>
                  <div className="badge-item">
                    <span className="badge-emoji">🌱</span>
                    <strong>Zero Waste Hero</strong>
                    <small>Rescued 50+ kg food</small>
                  </div>
                </div>
              )}

              {activeModal === 'help' && (
                <div className="modal-help-content">
                  <p>Need assistance or have questions?</p>
                  <div className="help-contact-line">📞 Helpline: <strong>1800-ANN-SEWA</strong></div>
                  <div className="help-contact-line">✉️ Email: <strong>support@annsewa.org</strong></div>
                  <div className="help-contact-line">⏰ Hours: <strong>24x7 Campus Helpline</strong></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. PERSISTENT FIXED BOTTOM NAV */}
      <BottomNav />
    </div>
  )
}
