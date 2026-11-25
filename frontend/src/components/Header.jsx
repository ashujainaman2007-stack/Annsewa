import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Header({ title, showBack = false, rightContent = null }) {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      background: 'white',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', padding: 4, display: 'flex' }}
          >
            <FiArrowLeft size={22} color="#1A1A1A" />
          </button>
        )}
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{title}</h1>
      </div>
      {rightContent}
    </div>
  )
}

