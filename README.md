# 🥗 Annsewa – Food Donation & Redistribution Platform

<p align="center">
  <strong>Reducing Food Waste. Feeding Communities. Connecting People.</strong>
</p>

<p align="center">
  A technology-driven platform connecting food donors, NGOs, and volunteers to make surplus food redistribution faster, easier, and more accessible.
</p>

---

## 🌟 Overview

**Annsewa** is a food donation and redistribution platform designed to bridge the gap between surplus food providers and people who need food.

The platform connects three major participants:

- **Donors:** Individuals, restaurants, canteens, and organizations that have surplus food.
- **NGOs:** Organizations that discover and claim available food donations.
- **Volunteers:** People who help coordinate food pickup and delivery.

Annsewa aims to reduce food wastage by creating a centralized system where food donations can be listed, discovered, claimed, tracked, and delivered.

---

## ✨ Key Features

### 🍱 Food Donation Management
- Create and publish food donation listings.
- Add food name, quantity, category, pickup location, and expiry time.
- Manage donation availability and claim status.
- Notify nearby NGOs when new food becomes available.

### 🏢 NGO Dashboard
- Discover available food donations.
- View donation details.
- Claim food donations.
- Track donation status.

### 🚚 Volunteer Management
- Dedicated volunteer dashboard.
- Browse available pickup tasks.
- Claim volunteer tasks.
- Track pickup and delivery progress.

### 🗺️ Interactive Map
- Map-based location discovery using Leaflet.
- View nearby NGOs, donations, and volunteers.
- Search and filter locations.
- GPS-based current location functionality.

### 🔔 Notification System
- Food availability notifications.
- Donation claim notifications.
- Unread notification tracking.
- Notification alerts for relevant participants.

### 📊 Impact Dashboard
- View food donation impact.
- Track weekly and monthly impact metrics.
- Monitor completed donation activities.

### 📦 Donation Tracking
- Track donations through multiple stages:
  1. Donation Listed
  2. Claimed by NGO
  3. Volunteer Assigned
  4. Picked Up
  5. Delivered

---

## 🛠️ Technology Stack

### Frontend
- React.js 18
- Vite
- React Router DOM
- Leaflet
- Lucide React
- React Icons
- CSS

### Backend
- Python
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- Werkzeug

### Database
- SQLite

### Development Tools
- Visual Studio Code / Antigravity
- Git
- GitHub
- npm
- Python

---

## 📁 Project Structure

```text
Annsewa/
│
├── backend/
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── donation_routes.py
│   │   ├── ngo_routes.py
│   │   ├── volunteer_routes.py
│   │   ├── tracking_routes.py
│   │   ├── impact_routes.py
│   │   └── notification_routes.py
│   │
│   ├── models/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   └── annsewa.db
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── 01.py
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these instructions to run Annsewa locally.

### Prerequisites

Make sure you have installed:

- Python 3.9 or above
- Node.js and npm
- Git
- Visual Studio Code or Antigravity

### 1. Clone the Repository

```bash
git clone https://github.com/ashujainaman2007-stack/Annsewa.git
```

Navigate to the project directory:

```bash
cd Annsewa
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask backend:

```bash
python app.py
```

The backend will run at:

```text
http://127.0.0.1:5000
```

### 3. Frontend Setup

Open a second terminal and navigate to the frontend directory:

```bash
cd Annsewa/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

The Vite development server proxies `/api` requests to the Flask backend on port 5000.

---

## 🔗 API Endpoints

The backend provides REST API endpoints for different application modules.

| Module | Endpoint | Method |
|---|---|---|
| Health | `/api/health` | GET |
| User Profile | `/api/auth/profile` | GET, PUT |
| Donations | `/api/donations` | GET, POST |
| Available Donations | `/api/donations/available` | GET |
| Donation Details | `/api/donations/:id` | GET |
| Claim Donation | `/api/donations/:id/claim` | POST |
| NGOs | `/api/ngos` | GET |
| Nearby NGOs | `/api/ngos/nearby` | GET |
| NGO Statistics | `/api/ngos/stats` | GET |
| Volunteer Tasks | `/api/volunteers/tasks` | GET |
| Claim Volunteer Task | `/api/volunteers/tasks/:id/claim` | POST |
| Volunteer Statistics | `/api/volunteers/stats` | GET |
| Donation Tracking | `/api/tracking/:id` | GET |
| Impact Statistics | `/api/impact` | GET |
| Weekly Impact | `/api/impact/weekly` | GET |
| Monthly Impact | `/api/impact/monthly` | GET |
| Notifications | `/api/notifications` | GET |
| Broadcast Food Alert | `/api/notifications/broadcast-food` | POST |

---

## 🗄️ Database

Annsewa uses **SQLite** with Flask-SQLAlchemy for database management.

The database stores application information related to:

- Food donations
- Donors
- NGOs
- Volunteers
- Donation tracking
- Notifications
- Impact statistics

The backend also includes an initial database seeding mechanism when the SQLite database file does not exist.

---

## 🔄 Application Workflow

```text
       FOOD DONOR
           |
           v
    Create Food Donation
           |
           v
     Donation Listed
           |
           v
   Nearby NGOs Notified
           |
           v
       NGO Claims
           |
           v
   Volunteer Assigned
           |
           v
       Food Pickup
           |
           v
       Delivered
           |
           v
     IMPACT TRACKED
```

---

## 🚧 Current Development Status

Annsewa is an actively developed hackathon project.

- Frontend and backend integration.
- SQLite database integration.
- Donor, NGO, and volunteer workflows.
- Food donation creation and claiming.
- Interactive map functionality.
- Donation tracking workflow.
- Notification and impact dashboards.

**Development note:** A complete user authentication and authorization system is not yet implemented. Some frontend experiences also use local fallback or sample data when backend data is unavailable.

---

## 🔮 Future Improvements

- Secure user authentication and role-based authorization.
- NGO and donor verification.
- Real-time location tracking.
- Advanced food availability matching.
- Improved notification delivery.
- Food safety and expiry monitoring.
- Deployment and production database integration.

---

## 🎯 Our Mission

We believe that surplus food should not go to waste when someone else can benefit from it.

Annsewa aims to use technology to connect donors, NGOs, and volunteers and create a more efficient food redistribution ecosystem.

**Save Food. Share Hope. Make an Impact.**

---

## 👨‍💻 Project Information

**Project Name:** Annsewa

**Project Category:** Social Impact / Food Redistribution

**Developed For:** Hackathon Project

**GitHub Repository:**  
https://github.com/ashujainaman2007-stack/Annsewa

---

⭐ If you find Annsewa useful, consider giving this repository a star!

