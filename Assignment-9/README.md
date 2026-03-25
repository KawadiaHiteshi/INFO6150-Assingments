# Assignment 9 – React Job Portal

A React-based job portal that connects to the Node.js backend from Assignment 8. Built with **React**, **React Router v6**, **Material UI**, and **Axios**.

---

## Project Setup

### Prerequisites
- Node.js (v16+)
- The Assignment 8 backend running on `http://localhost:5000`

### Installation

```bash
# 1. Clone / navigate into the project folder
cd assignment-9

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Edit .env if your backend runs on a different port

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**.

---

## Folder Structure

```
assignment-9/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CompanyCard/
│   │   │   └── CompanyCard.js        # Card for company images
│   │   ├── JobCard/
│   │   │   └── JobCard.js            # Card for job listings
│   │   ├── Navbar/
│   │   │   └── Navbar.js             # Responsive top navigation bar
│   │   └── ProtectedRoute.js         # Auth guard for protected pages
│   ├── context/
│   │   └── AuthContext.js            # Session state (login / logout)
│   ├── data/
│   │   └── jobPosts.js               # Static job listings data
│   ├── pages/
│   │   ├── About/
│   │   │   └── About.js
│   │   ├── CompanyShowcase/
│   │   │   └── CompanyShowcase.js    # Fetches images from backend
│   │   ├── Contact/
│   │   │   └── Contact.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── JobListings/
│   │   │   └── JobListings.js
│   │   └── Login/
│   │       └── Login.js              # Authenticates against Assignment 8 API
│   ├── App.js                        # Root component + routing
│   └── index.js                      # React entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Navigation

| Path         | Page              | Auth Required |
|--------------|-------------------|---------------|
| `/`          | Home              | No            |
| `/about`     | About             | No            |
| `/jobs`      | Job Listings      | No            |
| `/contact`   | Contact           | No            |
| `/companies` | Company Showcase  | **Yes**       |
| `/login`     | Login             | No (redirect if logged in) |

---

## Key Functionalities

### 1. Login & Session Management
- Login page posts credentials to `POST /user/login` on the Assignment 8 backend using **Axios**.
- On success, the user object (`fullName`, `email`, `imagePath`) is stored in `sessionStorage` and held in React context (`AuthContext`).
- A **Logout** button in the navbar clears session storage and redirects to `/login`.

### 2. Protected Routes
- The **Company Showcase** page is wrapped in a `ProtectedRoute` component.
- Unauthenticated users are redirected to `/login` automatically.

### 3. Job Listings
- Data is sourced from the static `src/data/jobPosts.js` file (no API call required).
- Each card shows: **Job Title**, **Required Skills** (chips), **Salary**, and **Last Updated**.
- A live search bar filters jobs by title or skill.
- Clicking **Apply Now** opens the external link in a new tab.

### 4. Company Showcase
- Calls `GET /user/getAll` on the backend to retrieve users who have uploaded images.
- Images are loaded from `GET /images/<filename>` (static file serving on the backend).
- Shows a responsive image gallery of company cards with names.

### 5. Material UI Components Used
- `AppBar` / `Toolbar` – navigation bar
- `Card` / `CardContent` / `CardActions` – job and company cards
- `Grid` – responsive layouts on all pages
- `TextField` – login form, contact form, job search bar
- `Chip` – skill tags on job cards
- `Avatar` / `Menu` – logged-in user avatar with dropdown
- `Drawer` – mobile hamburger menu
- `Alert` – error and success messages
- `CircularProgress` – loading spinner on Company Showcase

---

## Environment Variables

| Variable            | Default                  | Description                  |
|---------------------|--------------------------|------------------------------|
| `REACT_APP_API_URL` | `http://localhost:5000`  | Base URL for the backend API |

---

## Backend API Endpoints Used

| Method | Endpoint          | Purpose                              |
|--------|-------------------|--------------------------------------|
| POST   | `/user/login`     | Authenticate user                    |
| GET    | `/user/getAll`    | Fetch all users (for company images) |
| GET    | `/images/:file`   | Serve company images (static)        |
