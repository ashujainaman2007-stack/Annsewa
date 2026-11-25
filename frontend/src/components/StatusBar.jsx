export default function StatusBar({ dark = false, style = {} }) {
  const textColor = dark ? '#FFFFFF' : '#1A1A1A'
  const iconColor = dark ? '#FFFFFF' : '#1A1A1A'

  return (
    <div
      className={`status-bar ${dark ? 'status-bar-dark' : ''}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 24px 6px',
        fontSize: '14px',
        fontWeight: '600',
        color: textColor,
        zIndex: 50,
        position: 'relative',
        userSelect: 'none',
        ...style
      }}
    >
      <span className="time" style={{ letterSpacing: '-0.2px', fontSize: '14px', fontWeight: '700' }}>
        9:41
      </span>

      {/* Status Bar Icons: Cellular, Wifi, Battery */}
      <div className="icons" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {/* Cellular Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={iconColor}>
          <rect x="0.5" y="8" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="8.5" y="3" width="3" height="9" rx="0.8" />
          <rect x="12.5" y="0.5" width="3" height="11.5" rx="0.8" />
        </svg>

        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill={iconColor}>
          <path d="M8 2.5C10.8 2.5 13.3 3.7 15 5.6L16 4.4C14 2.2 11.2 1 8 1C4.8 1 2 2.2 0 4.4L1 5.6C2.7 3.7 5.2 2.5 8 2.5Z" />
          <path d="M8 6C9.9 6 11.6 6.8 12.8 8.1L14 6.8C12.5 5.1 10.4 4 8 4C5.6 4 3.5 5.1 2 6.8L3.2 8.1C4.4 6.8 6.1 6 8 6Z" />
          <circle cx="8" cy="10.2" r="1.8" />
        </svg>

        {/* Battery */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1px'
        }}>
          <div style={{
            width: '23px',
            height: '11.5px',
            borderRadius: '3.5px',
            border: `1.5px solid ${iconColor}`,
            padding: '1.5px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '80%',
              height: '100%',
              borderRadius: '1.5px',
              backgroundColor: dark ? '#4CAF50' : '#2E7D32'
            }}></div>
          </div>
          <div style={{
            width: '1.5px',
            height: '4px',
            borderRadius: '0 1px 1px 0',
            backgroundColor: iconColor,
            opacity: 0.8
          }}></div>
        </div>
      </div>
    </div>
  )
}
