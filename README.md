# Portfolio Website (UNC Biomedical Engineering — Senior)

This is a simple static portfolio website scaffold for Chinmay Singh, a senior Biomedical Engineering major at the University of North Carolina at Chapel Hill. It includes sections for Projects, Awards, Education, and Contact plus a responsive layout.

Files:
- `index.html` — main single-page site (now contains Chinmay Singh's name and contact links)
- `styles.css` — styles and responsive layout
- `script.js` — small JS for navigation, smooth scroll, and project filtering

Contact info added to the site:

- `Chinmay.Singh@unc.edu`
- `chinmayksingh@gmail.com`
- `chinmay@kairs.ai`

Resume link:

The resume file is expected at `assets/CSinghResume.pdf`. The site includes a download link pointing to that path; if you prefer a different filename or hosted URL, update the `href` in `index.html` accordingly.

Added assets and behavior:

- Headshot: `assets/ChinmayHeadshot.jpg` (used in the hero card).
-- Project thumbnail placeholders are now included: `assets/project-pulse.svg`, `assets/project-ecg.svg`, `assets/project-gait.svg`.

New visual features added:

- Animated ring around the headshot (CSS-driven). The headshot is larger and is now the primary focal point.
- Split-screen diagonal accent in the hero for a modern overlap effect.
- Floating micro-interaction blobs created dynamically by `script.js` — they subtly parallax with mouse movement and react on hover.

If you'd like more/less motion for accessibility, tell me and I can reduce animation intensity or add a "reduced-motion" toggle.
New features:

- Dark theme with bold neon accents and animated hero blobs.
- Click "View details" on any project to open a modal with more information and images.

Preview locally (Windows PowerShell):

Commands:

Start-Process "index.html"

Or run a simple HTTP server (recommended for testing JS/CSS behavior):

python -m http.server 8000; Start-Process "http://localhost:8000"

Next steps you might want me to do:
- Replace placeholder text (name, email, resume link, project details)
- Add images and thumbnails in an `assets/` folder
- Add a contact form (Netlify / Formspree) or connect to GitHub pages deployment

If you want, I can update content with your real name, email, resume, and project links now.
