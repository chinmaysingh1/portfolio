# Chinmay Singh — Portfolio

![Portfolio Preview](public/assets/ChinmayHeadshot.webp)

> **Bridging the gap between biology and technology.**

This repository contains the source code for the personal portfolio website of **Chinmay Singh**, a Biomedical Engineer, Researcher, and Entrepreneur. The site is designed to showcase projects, research experience, and technical skills through a modern, interactive, and responsive interface.

## 🔗 Live Site
[**View Portfolio Live**](https://chinmayksingh.com)

## 🛠 Tech Stack

* **Next.js (App Router)**: Statically exported React application — builds to plain HTML/CSS/JS.
* **TypeScript**: End-to-end type safety, with all site content modeled in `src/lib/data.ts`.
* **Tailwind CSS v4**: Utility styling with a custom "Deep Dimension" design system.
* **Framer Motion**: Scroll-linked parallax, 3D card tilt, page transitions, and modal/lightbox animations.
* **React Three Fiber + Drei**: WebGL particle-field background whose camera descends with the page scroll.

## ✨ Key Features

* **Kinetic Bento Grid**: Project cards rise at different parallax speeds with pointer-tracked 3D tilt and glare.
* **3D Particle Background**: A rotating Carolina-blue particle field; the camera's Y position maps to scroll progress.
* **Scrollspy Navigation**: The navbar underline follows the section in view and slides between routes.
* **Fluid Modals**: Project detail modals with keyboard navigation and deep links into the gallery.
* **Album Gallery**: Photo-stack album cards that fan out on hover, with an animated lightbox (`/gallery`, supports `#album` deep links).
* **Hardware Workbench**: A dedicated page for embedded systems and retro-tech builds (`/hardware`).
* **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

## 📂 Project Structure

    ├── public/assets/       # Images, PDFs, SVGs, and other static media
    ├── src/
    │   ├── app/             # Routes: / (home), /hardware, /gallery
    │   ├── components/      # ParticleScene, BentoGrid, Timeline, Lightbox, etc.
    │   └── lib/             # All site content (data.ts, gallery-data.ts)
    ├── next.config.ts       # Static export configuration (output: "export")
    └── README.md            # Project documentation

## 🚀 Projects Showcased

The portfolio highlights several key initiatives and engineering projects:

1. **KAIRS (Knee AI Rehab Sleeve)**
   * *Co-Founder*: A wearable medical device using TensorFlow and IMU sensors to track patient recovery.
   * *Awards*: NC State VenturePack Grand Prize, Global Runner-up Medtronic/BMES.

2. **UNC iGEM (Synthetic Biology)**
   * *Wet Lab Lead*: Engineered *E. coli* to uptake PFAS ("Forever Chemicals") from the gut.
   * *Achievement*: Gold Medal at the 2025 iGEM Grand Jamboree in Paris.

3. **BioCast**
   * *Co-Founder*: A science communication platform/podcast featuring leaders like Dr. Robert Langer and NIH Directors.

4. **Engineering World Health (EWH)**
   * *President*: Re-launched the UNC chapter and organized the inaugural "Engineer-A-Thon."

5. **Senior Design Capstone**
   * *Lead*: VR environment and haptic feedback glove for stroke rehabilitation using Unreal Engine 5.

## 🧬 Research Experience

Includes work from:
* **Sode Lab**: Antibody engineering and AlphaFold modeling.
* **Stein Lab**: Stem cell culture and Brain Organoids (Autism research).
* **Zylka Lab**: Pain research and spinal macrophages.
* **Troester Lab**: Breast cancer disparities and epigenetics.

## 💻 Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chinmaysingh1/portfolio.git
   cd portfolio
   ```

2. **Install dependencies and run the dev server:**
   ```bash
   npm install
   npm run dev
   ```

3. **Build the static site:**
   ```bash
   npm run build   # outputs the deployable site to out/
   ```

## 📞 Contact

* **Email**: [Chinmay.Singh@unc.edu](mailto:Chinmay.Singh@unc.edu)
* **LinkedIn**: [Chinmay Singh](https://www.linkedin.com/in/chinmayksingh/)

---
*© 2026 Chinmay Singh. All Rights Reserved.*
