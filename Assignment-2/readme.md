# Assignment 2 — Professional Portfolio Website (HTML + External CSS)

## Project Summary
A responsive, professional portfolio website (LinkedIn-style) built using **semantic HTML** and **external CSS only**.  
Includes a **navigation bar**, a **styled table**, a **contact form**, and two required responsive UI components:
**Testimonials** and **Image Gallery** (with hover effects). Uses **Flexbox** and **media queries** for iPad (768px) and iPhone (375px).

---

## Files
- `index.html` — Main page using semantic elements + required controls
- `styles.css` — External stylesheet (Flexbox + hover + media queries)
- `assets/` — Images + favicon

---

## Semantic Elements Used
- `<header>`: Top navigation and branding
- `<section>`: About, Experience, Projects, Table, Testimonials, Gallery, Contact
- `<article>`: Experience cards, project cards, testimonial cards
- `<aside>`: Quick facts / sidebar
- `<footer>`: Copyright

---

## Other HTML Tags Used (and purpose)
- `<nav>`: Site navigation links
- `<main>`: Main page content
- `<h1> <h2> <h3>`: Headings for sections and cards
- `<p>`: Paragraph text
- `<ul> <li>`: Lists for skills/facts/bullets
- `<table> <caption> <thead> <tbody> <tr> <th> <td>`: Highlights table
- `<form> <label> <input> <select> <option> <textarea> <button>`: Contact form controls
- `<figure> <img> <figcaption>`: Gallery items
- `<a>`: Links and CTA navigation
- `<strong>`: Emphasis / labels

---

## CSS Requirements Covered
- External CSS file only (`styles.css`)
- Flexbox properties used: `display:flex`, `align-items`, `justify-content`, `flex-direction`,
  `flex-grow`, `flex-wrap`
- Table styled with multiple selectors:
  - element selectors (`table`, `th`, `td`)
  - class selectors (`.data-table`)
  - pseudo-classes (`:hover`)
  - `nth-child()` zebra striping
- Responsive breakpoints:
  - iPad: `@media (max-width: 768px)`
  - iPhone: `@media (max-width: 375px)`
- Hover effects:
  - nav links, testimonials, gallery items, buttons

---

## How to Run
Open `index.html` in any browser.

---

## Notes
Replace images in `assets/` as needed:
- `assets/favicon.png`
- `assets/gallery-1.jpg` to `assets/gallery-4.jpg`
