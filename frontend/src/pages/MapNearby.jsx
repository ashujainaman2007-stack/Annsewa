import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import AnnsewaLogo from '../components/AnnsewaLogo'
import NotificationBell from '../components/NotificationBell'
import { 
  FiBell, 
  FiSearch, 
  FiNavigation, 
  FiStar, 
  FiMapPin, 
  FiPhone, 
  FiSend, 
  FiPlus, 
  FiMinus, 
  FiClock, 
  FiCheck,
  FiX
} from 'react-icons/fi'
import { getNearbyNGOs, getDonations } from '../services/api'
import './MapNearby.css'

const filters = ['All', 'Donations', 'NGOs', 'Volunteers']

const DEFAULT_NGOS = [
  {
    id: 1,
    name: 'Seva Foundation',
    type: 'ngo',
    rating: 4.8,
    reviews_count: 120,
    distance_label: '2.4 km away',
    distance_km: 2.4,
    area: 'Vijay Nagar, Indore',
    phone: '+91 98765 43210',
    address: 'Plot 12, Scheme 54, Vijay Nagar, Indore',
    lat: 22.7533,
    lng: 75.8937,
    verified: true
  },
  {
    id: 2,
    name: 'Food For All Trust',
    type: 'ngo',
    rating: 4.2,
    reviews_count: 89,
    distance_label: '3.1 km away',
    distance_km: 3.1,
    area: 'Bhawarkua, Indore',
    phone: '+91 98111 22334',
    address: 'Bhawarkua Main Rd, Indore',
    lat: 22.7196,
    lng: 75.8577,
    verified: true
  },
  {
    id: 3,
    name: 'Robin Hood Army Indore',
    type: 'ngo',
    rating: 4.9,
    reviews_count: 210,
    distance_label: '1.8 km away',
    distance_km: 1.8,
    area: 'Palasia Square, Indore',
    phone: '+91 98222 33445',
    address: 'Palasia Square, AB Road, Indore',
    lat: 22.7244,
    lng: 75.8839,
    verified: true
  },
  {
    id: 4,
    name: 'Annapurna Seva Sansthan',
    type: 'ngo',
    rating: 4.7,
    reviews_count: 154,
    distance_label: '2.9 km away',
    distance_km: 2.9,
    area: 'Manoramaganj, Indore',
    phone: '+91 98333 44556',
    address: 'Geeta Bhavan Rd, Manoramaganj, Indore',
    lat: 22.7180,
    lng: 75.8790,
    verified: true
  },
  {
    id: 5,
    name: 'Roti Bank Indore',
    type: 'ngo',
    rating: 4.6,
    reviews_count: 98,
    distance_label: '3.5 km away',
    distance_km: 3.5,
    area: 'Rajwada, Indore',
    phone: '+91 98444 55667',
    address: 'Rajwada Circle, M.G. Road, Indore',
    lat: 22.7198,
    lng: 75.8550,
    verified: true
  }
]

const DEFAULT_DONATIONS = [
  {
    id: 101,
    name: 'Vegetable Pulao & Dal',
    type: 'donation',
    donor: 'AITR Canteen',
    servings: 50,
    food_type: 'Vegetarian',
    safe_until: 'Today, 8:00 PM',
    distance_label: '0.4 km',
    lat: 22.7680,
    lng: 75.8850,
    status: 'Available'
  },
  {
    id: 102,
    name: 'Roti & Sabzi',
    type: 'donation',
    donor: 'Hostel Mess Block B',
    servings: 30,
    food_type: 'Vegetarian',
    safe_until: 'Today, 9:00 PM',
    distance_label: '0.8 km',
    lat: 22.7620,
    lng: 75.8750,
    status: 'Available'
  },
  {
    id: 103,
    name: 'Bread & Snacks',
    type: 'donation',
    donor: 'Campus Café',
    servings: 30,
    food_type: 'Vegetarian',
    safe_until: 'Today, 9:00 PM',
    distance_label: '1.2 km',
    lat: 22.7450,
    lng: 75.9050,
    status: 'Picked Up'
  },
  {
    id: 104,
    name: 'Rice & Curry',
    type: 'donation',
    donor: 'South Campus Dining',
    servings: 40,
    food_type: 'Vegetarian',
    safe_until: 'Today, 10:00 PM',
    distance_label: '1.9 km',
    lat: 22.7350,
    lng: 75.8650,
    status: 'Available'
  }
]

const DEFAULT_VOLUNTEERS = [
  {
    id: 201,
    name: 'Aman Jain (Volunteer Fleet)',
    type: 'volunteer',
    status: 'En Route to AITR',
    vehicle: 'Electric Delivery Van',
    phone: '+91 98765 00001',
    distance_label: '1.1 km',
    lat: 22.7580,
    lng: 75.8900
  }
]

export default function MapNearby() {
  const navigate = useNavigate()
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersLayerRef = useRef(null)

  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(DEFAULT_NGOS[0])
  const [isLocating, setIsLocating] = useState(false)
  const [mapNotice, setMapNotice] = useState(null)

  const [ngosList, setNgosList] = useState(DEFAULT_NGOS)
  const [donationsList, setDonationsList] = useState(DEFAULT_DONATIONS)

  // Fetch backend data if available, fallback to defaults
  useEffect(() => {
    getNearbyNGOs()
      .then((res) => {
        if (res && res.ngos && res.ngos.length > 0) {
          const formattedNgos = res.ngos.map((ngo, idx) => ({
            ...ngo,
            type: 'ngo',
            lat: ngo.latitude || (DEFAULT_NGOS[idx]?.lat || 22.7533),
            lng: ngo.longitude || (DEFAULT_NGOS[idx]?.lng || 75.8937),
            distance_label: ngo.distance_label || `${ngo.distance_km || 2.4} km away`,
            area: ngo.address || DEFAULT_NGOS[idx]?.area || 'Indore, MP',
            verified: true
          }))
          // Merge with default list for rich variety
          const merged = [...formattedNgos]
          DEFAULT_NGOS.forEach(d => {
            if (!merged.find(m => m.name.toLowerCase() === d.name.toLowerCase())) {
              merged.push(d)
            }
          })
          setNgosList(merged)
          setSelectedItem(merged[0])
        }
      })
      .catch((err) => console.warn('Using default NGOs for map:', err))

    getDonations()
      .then((res) => {
        if (res && res.donations && res.donations.length > 0) {
          const formattedDonations = res.donations.map((d, idx) => ({
            id: d.id,
            name: d.food_name,
            type: 'donation',
            donor: d.donor_name || 'Campus Food Source',
            servings: d.quantity || 30,
            food_type: d.food_type === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian',
            safe_until: d.safe_until || 'Today, 8:00 PM',
            distance_label: `${(0.4 + idx * 0.4).toFixed(1)} km`,
            lat: d.latitude || (22.7680 - idx * 0.008),
            lng: d.longitude || (75.8850 + idx * 0.006),
            status: d.status || 'Available'
          }))
          setDonationsList(formattedDonations)
        }
      })
      .catch((err) => console.warn('Using default donations for map:', err))
  }, [])

  // Initialize Leaflet Live Map instance
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.7533, 75.8937],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map)

      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('© CARTO & OpenStreetMap')
        .addTo(map)

      const markersLayer = L.layerGroup().addTo(map)
      markersLayerRef.current = markersLayer
      mapInstanceRef.current = map

      setTimeout(() => {
        map.invalidateSize()
      }, 250)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Refresh markers on filter, search, or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current
    const layer = markersLayerRef.current
    if (!map || !layer) return

    layer.clearLayers()

    // 1. Current User / Campus Pulse Marker
    const userMarkerIcon = L.divIcon({
      className: 'user-marker-container',
      html: `
        <div class="user-pulse-bubble" title="Your Current Location">
          <div class="user-pulse-wave"></div>
          <div class="user-center-point"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    })
    L.marker([22.7590, 75.8880], { icon: userMarkerIcon }).addTo(layer)

    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = (text) => !query || (text && text.toLowerCase().includes(query))

    // 2. Add NGO Markers (if filter allows)
    if (activeFilter === 'All' || activeFilter === 'NGOs') {
      ngosList
        .filter((ngo) => matchesSearch(ngo.name) || matchesSearch(ngo.address) || matchesSearch(ngo.area))
        .forEach((ngo) => {
          const isSelected = selectedItem?.id === ngo.id && selectedItem?.type === 'ngo'

          const ngoIcon = L.divIcon({
            className: 'ngo-marker-container',
            html: `
              <div class="custom-ngo-pin ${isSelected ? 'active-selection' : ''}">
                <div class="marker-speech-bubble">
                  <span class="bubble-title">${ngo.name}</span>
                  <span class="bubble-distance">${ngo.distance_label}</span>
                </div>
                <div class="ngo-pin-head">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4">
                    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                    <line x1="9" y1="6" x2="9" y2="6.01"></line>
                    <line x1="15" y1="6" x2="15" y2="6.01"></line>
                    <line x1="9" y1="10" x2="9" y2="10.01"></line>
                    <line x1="15" y1="10" x2="15" y2="10.01"></line>
                    <path d="M9 18h6"></path>
                  </svg>
                </div>
                <div class="ngo-pin-arrow"></div>
              </div>
            `,
            iconSize: [120, 58],
            iconAnchor: [60, 56]
          })

          const marker = L.marker([ngo.lat, ngo.lng], { icon: ngoIcon }).addTo(layer)
          marker.on('click', () => {
            setSelectedItem(ngo)
            map.panTo([ngo.lat, ngo.lng], { animate: true })
          })
        })
    }

    // 3. Add Donation Markers (if filter allows)
    if (activeFilter === 'All' || activeFilter === 'Donations') {
      donationsList
        .filter((d) => matchesSearch(d.name) || matchesSearch(d.donor))
        .forEach((donation) => {
          const isSelected = selectedItem?.id === donation.id && selectedItem?.type === 'donation'

          const donationIcon = L.divIcon({
            className: 'donation-marker-container',
            html: `
              <div class="custom-donation-pin ${isSelected ? 'active-selection' : ''}" title="${donation.name}">
                <div class="donation-pin-pulse"></div>
                <div class="donation-pin-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M3 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-16zm15-2c0-.5-.4-1-1-1H4c-.6 0-1 .5-1 1s.4 1 1 1h13c.6 0 1-.5 1-1z"></path>
                    <path d="M12 3c-1.5 1.5-2 3.5-2 5h4c0-1.5-.5-3.5-2-5z" fill="#C8E6C9"></path>
                  </svg>
                </div>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          })

          const marker = L.marker([donation.lat, donation.lng], { icon: donationIcon }).addTo(layer)
          marker.on('click', () => {
            setSelectedItem(donation)
            map.panTo([donation.lat, donation.lng], { animate: true })
          })
        })
    }

    // 4. Add Volunteer Markers (if filter allows)
    if (activeFilter === 'All' || activeFilter === 'Volunteers') {
      DEFAULT_VOLUNTEERS
        .filter((vol) => matchesSearch(vol.name) || matchesSearch(vol.vehicle))
        .forEach((vol) => {
          const isSelected = selectedItem?.id === vol.id && selectedItem?.type === 'volunteer'

          const volIcon = L.divIcon({
            className: 'vol-marker-container',
            html: `
              <div class="custom-volunteer-pin ${isSelected ? 'active-selection' : ''}" title="${vol.name}">
                <div class="vol-pin-badge">
                  <span class="vol-emoji">🚚</span>
                </div>
              </div>
            `,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
          })

          const marker = L.marker([vol.lat, vol.lng], { icon: volIcon }).addTo(layer)
          marker.on('click', () => {
            setSelectedItem(vol)
            map.panTo([vol.lat, vol.lng], { animate: true })
          })
        })
    }
  }, [activeFilter, searchQuery, selectedItem, ngosList, donationsList])

  // Custom Zoom Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  // Handle GPS Locate Me
  const handleLocateMe = () => {
    setIsLocating(true)
    setMapNotice('Locating your GPS position...')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false)
          const { latitude, longitude } = pos.coords
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.2 })
          }
          setMapNotice('📍 Location found!')
          setTimeout(() => setMapNotice(null), 2500)
        },
        () => {
          setIsLocating(false)
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([22.7533, 75.8937], 14, { duration: 1.0 })
          }
          setMapNotice('📍 Centered on Campus Hub')
          setTimeout(() => setMapNotice(null), 2500)
        },
        { timeout: 4000 }
      )
    } else {
      setIsLocating(false)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([22.7533, 75.8937], 14, { duration: 1.0 })
      }
      setMapNotice('📍 Centered on Campus Hub')
      setTimeout(() => setMapNotice(null), 2500)
    }
  }

  // Handle clicking an NGO item in the list
  const handleNgoCardClick = (ngo) => {
    setSelectedItem(ngo)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([ngo.lat, ngo.lng], 15, { duration: 1.0 })
    }
    setMapNotice(`📍 Focused on ${ngo.name}`)
    setTimeout(() => setMapNotice(null), 2500)
  }

  // Filtered NGOs for list view
  const query = searchQuery.trim().toLowerCase()
  const filteredNgos = ngosList.filter(ngo => 
    !query || 
    ngo.name.toLowerCase().includes(query) || 
    (ngo.area && ngo.area.toLowerCase().includes(query)) ||
    (ngo.address && ngo.address.toLowerCase().includes(query))
  )

  return (
    <div className="map-page-container">
      {/* 1. TOP GREEN GRADIENT HEADER */}
      <div className="map-top-green-header">
        <StatusBar dark={true} />

        <div className="map-brand-header-row">
          <AnnsewaLogo size={34} variant="white" showText={true} showTagline={true} />
          <NotificationBell />
        </div>
      </div>

      {/* 2. SEARCH BAR & FILTER CHIPS */}
      <div className="map-search-filter-section">
        <div className="map-search-bar">
          <FiSearch size={16} color="#757575" />
          <input
            type="text"
            className="search-input"
            placeholder="Search nearby donations, NGOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <FiX size={14} color="#757575" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="map-filter-chips-row">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SCROLLABLE BODY CONTAINING LIVE MAP & LIST OF NEARBY NGOS */}
      <div className="map-scroll-body">
        {/* Live Interactive Map Canvas */}
        <div className="live-map-wrapper">
          <div 
            ref={mapContainerRef} 
            className="leaflet-live-map-canvas"
          />

          {/* Top-Left Live Status Badge */}
          <div className="live-map-status-pill">
            <span className="status-live-dot"></span>
            <span className="status-live-text">Live Radar</span>
          </div>

          {/* Map Floating Controls (+, -, Locate) */}
          <div className="map-floating-controls">
            <button 
              type="button" 
              className="map-ctrl-btn zoom-in" 
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <FiPlus size={16} />
            </button>
            <button 
              type="button" 
              className="map-ctrl-btn zoom-out" 
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <FiMinus size={16} />
            </button>
            <button
              type="button"
              className={`map-ctrl-btn locate-me ${isLocating ? 'locating' : ''}`}
              onClick={handleLocateMe}
              title="Locate Me"
            >
              <FiNavigation size={15} color="#2E7D32" />
            </button>
          </div>

          {/* Temporary Notice Toast */}
          {mapNotice && (
            <div className="map-notice-pill">
              <span>{mapNotice}</span>
            </div>
          )}
        </div>

        {/* Highlighted Selected Non-NGO Entity (if Donation or Volunteer was clicked on map) */}
        {selectedItem?.type === 'donation' && (
          <div className="map-selected-entity-callout">
            <div className="callout-header-row">
              <span className="callout-entity-tag">Selected Food Donation</span>
              <button 
                type="button" 
                className="callout-close-btn"
                onClick={() => setSelectedItem(ngosList[0])}
              >
                ✕
              </button>
            </div>
            <div className="ngo-map-action-card donation-card-highlight">
              <div className="ngo-info-block">
                <div className="donation-card-icon-box">🍲</div>
                <div className="ngo-text-meta">
                  <h4 className="ngo-name-text">{selectedItem.name}</h4>
                  <div className="ngo-rating-distance">
                    <span className="donation-servings-pill">{selectedItem.servings} Servings</span>
                    <span className="dist-sep">•</span>
                    <span className="dist-val">📍 {selectedItem.distance_label}</span>
                  </div>
                  <p className="donation-safe-timer">
                    <FiClock size={11} color="#D32F2F" />
                    <span>Safe Until: <strong style={{ color: '#D32F2F' }}>{selectedItem.safe_until}</strong></span>
                  </p>
                </div>
              </div>
              <div className="ngo-quick-circle-actions">
                <button 
                  type="button" 
                  className="claim-quick-btn"
                  onClick={() => navigate(`/donation-details/${selectedItem.id}`)}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedItem?.type === 'volunteer' && (
          <div className="map-selected-entity-callout">
            <div className="callout-header-row">
              <span className="callout-entity-tag">Selected Active Volunteer</span>
              <button 
                type="button" 
                className="callout-close-btn"
                onClick={() => setSelectedItem(ngosList[0])}
              >
                ✕
              </button>
            </div>
            <div className="ngo-map-action-card">
              <div className="ngo-info-block">
                <div className="vol-card-icon-box">🚚</div>
                <div className="ngo-text-meta">
                  <h4 className="ngo-name-text">{selectedItem.name}</h4>
                  <div className="ngo-rating-distance">
                    <span className="rating-val" style={{ color: '#E65100' }}>⚡ {selectedItem.status}</span>
                    <span className="dist-sep">•</span>
                    <span className="dist-val">📍 {selectedItem.distance_label}</span>
                  </div>
                  <p className="donation-safe-timer">Vehicle: {selectedItem.vehicle}</p>
                </div>
              </div>
              <div className="ngo-quick-circle-actions">
                <a 
                  href={`tel:${selectedItem.phone}`}
                  className="ngo-circle-btn call-btn" 
                  title="Call Volunteer"
                >
                  <FiPhone size={15} color="#2E7D32" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 4. FULL LIST OF NEARBY NGOS */}
        <div className="map-bottom-container">
          <div className="nearby-ngos-header-row">
            <div className="ngos-count-group">
              <h3 className="nearby-ngos-title">Nearby NGOs</h3>
              <span className="ngos-count-badge">{filteredNgos.length} Listed</span>
            </div>
            <button 
              type="button" 
              className="view-all-link"
              onClick={() => navigate('/ngo-dashboard')}
            >
              View All →
            </button>
          </div>

          {/* Full List of Nearby NGO Cards */}
          <div className="nearby-ngos-feed-list">
            {filteredNgos.length === 0 ? (
              <div className="ngos-empty-feed">
                <p>No NGOs found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredNgos.map((ngo) => {
                const isSelected = selectedItem?.id === ngo.id && selectedItem?.type === 'ngo'
                return (
                  <div 
                    key={ngo.id} 
                    className={`ngo-map-action-card ${isSelected ? 'selected-ngo-card' : ''}`}
                    onClick={() => handleNgoCardClick(ngo)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ngo-info-block">
                      <div className="ngo-logo-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <line x1="9" y1="6" x2="9" y2="6.01" />
                          <line x1="15" y1="6" x2="15" y2="6.01" />
                          <line x1="9" y1="10" x2="9" y2="10.01" />
                          <line x1="15" y1="10" x2="15" y2="10.01" />
                          <path d="M9 18h6" />
                        </svg>
                      </div>

                      <div className="ngo-text-meta">
                        <div className="ngo-name-row">
                          <h4 className="ngo-name-text">{ngo.name}</h4>
                          {ngo.verified && (
                            <span className="ngo-mini-verified-badge" title="Verified NGO">
                              <FiCheck size={10} color="#FFFFFF" strokeWidth={3.5} />
                            </span>
                          )}
                        </div>

                        <div className="ngo-rating-distance">
                          <div className="rating-pill">
                            <FiStar size={12} fill="#FFA000" color="#FFA000" />
                            <span className="rating-val">{ngo.rating}</span>
                            <span className="reviews-cnt">({ngo.reviews_count})</span>
                          </div>
                          <span className="dist-sep">•</span>
                          <span className="dist-val">📍 {ngo.distance_label}</span>
                        </div>

                        <p className="ngo-area-location-text">
                          {ngo.area || ngo.address}
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Icons: Call & Focus/Directions */}
                    <div className="ngo-quick-circle-actions" onClick={(e) => e.stopPropagation()}>
                      <a 
                        href={`tel:${ngo.phone}`} 
                        className="ngo-circle-btn call-btn" 
                        title="Call NGO"
                      >
                        <FiPhone size={15} color="#2E7D32" />
                      </a>
                      <button 
                        type="button" 
                        className="ngo-circle-btn navigate-btn" 
                        title="Focus on Map & View NGO"
                        onClick={() => handleNgoCardClick(ngo)}
                      >
                        <FiSend size={15} color="#2E7D32" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Persistent 5-Tab Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
