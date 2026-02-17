# Assignment 6 - Part A (Login + Calculator)

## Description
Two-page web application:
1) Login page with jQuery validation and hardcoded users.
2) Calculator page with authentication check and single arrow function for operations.

## Features
- Validates Northeastern email format (@northeastern.edu)
- Password validation (required, min 8 chars)
- Login button disabled until valid
- Hardcoded credential check
- Stores session in sessionStorage or localStorage (Remember Me)
- Animated success message + redirect
- Calculator guarded by auth check (redirects if not logged in)
- Single arrow function calculate(num1, num2, operation)
- Logout clears session and fades out before redirect

## Technologies
- HTML5, CSS3
- JavaScript (ES6+)
- jQuery

## How to Run
Open `login.html` in a browser and login with:
- demo@northeastern.edu / Password123
- student@northeastern.edu / Test12345
- hk@northeastern.edu / Northeastern8
