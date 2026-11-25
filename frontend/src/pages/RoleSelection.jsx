import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import AnnsewaLogo from '../components/AnnsewaLogo'
import { FiHome, FiUsers, FiHeart, FiSettings, FiChevronRight } from 'react-icons/fi'
import './RoleSelection.css'

const roles = [
  {
    roleKey: 'donor',
    icon: FiHome,
    title: 'Donor',
    description: 'Have surplus food? Donate it.',
    path: '/home',
    badgeColor: '#E8F5E9',
    iconColor: '#2E7D32'
  },
  {
    roleKey: 'ngo',
    icon: FiUsers,
    title: 'NGO',
    description: 'Receive and distribute food.',
    path: '/ngo-dashboard',
    badgeColor: '#E8F5E9',
    iconColor: '#2E7D32'
  },
  {
    roleKey: 'volunteer',
    icon: FiHeart,
    title: 'Volunteer',
    description: 'Help with food pickup & delivery.',
    path: '/volunteer-dashboard',
    badgeColor: '#E8F5E9',
    iconColor: '#2E7D32'
  },
  {
    roleKey: 'donor',
    icon: FiSettings,
    title: 'Admin',
    description: 'Manage the platform and impact.',
    path: '/impact',
    badgeColor: '#E8F5E9',
    iconColor: '#2E7D32'
  }
]

export default function RoleSelection() {
  const navigate = useNavigate()

  return (
    <div className="role-page">
      <StatusBar dark={false} />

      <div className="role-content">
        {/* Top Centered Sprout Emblem */}
        <div className="role-top-header">
          <div className="role-sprout-emblem">
            <AnnsewaLogo size={42} showText={false} showTagline={false} />
          </div>
          <h1 className="role-headline">
            Get Started<br/>with Annsewa
          </h1>
          <p className="role-subhead">
            Choose your role to continue
          </p>
        </div>

        {/* Role Cards List */}
        <div className="role-cards-container">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.title}
                type="button"
                className="role-selection-card"
                onClick={() => {
                  if (role.roleKey) {
                    localStorage.setItem('annsewa_active_role', role.roleKey)
                  }
                  navigate(role.path)
                }}
              >
                <div 
                  className="role-card-icon-box"
                  style={{ backgroundColor: role.badgeColor, color: role.iconColor }}
                >
                  <Icon size={22} />
                </div>

                <div className="role-card-texts">
                  <h3 className="role-card-heading">{role.title}</h3>
                  <p className="role-card-sub">{role.description}</p>
                </div>

                <FiChevronRight className="role-card-arrow" size={20} color="#9E9E9E" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
