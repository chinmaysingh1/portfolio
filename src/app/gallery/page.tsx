import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Chinmay Singh — Gallery",
  description:
    "Visual documentation of Chinmay Singh's engineering process — KAIRS, iGEM, BioCast, Engineering World Health, and Senior Design.",
  alternates: { canonical: "https://chinmayksingh.com/gallery" },
  openGraph: {
    type: "website",
    url: "https://chinmayksingh.com/gallery",
    title: "Chinmay Singh — Gallery",
    description: "Visual documentation of my engineering process.",
    images: ["/assets/ChinmayHeadshot.webp"],
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen pb-28">
      <PageHeader
        eyebrow="Visual Archive"
        title="Project Albums"
        description="Visual documentations of my engineering process. Select an album to view the collection."
      />
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <GalleryClient />
      </section>
    </main>
  );
}
