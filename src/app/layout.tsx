import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // swap renders fallback text immediately, then swaps in Inter once loaded —
  // eliminates FOIT and the CLS that a blocking font load would cause.
  display: "swap",
});

const SITE_URL = "https://chinmayksingh.com";
const OG_IMAGE = {
  url: "/assets/og-image.jpg",
  width: 1200,
  height: 1104,
  alt: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
    template: "%s — Chinmay Singh",
  },
  description:
    "Portfolio of Chinmay Singh — Biomedical Engineer, Researcher, and founder of Cualli, a synthetic-biology venture building programmable probiotics for PFAS degradation and internal remediation. Co-Founder of KAIRS. Bridging biology and technology at UNC Chapel Hill.",
  applicationName: "Chinmay Singh Portfolio",
  keywords: [
    "Chinmay Singh",
    "Cualli",
    "programmable probiotics",
    "PFAS degradation",
    "forever chemicals body burden",
    "internal remediation",
    "living medicine",
    "Biomedical Engineering",
    "KAIRS",
    "UNC Chapel Hill",
    "Synthetic Biology",
    "Medical Devices",
    "BioCast",
    "Johns Hopkins CBID",
    "Physician Engineer",
    "Neuroengineering",
    "iGEM",
  ],
  authors: [{ name: "Chinmay Singh", url: SITE_URL }],
  creator: "Chinmay Singh",
  publisher: "Chinmay Singh",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Chinmay Singh",
    locale: "en_US",
    url: "/",
    title: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
    description:
      "Portfolio of Chinmay Singh, Biomedical Engineer, Researcher, and Co-Founder of KAIRS.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Singh — Biomedical Engineer",
    description: "Bridging the gap between biology and technology.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

// A single linked-data graph lets crawlers resolve the site, the profile page,
// and the person as one connected entity (via @id references).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Chinmay Singh",
      description:
        "Portfolio of Chinmay Singh, Biomedical Engineer, Researcher, and Co-Founder of KAIRS.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Chinmay Singh",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/assets/ChinmayHeadshot.webp`,
      jobTitle: "Biomedical Engineer & Co-Founder",
      email: "mailto:Chinmay.Singh@unc.edu",
      description:
        "Biomedical Engineer and entrepreneur building at the intersection of biology and technology — Co-Founder of KAIRS, researcher at UNC Chapel Hill, and incoming Johns Hopkins CBID candidate.",
      knowsAbout: [
        "Biomedical Engineering",
        "Medical Device Design",
        "Synthetic Biology",
        "Programmable Probiotics",
        "PFAS Degradation",
        "Internal Remediation",
        "Living Medicine",
        "Neuroengineering",
        "Rehabilitation Technology",
        "Machine Learning",
        "Embedded Systems",
      ],
      worksFor: [
        { "@id": `${SITE_URL}/#cualli` },
        {
          "@type": "Organization",
          name: "KAIRS",
          url: "https://www.kairs.ai/",
        },
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of North Carolina at Chapel Hill",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Johns Hopkins University",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/in/chinmayksingh/",
        "https://github.com/chinmaysingh1",
      ],
    },
    {
      // Cualli is represented as its own Organization entity that Chinmay
      // founded. sameAs points to the venture's canonical home (cualli.bio)
      // without hijacking THIS site's canonical, so crawlers connect the
      // founder ↔ venture without a cross-domain canonical conflict.
      "@type": "Organization",
      "@id": `${SITE_URL}/#cualli`,
      name: "Cualli",
      url: "https://cualli.bio",
      description:
        "Cualli is a synthetic-biology venture engineering programmable probiotics — living medicine for internal remediation that degrades PFAS and lowers the body's forever-chemicals burden.",
      foundingDate: "2024",
      founder: { "@id": `${SITE_URL}/#person` },
      knowsAbout: [
        "Programmable Probiotics",
        "PFAS Degradation",
        "Forever Chemicals Body Burden",
        "Internal Remediation",
        "Living Medicine",
        "Synthetic Biology",
      ],
      sameAs: ["https://cualli.bio"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ParticleBackground />
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollProgress />
        <Navbar />
        {children}
        <footer className="border-t border-white/[0.04] py-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} Chinmay Singh
        </footer>
      </body>
    </html>
  );
}
