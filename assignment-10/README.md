# Assignment 10 – Admin & Employee Portal with Redux

An enhanced React-based job portal built on top of Assignment 9, implementing role-based access control using Redux for state management. Admins manage employees and job postings, while employees browse job listings.

---

## Project Setup

### Prerequisites
- Node.js (v16+)
- The Assignment 8 backend running on `http://localhost:5050`

### Installation
```bash
# 1. Navigate into the project folder
cd assignment-10

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Edit .env with your backend URL:
# REACT_APP_API_URL=http://localhost:5050

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**.

---

## Folder Structure
```
assignment-10/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CompanyCard/
│   │   │   └── CompanyCard.js
│   │   ├── JobCard/
│   │   │   └── JobCard.js
│   │   ├── Navbar/
│   │   │   └── Navbar.js          # Role-aware navbar
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js         # Auth context using Redux
│   ├── data/
│   │   └── jobPosts.js
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AdminEmployees.js  # Admin-only employees table
│   │   │   └── AddJob.js          # Admin-only add job form
│   │   ├── About/
│   │   │   └── About.js
│   │   ├── CompanyShowcase/
│   │   │   └── CompanyShowcase.js
│   │   ├── Contact/
│   │   │   └── Contact.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── JobListings/
│   │   │   └── JobListings.js     # Fetches jobs from API
│   │   └── Login/
│   │       └── Login.js
│   ├── store/
│   │   ├── authSlice.js           # Redux auth state
│   │   ├── jobSlice.js            # Redux jobs state
│   │   └── store.js               # Redux store
│   ├── App.js                     # Role-based routing
│   └── index.js                   # Redux Provider setup
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Navigation

### Admin Routes
| Path | Page | Description |
|------|------|-------------|
| `/admin/employees` | Employees | Table of all users |
| `/admin/add-job` | Add Job | Form to create job listings |

### Employee Routes
| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page |
| `/about` | About | About page |
| `/jobs` | Job Listings | Jobs fetched from API |
| `/companies` | Company Showcase | Company images from backend |
| `/contact` | Contact | Contact form |

---

## Key Functionalities

### 1. Redux State Management
- `authSlice` — manages login/logout, stores user in `sessionStorage`
- `jobSlice` — manages job listings and employee data with loading/error states
- All API data flows through Redux — no local component state for data

### 2. Role-Based Routing
- Login response includes `type` field (`admin` or `employee`)
- `App.js` reads user type from Redux store and renders different route sets
- Admins can ONLY access admin pages
- Employees can ONLY access employee pages
- Unauthenticated users are redirected to `/login`

### 3. Admin Portal
- **Dark navbar** labeled "Admin Portal"
- **Employees page** — fetches all users via `GET /user/getAll`, displays in a MUI table with color-coded type chips
- **Add Job page** — form that posts to `POST /user/create/job`, updates Redux store on success

### 4. Employee Portal
- **Job Listings** — fetches jobs from `GET /user/jobs` API (jobs created by admin)
- All Assignment 9 pages available (Home, About, Companies, Contact)

### 5. Login & Session
- Only `@northeastern.edu` emails are allowed
- Session stored in `sessionStorage` — persists on refresh, clears on tab close
- Logout clears Redux state and sessionStorage

---

## Backend API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/user/login` | Authenticate user, returns type |
| GET | `/user/getAll` | Fetch all users (admin only) |
| POST | `/user/create/job` | Create a new job (admin only) |
| GET | `/user/jobs` | Fetch all jobs (employee only) |
| GET | `/images/:file` | Serve company images |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5050` | Base URL for the backend API |

---

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@northeastern.edu | Admin@1234 |
| Employee | employee@northeastern.edu | Employee@1234 |