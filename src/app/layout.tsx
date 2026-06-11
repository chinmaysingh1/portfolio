import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chinmayksingh.com"),
  title: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
  description:
    "Portfolio of Chinmay Singh, Biomedical Engineer, Researcher, and Co-Founder of KAIRS. Bridging biology and technology at UNC Chapel Hill.",
  keywords: [
    "Chinmay Singh",
    "Biomedical Engineering",
    "KAIRS",
    "UNC Chapel Hill",
    "Synthetic Biology",
    "Medical Devices",
    "BioCast",
    "Johns Hopkins",
  ],
  authors: [{ name: "Chinmay Singh" }],
  alternates: { canonical: "https://chinmayksingh.com/" },
  openGraph: {
    type: "website",
    url: "https://chinmayksingh.com/",
    title: "Chinmay Singh — Biomedical Engineer & Entrepreneur",
    description:
      "Portfolio of Chinmay Singh, Biomedical Engineer, Researcher, and Co-Founder of KAIRS.",
    images: ["/assets/ChinmayHeadshot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Singh — Biomedical Engineer",
    description: "Bridging the gap between biology and technology.",
    images: ["/assets/ChinmayHeadshot.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chinmay Singh",
  url: "https://chinmayksingh.com",
  image: "https://chinmayksingh.com/assets/ChinmayHeadshot.webp",
  jobTitle: "Biomedical Engineer & Co-Founder",
  worksFor: { "@type": "Organization", name: "KAIRS" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of North Carolina at Chapel Hill",
    },
    { "@type": "CollegeOrUniversity", name: "Johns Hopkins University" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/chinmayksingh/",
    "https://github.com/chinmaysingh1",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
