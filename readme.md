# Assignment 1 — AURORA Atelier (Runway Drop Studio)

## Website Description
A fashion “drop studio” website for a capsule collection launch. Users can browse a lookbook, read the collection story, view a size guide table, submit a preorder/fitting form, play studio audio/video, and read FAQs via details/summary. The site uses semantic HTML5 structure and an external CSS file only.

## Tags / Elements Used + Purpose
- `link rel="icon"`: favicon
- Semantic elements:
  - `header`: hero/brand area
  - `section`: grouped content blocks (story, lookbook, size, preorder, media, FAQ)
  - `article`: each look card in the lookbook
  - `aside`: studio notes + contact sidebar
  - `footer`: contact + credits
- `table` + `caption` + `thead` + `tbody` + `tr` + `th` + `td`: size guide table
- `form`: preorder form
  - `input type="text"`: name, pickup preference
  - `input type="email"`: email
  - `input type="password"`: password
  - `datalist` + `option`: style category suggestions
- `figure` + `img` + `figcaption`: images with captions
- `a`: hyperlinks + navigation + contact links
  - `mailto:` email link
  - `tel:` phone link
- `button`: preorder buttons and form actions
- `audio` + `source`: designer voice note
- `video` + `source`: behind-the-scenes clip
- `details` + `summary`: FAQ expand/collapse

## Notes
- Uses external CSS only (`styles.css`).
- Place all media in `/assets`:
  - favicon.png
  - studio.jpg
  - look1.jpg, look2.jpg, look3.jpg
  - voice-note.mp3
  - bts.mp4
