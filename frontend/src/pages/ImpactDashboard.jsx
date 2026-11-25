import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import './ImpactDashboard.css'

const weeklyData = [
  { day: 'Mon', value: 35 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 95 },
  { day: 'Thu', value: 45 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 110 },
  { day: 'Sun', value: 130 },
]

const stats = [
  { number: '1,240', label: 'Meals Saved', bg: '#F1F8E9', textColor: '#2E7D32' },
  { number: '198 kg', label: 'Food Rescued', bg: '#F1F8E9', textColor: '#2E7D32' },
  { number: '28', label: 'Donors', bg: '#F1F8E9', textColor: '#2E7D32' },
  { number: '10', label: 'NGOs', bg: '#F1F8E9', textColor: '#2E7D32' },
]

export default function ImpactDashboard() {
  const navigate = useNavigate()
  const maxVal = Math.max(...weeklyData.map(d => d.value))

  return (
    <div className="impact-page-container">
      <div className="impact-top-header">
        <StatusBar dark={false} />

        {/* Brand header */}
        <div className="impact-brand-row">
          <AnnsewaLogo size={32} showText={true} showTagline={false} />
        </div>

        {/* Headline Titles */}
        <div className="impact-titles-block">
          <h2 className="impact-main-title">Our Impact</h2>
          <p className="impact-campus-subtitle">Together for a Zero Food Waste Campus</p>
        </div>
      </div>

      <div className="impact-scroll-body">
        {/* 4 Stat Boxes (2x2 Grid) */}
        <div className="impact-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="impact-stat-box">
              <span className="impact-stat-digit">{stat.number}</span>
              <span className="impact-stat-name">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bar Chart Section */}
        <div className="impact-chart-card">
          <h3 className="chart-heading-title">Meals Saved (Last 7 Days)</h3>
          
          <div className="bar-chart-visual-area">
            {weeklyData.map((item) => {
              const heightPercent = Math.round((item.value / maxVal) * 100)
              return (
                <div key={item.day} className="chart-single-column">
                  <div className="bar-track-area">
                    <div 
                      className="green-progress-bar"
                      style={{ height: `${heightPercent}%` }}
                      title={`${item.day}: ${item.value} meals`}
                    ></div>
                  </div>
                  <span className="day-axis-label">{item.day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
