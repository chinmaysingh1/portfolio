import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import { hardwareProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Chinmay Singh — Hardware & Workbench",
  description:
    "A collection of embedded systems, retro-tech builds, and right-to-repair passion projects by Chinmay Singh.",
  alternates: { canonical: "https://chinmayksingh.com/hardware" },
  openGraph: {
    type: "website",
    url: "https://chinmayksingh.com/hardware",
    title: "Chinmay Singh — Hardware & Workbench",
    description:
      "Embedded systems, retro-tech builds, and right-to-repair passion projects.",
    images: ["/assets/ChinmayHeadshot.webp"],
  },
};

export default function HardwarePage() {
  return (
    <main className="min-h-screen pb-28">
      <PageHeader
        eyebrow="Personal Projects"
        title="Workbench & Hardware"
        description="A collection of my embedded systems, retro-tech builds, and right-to-repair passion projects."
      />
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <BentoGrid items={hardwareProjects} />
      </section>
    </main>
  );
}
