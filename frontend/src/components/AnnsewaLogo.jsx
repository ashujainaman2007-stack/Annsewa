import React from 'react'

export default function AnnsewaLogo({ 
  size = 40, 
  variant = 'green', // 'green' | 'white'
  showText = true, 
  showTagline = true,
  direction = 'row' // 'row' | 'column'
}) {
  const isWhite = variant === 'white'
  const primaryColor = isWhite ? '#FFFFFF' : '#2E7D32'
  const secondaryColor = isWhite ? '#E8F5E9' : '#1B5E20'
  const leafLight = isWhite ? '#C8E6C9' : '#4CAF50'
  const leafDark = isWhite ? '#FFFFFF' : '#2E7D32'
  const textColor = isWhite ? '#FFFFFF' : '#1A1A1A'
  const taglineColor = isWhite ? 'rgba(255, 255, 255, 0.85)' : '#666666'

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: direction,
      alignItems: direction === 'column' ? 'center' : 'center',
      gap: direction === 'column' ? '8px' : '10px',
      textAlign: direction === 'column' ? 'center' : 'left'
    }}>
      {/* Bowl with Sprouting Leaves Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Sprouting Leaves at top */}
        <path 
          d="M48 38 C42 22 52 8 68 12 C68 28 58 38 48 38 Z" 
          fill={leafLight} 
        />
        <path 
          d="M52 38 C60 20 74 18 80 28 C74 38 60 40 52 38 Z" 
          fill={leafDark} 
        />
        <path 
          d="M38 38 C32 26 38 16 48 20 C46 30 40 36 38 38 Z" 
          fill={leafLight} 
          opacity="0.8" 
        />
        {/* Steam / freshness wave */}
        <path 
          d="M50 36 C50 33 52 30 50 28" 
          stroke={isWhite ? 'rgba(255,255,255,0.7)' : '#81C784'} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />

        {/* Bowl Rim */}
        <ellipse 
          cx="50" 
          cy="48" 
          rx="42" 
          ry="11" 
          fill={isWhite ? 'rgba(255,255,255,0.25)' : '#E8F5E9'} 
        />
        <ellipse 
          cx="50" 
          cy="46" 
          rx="40" 
          ry="9" 
          fill={isWhite ? '#FFFFFF' : '#43A047'} 
        />

        {/* Food mound inside bowl */}
        <path 
          d="M18 47 C25 40 75 40 82 47 Z" 
          fill={isWhite ? '#C8E6C9' : '#81C784'} 
        />

        {/* Bowl Body (Curved Bottom) */}
        <path 
          d="M12 48 C14 74 30 84 50 84 C70 84 86 74 88 48 C80 54 20 54 12 48 Z" 
          fill={primaryColor} 
        />

        {/* Bowl Base foot */}
        <path 
          d="M34 83 C38 86 62 86 66 83 L64 87 C60 88 40 88 36 87 Z" 
          fill={secondaryColor} 
        />

        {/* Highlight sheen */}
        <path 
          d="M20 56 C26 70 38 76 50 77 C40 75 30 68 24 57 Z" 
          fill={isWhite ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)'} 
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontSize: direction === 'column' ? `${size * 0.55}px` : `${Math.max(16, size * 0.45)}px`,
            fontWeight: 800,
            color: textColor,
            letterSpacing: '-0.3px',
            lineHeight: 1.15,
            fontFamily: "'Poppins', sans-serif"
          }}>
            Annsewa
          </span>
          {showTagline && (
            <span style={{
              fontSize: direction === 'column' ? '12px' : '9.5px',
              fontWeight: 500,
              color: taglineColor,
              letterSpacing: '0.2px',
              marginTop: '1px',
              whiteSpace: 'nowrap'
            }}>
              Rescue Food • Reduce Waste • Feed Lives
            </span>
          )}
        </div>
      )}
    </div>
  )
}

