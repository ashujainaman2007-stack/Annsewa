import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import MobileFrame from './components/MobileFrame'
import SplashScreen from './pages/SplashScreen'
import Onboarding from './pages/Onboarding'
import RoleSelection from './pages/RoleSelection'
import HomeDashboard from './pages/HomeDashboard'
import CreateDonation from './pages/CreateDonation'
import NGODashboard from './pages/NGODashboard'
import DonationDetails from './pages/DonationDetails'
import ClaimDonationMethod from './pages/ClaimDonationMethod'
import TrackDonation from './pages/TrackDonation'
import VolunteerDashboard from './pages/VolunteerDashboard'
import VolunteerTaskDetails from './pages/VolunteerTaskDetails'
import VolunteerConfirmTask from './pages/VolunteerConfirmTask'
import VolunteerActiveTask from './pages/VolunteerActiveTask'
import VolunteerTaskCompleted from './pages/VolunteerTaskCompleted'
import MapNearby from './pages/MapNearby'
import ImpactDashboard from './pages/ImpactDashboard'
import ActivityScreen from './pages/ActivityScreen'
import ProfileScreen from './pages/ProfileScreen'

function App() {
  return (
    <Router>
      <NotificationProvider>
        <MobileFrame>
          <Routes>
          {/* Splash & Auth/Onboarding Flow */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* 5 Core Bottom Navigation Tabs from Design */}
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/map" element={<MapNearby />} />
          <Route path="/create-donation" element={<CreateDonation />} />
          <Route path="/donate" element={<CreateDonation />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />

          {/* 4-Step Claim Donation Flow for NGOs */}
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/available-donations" element={<NGODashboard />} />
          <Route path="/donation-details/:id" element={<DonationDetails />} />
          <Route path="/donation-details" element={<DonationDetails />} />
          <Route path="/claim-donation/:id" element={<ClaimDonationMethod />} />
          <Route path="/claim-donation" element={<ClaimDonationMethod />} />
          <Route path="/track-donation/:id" element={<TrackDonation />} />
          <Route path="/track-donation" element={<TrackDonation />} />
          <Route path="/donation-tracking" element={<TrackDonation />} />

          {/* 5-Step Claim Task Workflow for Volunteers */}
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer-task-details/:id" element={<VolunteerTaskDetails />} />
          <Route path="/volunteer-task-details" element={<VolunteerTaskDetails />} />
          <Route path="/volunteer-confirm-task/:id" element={<VolunteerConfirmTask />} />
          <Route path="/volunteer-confirm-task" element={<VolunteerConfirmTask />} />
          <Route path="/volunteer-active-task/:id" element={<VolunteerActiveTask />} />
          <Route path="/volunteer-active-task" element={<VolunteerActiveTask />} />
          <Route path="/volunteer-task-completed/:id" element={<VolunteerTaskCompleted />} />
          <Route path="/volunteer-task-completed" element={<VolunteerTaskCompleted />} />

          {/* Impact Screen */}
          <Route path="/impact" element={<ImpactDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        </MobileFrame>
      </NotificationProvider>
    </Router>
  )
}

export default App
