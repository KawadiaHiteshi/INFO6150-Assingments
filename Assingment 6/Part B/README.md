# Assignment 6 – Part B  
## Event Stopwatch with Session Logging

---

## 📌 Description

This application is a single-page Event Stopwatch built using HTML5, CSS3, JavaScript (ES6+), and jQuery.

The stopwatch allows users to:

- Time an activity
- Associate it with a specific date
- Save sessions to localStorage
- View session history
- Filter sessions by date
- View total sessions and total accumulated time

The application follows modern JavaScript practices and meets all validation and UI requirements specified in the assignment.

---

## 🚀 Features Implemented

### ⏱ Timer Functionality
- Timer displays in **HH:MM:SS format**
- Starts at `00:00:00`
- Updates every second using `setInterval`
- Pause / Resume functionality
- Stop & Save functionality
- Reset functionality (without saving)

---

### 🗓 Event Details Validation (jQuery)

#### Date Field
- Required before starting timer
- Error message:  
  `"Please select a date"`
- Error shown below field in red
- Error clears on focus

#### Event Name Field
- Required
- Minimum 3 characters
- Maximum 100 characters
- Only allows:
  - Letters
  - Numbers
  - Spaces
  - Hyphens (-)
  - Apostrophes (')
- Specific error messages:
  - `"Event name is required"`
  - `"Event name must be at least 3 characters"`
  - `"Event name too long (max 100 characters)"`
  - `"Event name contains invalid characters"`

Validation prevents starting the timer if invalid.

---

### 🔐 Disabled State Handling
- Date and Event Name fields are disabled while timer is running
- Pause/Resume does not enable inputs
- Inputs re-enable after Stop & Save or Reset

---

### 💾 Session Logging (localStorage)
- Sessions stored in `localStorage`
- Most recent session appears first
- Data stored:
  - Date
  - Event Name
  - Duration (HH:MM:SS)
  - Unique session ID

---

### 📊 Statistics
- Total Sessions count
- Total Accumulated Time (sum of all sessions)
- Stats update dynamically after:
  - Saving
  - Deleting
  - Clearing history

---

### 🔎 Filter Functionality
- Filter sessions by date
- Clear filter option available
- Stats reflect all sessions (not only filtered)

---

### 🗑 Delete Options
- Delete individual session
- Clear all history option
- Prevents accidental double saves

---

### 🧠 Modern JavaScript Features Used
- `async / await`
- `Promises`
- `setInterval`
- `clearInterval`
- ES6 arrow functions
- Template literals
- Event delegation
- localStorage API

---

### 🎨 CSS Features
- Large timer display (48px+ font size)
- Responsive layout
- Color-coded buttons
- Styled history cards
- Styled validation errors
- Disabled state styling
- Modal dialog with backdrop
- Toast notification system

---

## 🛠 Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Responsive design)
- JavaScript (ES6+)
- jQuery 3.7

---

## ▶️ How to Run the Application

1. Open the project folder.
2. Navigate to:


3. Open using:
- VS Code Live Server (recommended), OR
- Double click to open in browser.

4. Enter event name and select date.
5. Click Start.

---

## 🧪 How to Test Validation

- Try starting without a date.
- Try starting with empty event name.
- Try invalid characters (#, @, etc.).
- Try less than 3 characters.
- Try more than 100 characters.

---

## 📦 Storage Behavior

- Sessions persist even after page refresh.
- Deleting sessions updates storage immediately.
- Clearing all removes all session data from localStorage.

---

## 📁 Folder Structure


3. Open using:
- VS Code Live Server (recommended), OR
- Double click to open in browser.

4. Enter event name and select date.
5. Click Start.

---

## 🧪 How to Test Validation

- Try starting without a date.
- Try starting with empty event name.
- Try invalid characters (#, @, etc.).
- Try less than 3 characters.
- Try more than 100 characters.

---

## 📦 Storage Behavior

- Sessions persist even after page refresh.
- Deleting sessions updates storage immediately.
- Clearing all removes all session data from localStorage.

---

## 📁 Folder Structure

PartB/
│
├── html/
│ └── stopwatch.html
│
├── css/
│ └── style.css
│
├── js/
│ └── stopwatch.js
│
└── README.md

---

## 💡 Bonus Enhancements Implemented

- Prevents duplicate saves
- Unique session IDs
- Toast notifications
- Modal confirmation dialog
- Secure HTML escaping in history rendering

---

## 📌 Author

Name: [Hiteshi Kawadia]  
Course: INFO 6150  
Assignment: Assignment 6 – Part B  

---
