import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import BentoGrid from "@/components/BentoGrid";
import Timeline from "@/components/Timeline";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import SectionHeader from "@/components/SectionHeader";
import { projects, personalCards, education, experience } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />

      <Ticker />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHeader
          title="Beyond the Lab"
          description="The narrative, hobbies, and adventures driving the mission."
        />
        <BentoGrid items={personalCards} />
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHeader
          title="Featured Work"
          description="Engineering solutions from the wet lab to the marketplace. (Click cards for details)"
        />
        <BentoGrid items={projects} />
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHeader title="Education" />
        <Timeline entries={education} />
      </section>

      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHeader title="Experience & Research" />
        <Timeline entries={experience} />
      </section>

      <section id="honors" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionHeader title="Honors & Awards" />
        <Awards />
      </section>

      <Contact />
    </main>
  );
}
