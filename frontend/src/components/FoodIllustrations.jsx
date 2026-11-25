import React from 'react'

// Appetizing Golden Vegetable Pulao / Biryani Dish in Bowl
export function PulaoImage({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '12px', ...style }}>
      <rect width="100" height="100" rx="12" fill="#FFF8E1" />
      {/* Bowl rim */}
      <ellipse cx="50" cy="54" rx="42" ry="28" fill="#F57C00" opacity="0.2" />
      <ellipse cx="50" cy="52" rx="40" ry="26" fill="#D7CCC8" />
      <ellipse cx="50" cy="50" rx="38" ry="24" fill="#FFFFFF" />
      
      {/* Rice base - golden fragrant rice */}
      <ellipse cx="50" cy="48" rx="35" ry="21" fill="#FFB300" />
      <ellipse cx="48" cy="46" rx="32" ry="18" fill="#FFC107" />
      <ellipse cx="52" cy="45" rx="28" ry="15" fill="#FFE082" />

      {/* Rice Grains */}
      <ellipse cx="42" cy="42" rx="4" ry="1.5" transform="rotate(-15 42 42)" fill="#FFF9C4" />
      <ellipse cx="56" cy="44" rx="4" ry="1.5" transform="rotate(25 56 44)" fill="#FFF9C4" />
      <ellipse cx="48" cy="50" rx="4" ry="1.5" transform="rotate(-30 48 50)" fill="#FFF9C4" />
      <ellipse cx="36" cy="48" rx="3.5" ry="1.2" transform="rotate(10 36 48)" fill="#FFF9C4" />
      <ellipse cx="62" cy="48" rx="3.5" ry="1.2" transform="rotate(-10 62 48)" fill="#FFF9C4" />
      <ellipse cx="52" cy="38" rx="4" ry="1.5" transform="rotate(40 52 38)" fill="#FFF9C4" />

      {/* Green Peas */}
      <circle cx="44" cy="46" r="3.2" fill="#43A047" />
      <circle cx="43" cy="45" r="1" fill="#A5D6A7" />
      <circle cx="58" cy="41" r="3" fill="#388E3C" />
      <circle cx="38" cy="43" r="2.8" fill="#4CAF50" />
      <circle cx="54" cy="52" r="3.2" fill="#43A047" />
      <circle cx="64" cy="45" r="2.6" fill="#2E7D32" />

      {/* Diced Carrots & Spices */}
      <rect x="48" y="42" width="4.5" height="4" rx="1" transform="rotate(12 48 42)" fill="#E64A19" />
      <rect x="36" y="50" width="4" height="4" rx="1" transform="rotate(-20 36 50)" fill="#F4511E" />
      <rect x="58" y="48" width="4.2" height="3.8" rx="1" transform="rotate(35 58 48)" fill="#FF5722" />
      <circle cx="46" cy="38" r="2.5" fill="#BF360C" />

      {/* Fresh Coriander / Mint Leaves garnish on top */}
      <path d="M50 36 C46 30 40 32 44 38 C46 40 49 39 50 36 Z" fill="#2E7D32" />
      <path d="M50 36 C54 30 60 32 56 38 C54 40 51 39 50 36 Z" fill="#388E3C" />
      <path d="M50 34 C50 28 52 26 53 30 C53 33 51 34 50 34 Z" fill="#4CAF50" />

      {/* Steam rising */}
      <path d="M42 28 C40 22 44 18 42 14" stroke="rgba(255, 179, 0, 0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 26 C54 20 50 16 53 11" stroke="rgba(255, 179, 0, 0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 29 C62 23 59 19 61 15" stroke="rgba(255, 179, 0, 0.4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Roti & Sabzi Indian Meal Illustration
export function RotiSabziImage({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '12px', ...style }}>
      <rect width="100" height="100" rx="12" fill="#FBE9E7" />
      
      {/* Stainless steel thali tray */}
      <circle cx="50" cy="50" r="42" fill="#CFD8DC" />
      <circle cx="50" cy="50" r="39" fill="#ECEFF1" />
      
      {/* 2 Hot Soft Rotis */}
      <circle cx="40" cy="52" r="22" fill="#D7CCC8" />
      <circle cx="38" cy="50" r="21" fill="#FFE0B2" />
      {/* Brown cooked spots on roti */}
      <circle cx="32" cy="44" r="2.5" fill="#8D6E63" opacity="0.6" />
      <circle cx="42" cy="40" r="1.8" fill="#8D6E63" opacity="0.7" />
      <circle cx="40" cy="56" r="3" fill="#A1887F" opacity="0.5" />
      <circle cx="28" cy="52" r="2" fill="#8D6E63" opacity="0.6" />

      {/* Sabzi bowl (Paneer / Mix Veg) */}
      <circle cx="66" cy="42" r="18" fill="#B0BEC5" />
      <circle cx="66" cy="42" r="16" fill="#BF360C" />
      <circle cx="66" cy="42" r="14" fill="#D84315" />
      {/* Paneer cubes */}
      <rect x="62" y="38" width="6" height="5" rx="1" fill="#FFF9C4" />
      <rect x="69" y="44" width="5.5" height="5" rx="1" fill="#FFFDE7" />
      <circle cx="61" cy="46" r="2" fill="#388E3C" />
      {/* Coriander */}
      <path d="M66 38 C64 34 68 34 66 38 Z" fill="#2E7D32" />

      {/* Dal / Salad bowl */}
      <circle cx="64" cy="68" r="14" fill="#B0BEC5" />
      <circle cx="64" cy="68" r="12" fill="#FFA000" />
      <circle cx="64" cy="68" r="10" fill="#FFC107" />
      <circle cx="63" cy="67" r="2" fill="#388E3C" />
    </svg>
  )
}

// Bread & Bakery Snacks Illustration
export function SnacksImage({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '12px', ...style }}>
      <rect width="100" height="100" rx="12" fill="#FFF3E0" />
      {/* Tray */}
      <rect x="15" y="24" width="70" height="56" rx="8" fill="#D7CCC8" />
      <rect x="18" y="27" width="64" height="50" rx="6" fill="#FFFFFF" />

      {/* Fresh Bread loaf slices */}
      <rect x="25" y="34" width="22" height="28" rx="6" fill="#8D6E63" />
      <rect x="26" y="35" width="20" height="26" rx="5" fill="#FFE0B2" />
      <rect x="30" y="32" width="22" height="28" rx="6" fill="#6D4C41" />
      <rect x="31" y="33" width="20" height="26" rx="5" fill="#FFCC80" />

      {/* Golden baked samosa / puff snack */}
      <path d="M62 40 L76 62 L50 62 Z" fill="#E65100" />
      <path d="M62 42 L74 61 L52 61 Z" fill="#FF9800" />
      <circle cx="60" cy="54" r="1.5" fill="#BF360C" />
      <circle cx="66" cy="56" r="1.2" fill="#BF360C" />

      {/* Fresh herb garnish */}
      <path d="M60 38 Q62 32 66 36 Q64 40 60 38 Z" fill="#43A047" />
    </svg>
  )
}

// Rice & Curry Dish Illustration (Screen 4 of new image)
export function RiceCurryImage({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '12px', ...style }}>
      <rect width="100" height="100" rx="12" fill="#FFF8E1" />
      {/* Bowl */}
      <ellipse cx="50" cy="52" rx="40" ry="26" fill="#8D6E63" />
      <ellipse cx="50" cy="50" rx="38" ry="24" fill="#3E2723" />
      <ellipse cx="50" cy="48" rx="35" ry="21" fill="#E65100" />

      {/* Rich Gravy Curry Base */}
      <ellipse cx="50" cy="48" rx="32" ry="18" fill="#EF6C00" />
      <ellipse cx="46" cy="46" rx="28" ry="15" fill="#F57C00" />

      {/* Rice Mound */}
      <ellipse cx="40" cy="46" rx="18" ry="12" fill="#FFFFFF" />
      <ellipse cx="38" cy="45" rx="15" ry="10" fill="#FFF9C4" />

      {/* Curry toppings & spices */}
      <circle cx="60" cy="44" r="5" fill="#D84315" />
      <circle cx="66" cy="48" r="4.5" fill="#BF360C" />
      <circle cx="54" cy="52" r="4" fill="#E64A19" />

      {/* Cilantro garnish */}
      <path d="M48 40 C44 36 48 32 50 36 Z" fill="#2E7D32" />
      <path d="M52 40 C56 36 52 32 50 36 Z" fill="#388E3C" />
    </svg>
  )
}

// Cardboard Box with Fresh Produce (Onboarding Screen 2)
export function ProduceBoxIllustration({ width = 200, height = 180 }) {
  return (
    <svg viewBox="0 0 220 200" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft floating leaves */}
      <path d="M95 35 C88 20 98 10 110 16 C110 28 102 36 95 35 Z" fill="#4CAF50" />
      <path d="M125 32 C135 18 145 22 142 34 C136 40 128 38 125 32 Z" fill="#2E7D32" />
      <path d="M75 48 C65 36 72 26 82 32 C84 40 78 46 75 48 Z" fill="#81C784" />
      <circle cx="65" cy="30" r="3" fill="#FFD54F" />
      <circle cx="160" cy="28" r="2.5" fill="#FFD54F" />

      {/* Fresh Vegetables spilling out */}
      {/* Lettuce / Greens */}
      <circle cx="78" cy="74" r="22" fill="#81C784" />
      <circle cx="74" cy="72" r="18" fill="#4CAF50" />
      <circle cx="78" cy="70" r="14" fill="#2E7D32" />

      {/* Oranges / Tomatoes */}
      <circle cx="112" cy="68" r="16" fill="#F4511E" />
      <circle cx="108" cy="64" r="3" fill="#FF8A65" />
      <circle cx="140" cy="72" r="17" fill="#FF9800" />
      <circle cx="136" cy="68" r="3.5" fill="#FFCC80" />

      {/* Carrots */}
      <path d="M130 54 L158 84 L146 88 Z" fill="#E65100" />
      <path d="M128 52 L154 82 L144 86 Z" fill="#FF5722" />
      {/* Carrot tops */}
      <path d="M126 50 C122 40 126 36 130 42 Z" fill="#43A047" />
      <path d="M128 48 C132 38 136 40 132 46 Z" fill="#2E7D32" />

      {/* Cardboard Box Body */}
      <rect x="42" y="80" width="136" height="96" rx="10" fill="#C7A27C" />
      {/* Box flap tops */}
      <path d="M38 80 L76 72 L144 72 L182 80 L42 80 Z" fill="#B58E68" />
      <rect x="42" y="80" width="136" height="22" rx="4" fill="#B58E68" />
      {/* Front shadow flap */}
      <rect x="48" y="98" width="124" height="3" fill="#A47D57" opacity="0.4" />

      {/* White Heart on Box Front */}
      <path 
        d="M110 125 C110 125 96 112 96 104 C96 99 100 95 105 95 C108 95 110 97 110 97 C110 97 112 95 115 95 C120 95 124 99 124 104 C124 112 110 125 110 125 Z" 
        fill="#FFFFFF" 
        opacity="0.95" 
      />

      {/* Box Bottom Depth Shadow */}
      <ellipse cx="110" cy="184" rx="72" ry="10" fill="#000000" opacity="0.1" />
    </svg>
  )
}

// Green Eco Delivery Truck (Donation Tracking Screen 8)
export function DeliveryTruckIllustration({ width = 160, height = 75 }) {
  return (
    <svg viewBox="0 0 180 85" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rolling Hills Background */}
      <path d="M0 65 Q60 50 120 62 T180 58 L180 85 L0 85 Z" fill="#E8F5E9" />
      <path d="M20 70 Q90 56 180 66 L180 85 L20 85 Z" fill="#C8E6C9" />

      {/* Truck Body Cargo Box */}
      <rect x="25" y="24" width="75" height="42" rx="6" fill="#2E7D32" />
      {/* Cargo Box Heart Emblem */}
      <circle cx="62" cy="44" r="14" fill="#FFFFFF" />
      <path 
        d="M62 49 C62 49 55 43 55 39 C55 36 57 34 60 34 C61.5 34 62 35 62 35 C62 35 62.5 34 64 34 C67 34 69 36 69 39 C69 43 62 49 62 49 Z" 
        fill="#2E7D32" 
      />
      {/* Fresh Carrots on Roof Rack */}
      <rect x="35" y="16" width="38" height="9" rx="2" fill="#D7CCC8" />
      <circle cx="44" cy="18" r="3.5" fill="#FF5722" />
      <circle cx="54" cy="18" r="4" fill="#4CAF50" />
      <circle cx="64" cy="18" r="3.5" fill="#FF9800" />

      {/* Truck Cabin */}
      <path d="M100 36 L124 36 C130 36 136 42 138 48 L142 56 L142 66 L100 66 Z" fill="#43A047" />
      {/* Cabin Window */}
      <path d="M104 40 L122 40 C125 40 128 43 130 47 L132 52 L104 52 Z" fill="#E0F2F1" />
      {/* Cabin Door line */}
      <line x1="118" y1="52" x2="118" y2="66" stroke="#2E7D32" strokeWidth="1.5" />
      {/* Headlight */}
      <rect x="139" y="58" width="4" height="5" rx="1.5" fill="#FFEB3B" />

      {/* Wheels */}
      <circle cx="48" cy="68" r="11" fill="#212121" />
      <circle cx="48" cy="68" r="5" fill="#BDBDBD" />
      <circle cx="124" cy="68" r="11" fill="#212121" />
      <circle cx="124" cy="68" r="5" fill="#BDBDBD" />

      {/* Speed lines */}
      <line x1="12" y1="42" x2="20" y2="42" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="48" x2="18" y2="48" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Hero Catering Tray: Vegetable Pulao in Steel Gastronomy Pan with Dal Bowl (Screen 2 Hero)
export function PulaoDalHeroImage({ width = '100%', height = 210, style = {} }) {
  return (
    <svg 
      viewBox="0 0 360 200" 
      width={width} 
      height={height} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '16px', overflow: 'hidden', ...style }}
    >
      {/* Background warm canteen ambient gradient */}
      <rect width="360" height="200" fill="#2E2822" />
      <radialGradient id="tableGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4A3F35" />
        <stop offset="100%" stopColor="#1E1914" />
      </radialGradient>
      <rect width="360" height="200" fill="url(#tableGlow)" opacity="0.8" />

      {/* Main Stainless Steel Gastronomy Pan (Pulao Tray) */}
      <g transform="translate(16, 20)">
        {/* Pan Outer Shadow */}
        <rect x="2" y="4" width="230" height="156" rx="16" fill="#0E0C0A" opacity="0.6" filter="blur(4px)" />
        {/* Steel Rim */}
        <rect x="0" y="0" width="230" height="152" rx="14" fill="#B0BEC5" />
        <rect x="4" y="4" width="222" height="144" rx="11" fill="#ECEFF1" />
        <rect x="7" y="7" width="216" height="138" rx="8" fill="#78909C" />
        {/* Pan Food Bed */}
        <rect x="10" y="10" width="210" height="132" rx="6" fill="#FFA000" />

        {/* Fragrant Golden Rice Textures */}
        <ellipse cx="115" cy="76" rx="100" ry="60" fill="#FFB300" />
        <ellipse cx="110" cy="74" rx="90" ry="52" fill="#FFC107" />
        <ellipse cx="115" cy="70" rx="82" ry="46" fill="#FFE082" />

        {/* Rice Grain Clusters */}
        <ellipse cx="60" cy="50" rx="6" ry="2.2" transform="rotate(-20 60 50)" fill="#FFFDE7" />
        <ellipse cx="75" cy="46" rx="6.5" ry="2.2" transform="rotate(35 75 46)" fill="#FFF8E1" />
        <ellipse cx="90" cy="55" rx="7" ry="2.4" transform="rotate(-15 90 55)" fill="#FFFDE7" />
        <ellipse cx="110" cy="48" rx="6.5" ry="2.3" transform="rotate(25 110 48)" fill="#FFF8E1" />
        <ellipse cx="130" cy="52" rx="7" ry="2.4" transform="rotate(-40 130 52)" fill="#FFFDE7" />
        <ellipse cx="150" cy="48" rx="6" ry="2.2" transform="rotate(10 150 48)" fill="#FFFDE7" />
        <ellipse cx="170" cy="58" rx="6.5" ry="2.3" transform="rotate(-30 170 58)" fill="#FFF8E1" />

        <ellipse cx="50" cy="80" rx="6" ry="2.2" transform="rotate(15 50 80)" fill="#FFFDE7" />
        <ellipse cx="70" cy="85" rx="7" ry="2.5" transform="rotate(-25 70 85)" fill="#FFF8E1" />
        <ellipse cx="95" cy="78" rx="7.5" ry="2.4" transform="rotate(20 95 78)" fill="#FFFDE7" />
        <ellipse cx="120" cy="82" rx="7" ry="2.5" transform="rotate(-10 120 82)" fill="#FFFDE7" />
        <ellipse cx="145" cy="76" rx="6.5" ry="2.3" transform="rotate(45 145 76)" fill="#FFF8E1" />
        <ellipse cx="168" cy="86" rx="6" ry="2.2" transform="rotate(-15 168 86)" fill="#FFFDE7" />

        <ellipse cx="65" cy="110" rx="6.5" ry="2.3" transform="rotate(-35 65 110)" fill="#FFF8E1" />
        <ellipse cx="90" cy="112" rx="7" ry="2.4" transform="rotate(25 90 112)" fill="#FFFDE7" />
        <ellipse cx="115" cy="108" rx="7.5" ry="2.5" transform="rotate(-15 115 108)" fill="#FFFDE7" />
        <ellipse cx="140" cy="114" rx="6.5" ry="2.3" transform="rotate(30 140 114)" fill="#FFF8E1" />
        <ellipse cx="162" cy="105" rx="6" ry="2.2" transform="rotate(-20 162 105)" fill="#FFFDE7" />

        {/* Green Peas */}
        <circle cx="55" cy="62" r="4.2" fill="#388E3C" />
        <circle cx="53" cy="60" r="1.5" fill="#A5D6A7" />
        <circle cx="82" cy="64" r="4.5" fill="#43A047" />
        <circle cx="80" cy="62" r="1.5" fill="#C8E6C9" />
        <circle cx="106" cy="60" r="4" fill="#2E7D32" />
        <circle cx="138" cy="66" r="4.5" fill="#43A047" />
        <circle cx="160" cy="72" r="4" fill="#388E3C" />
        <circle cx="78" cy="98" r="4.5" fill="#2E7D32" />
        <circle cx="108" cy="95" r="4.2" fill="#43A047" />
        <circle cx="132" cy="98" r="4" fill="#388E3C" />
        <circle cx="152" cy="94" r="4.2" fill="#43A047" />
        <circle cx="48" cy="102" r="3.8" fill="#388E3C" />

        {/* Diced Carrots & Spices */}
        <rect x="66" y="52" width="6" height="5.5" rx="1.5" transform="rotate(18 66 52)" fill="#E64A19" />
        <rect x="98" y="70" width="6.5" height="5" rx="1.5" transform="rotate(-22 98 70)" fill="#FF5722" />
        <rect x="124" y="60" width="6" height="5.5" rx="1.5" transform="rotate(35 124 60)" fill="#F4511E" />
        <rect x="146" y="80" width="6.5" height="5" rx="1.5" transform="rotate(-15 146 80)" fill="#E64A19" />
        <rect x="88" y="92" width="6" height="5.5" rx="1.5" transform="rotate(40 88 92)" fill="#FF5722" />
        <rect x="120" y="92" width="6.5" height="5.5" rx="1.5" transform="rotate(-30 120 92)" fill="#F4511E" />
        <circle cx="70" cy="75" r="3" fill="#D84315" />
        <circle cx="140" cy="85" r="3.2" fill="#BF360C" />

        {/* Fresh Cilantro / Mint Garnish Leaves on Pulao */}
        <path d="M110 52 C104 44 96 46 102 54 C104 57 108 55 110 52 Z" fill="#2E7D32" />
        <path d="M110 52 C116 44 124 46 118 54 C116 57 112 55 110 52 Z" fill="#388E3C" />
        <path d="M110 50 C110 42 114 40 115 45 C115 49 112 50 110 50 Z" fill="#4CAF50" />

        {/* Natural Steam wisps */}
        <path d="M95 38 C90 30 96 22 92 14" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M115 35 C118 26 112 20 116 11" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M135 38 C140 28 134 22 138 15" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Side Round Stainless Steel Bowl (Yellow Dal Tadka Katori) */}
      <g transform="translate(258, 26)">
        {/* Bowl Outer Shadow */}
        <circle cx="44" cy="48" r="42" fill="#0E0C0A" opacity="0.6" filter="blur(4px)" />
        {/* Steel Bowl Rim */}
        <circle cx="42" cy="44" r="40" fill="#90A4AE" />
        <circle cx="42" cy="44" r="37" fill="#CFD8DC" />
        <circle cx="42" cy="44" r="35" fill="#ECEFF1" />
        <circle cx="42" cy="44" r="32" fill="#78909C" />
        {/* Dal Tadka Soup Surface */}
        <circle cx="42" cy="44" r="30" fill="#FBC02D" />
        <ellipse cx="42" cy="43" rx="28" ry="27" fill="#FDD835" />

        {/* Tadka Ghee swirl & Red Chili flakes */}
        <path d="M32 40 Q44 32 48 44 T54 50" stroke="#E65100" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        <circle cx="38" cy="38" r="2" fill="#D50000" />
        <circle cx="45" cy="46" r="2.2" fill="#B71C1C" />
        <circle cx="48" cy="36" r="1.8" fill="#BF360C" />
        {/* Cumin / Mustard seeds */}
        <ellipse cx="36" cy="46" rx="2" ry="1" transform="rotate(30 36 46)" fill="#3E2723" />
        <ellipse cx="42" cy="50" rx="2" ry="1" transform="rotate(-20 42 50)" fill="#3E2723" />
        <ellipse cx="50" cy="42" rx="2" ry="1" transform="rotate(45 50 42)" fill="#3E2723" />
        {/* Coriander leaf on Dal */}
        <circle cx="42" cy="40" r="2" fill="#2E7D32" />

        {/* Dal Steam */}
        <path d="M42 22 C40 15 44 10 42 5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// Volunteer Delivery Rider on Green Scooter with Food Delivery Box (Screen 3)
export function DeliveryRiderIllustration({ width = 160, height = 150 }) {
  return (
    <svg viewBox="0 0 200 180" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Soft Green Circle */}
      <circle cx="100" cy="90" r="76" fill="#E8F5E9" />
      <circle cx="100" cy="90" r="70" fill="#F1F8E9" />

      {/* Ground Shadow */}
      <ellipse cx="100" cy="154" rx="60" ry="8" fill="#C8E6C9" opacity="0.6" />

      {/* Scooter Rear Wheel */}
      <circle cx="56" cy="142" r="16" fill="#212121" />
      <circle cx="56" cy="142" r="10" fill="#90A4AE" />
      <circle cx="56" cy="142" r="4" fill="#CFD8DC" />

      {/* Scooter Front Wheel */}
      <circle cx="146" cy="142" r="16" fill="#212121" />
      <circle cx="146" cy="142" r="10" fill="#90A4AE" />
      <circle cx="146" cy="142" r="4" fill="#CFD8DC" />

      {/* Scooter Body & Frame */}
      {/* Footrest Floorboard */}
      <path d="M72 138 L126 138 C128 138 130 136 130 134 L132 120 L70 120 L72 138 Z" fill="#2E7D32" />
      {/* Front Fork & Steering Column */}
      <path d="M128 120 L140 85 L144 85 L132 120 Z" fill="#388E3C" />
      {/* Front Shield Apron */}
      <path d="M136 90 L152 110 C154 114 154 122 150 128 L142 134 L132 100 Z" fill="#43A047" />
      {/* Headlight */}
      <ellipse cx="147" cy="85" rx="5" ry="6" fill="#FFF59D" />
      {/* Handlebar */}
      <path d="M136 78 L148 83" stroke="#263238" strokeWidth="4" strokeLinecap="round" />

      {/* Scooter Seat */}
      <path d="M68 116 C68 112 72 108 78 108 L108 108 C112 108 114 112 114 116 L68 116 Z" fill="#263238" />

      {/* Orange Food Delivery Box mounted on back rack */}
      <rect x="36" y="94" width="34" height="34" rx="6" fill="#FF9800" />
      <rect x="34" y="92" width="38" height="6" rx="3" fill="#F57C00" />
      {/* Box Emblem (White Bowl) */}
      <circle cx="53" cy="113" r="10" fill="#FFE0B2" />
      <path d="M48 113 C48 117 58 117 58 113 Z" fill="#E65100" />
      <circle cx="53" cy="110" r="2" fill="#E65100" />

      {/* Delivery Rider */}
      {/* Legs & Pants */}
      <path d="M96 114 L112 134 L122 134" stroke="#1B5E20" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Shoes */}
      <ellipse cx="125" cy="136" rx="6" ry="3.5" fill="#263238" />

      {/* Torso & Green Jacket */}
      <path d="M90 92 L106 88 C110 88 114 92 112 98 L104 116 L88 114 Z" fill="#2E7D32" />
      {/* Arm steering handlebar */}
      <path d="M102 92 L128 92 L142 84" stroke="#388E3C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Hand on grip */}
      <circle cx="142" cy="84" r="4" fill="#FFCC80" />

      {/* Neck & Face */}
      <rect x="104" y="74" width="6" height="8" fill="#FFCC80" />
      <circle cx="112" cy="72" r="8" fill="#FFCC80" />

      {/* Green Safety Helmet */}
      <path d="M104 68 C104 60 112 56 120 60 C124 62 126 66 126 70 L108 72 Z" fill="#1B5E20" />
      {/* Helmet Visor */}
      <path d="M118 68 L127 68 C128 68 129 70 128 72 L120 74 Z" fill="#424242" />

      {/* Speed Trails */}
      <line x1="22" y1="110" x2="32" y2="110" stroke="#81C784" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="120" x2="30" y2="120" stroke="#81C784" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="130" x2="34" y2="130" stroke="#81C784" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
