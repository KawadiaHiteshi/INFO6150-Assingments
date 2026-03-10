# Aura Wellness Studio

Now includes a localStorage-based authentication flow with **Create Account**, **Login**, protected main pages, and **Logout**.

A two-page wellness and fitness studio website created for Assignment 7 using HTML and modular SASS/SCSS.

## Pages

- `register.html` — Create account page that stores user details in localStorage
- `login.html` — Login page that validates the saved account from localStorage
- `index.html` — Protected home page with hero section, programs, benefits, trainers, testimonials, and CTA
- `membership.html` — Protected membership page with pricing plans, weekly schedule, coaches, and CTA
- `billing.html` — Protected billing page that loads the selected plan and validates payment details

## CSS Layout Requirements Covered

### CSS Grid
- Programs section on the home page
- Membership pricing cards on the second page
- Weekly schedule section on the second page
- Benefits and trainer/coaches card layouts

### Flexbox
- Navigation bar
- Hero actions and stats
- Testimonial row
- CTA band
- Footer layout

## SASS/SCSS Features Implemented

### Required features
- **Variables** for colors, typography, spacing, and breakpoints
- **Custom Properties** in `_custom-properties.scss`
- **Nesting** in component files like `_navbar.scss`
- **Interpolation** in `_home.scss` using dynamic selector generation
- **Placeholder Selectors** in `_placeholders.scss`
- **Mixins** in `_mixins.scss` for buttons, glass cards, responsiveness, and flex alignment
- **Functions** in `_functions.scss` for rem conversion and spacing calculations

### Additional SASS/SCSS features
- **Partials** through modular SCSS file organization
- **@use** to import SCSS modules into `main.scss`
- **Maps** in `_variables.scss` and `_helpers.scss`
- **@each** loop to generate utility color classes
- **@for** loop to generate margin helper classes
- **@if** conditional usage in `_membership.scss`
- **Responsive mixin** using breakpoint map

## Folder Structure

```text
wellness-fitness-studio/
├── index.html
├── membership.html
├── README.md
├── css/
│   └── main.css
└── scss/
    ├── main.scss
    ├── abstracts/
    ├── components/
    ├── layout/
    ├── pages/
    └── utilities/
```

## Extra UI Effects Added

- Sticky glassmorphism navbar
- Floating glow background effects
- Hero floating card animation
- Scroll-like reveal animations on sections
- Gradient CTA section
- Hover lift effects on buttons and cards
- Responsive layout for tablet and mobile screens

## How to Run

1. Download and extract the project ZIP.
2. Open the folder in VS Code or any editor.
3. Open `index.html` in a browser.
4. Navigate to `membership.html` using the navbar or buttons.

## Authentication Features

- Account creation stores one demo user in `localStorage`
- Login checks the stored email and password
- Protected pages automatically redirect to `login.html` if no session is found
- Logout clears the current session and sends the user back to the login page
- Logged-in user name is shown in the navbar

## JavaScript Files

- `js/auth.js` — handles registration, login, logout, session checks, page protection, and welcome name rendering

## Login Flow

1. Open `register.html` and create an account
2. The user data is saved in localStorage
3. After account creation, the user is redirected to `index.html`
4. If logged out, protected pages redirect back to `login.html`
5. Login again with the saved email and password to re-enter the site

## Added Billing Flow

- Choosing a plan on `membership.html` stores the selected plan in `localStorage`
- Users are redirected to `billing.html` to complete payment details
- Billing form validates cardholder name, email, card number, expiry, CVV, ZIP code, and address
- Successful payment stores a demo payment record in `localStorage` and redirects to the home page

## Stronger Validation

- Registration checks full name format, valid email, duplicate email, and stronger password rules
- Login validates email format and password length before authentication
