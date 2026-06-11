export type ModalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type ProjectModal = {
  gradient: "blue" | "purple" | "dark";
  tag: string;
  title: string;
  image?: string;
  imageAlt?: string;
  skills: string[];
  sections: ModalSection[];
  website?: { label: string; href: string };
  github?: string;
};

export type Project = {
  id: string;
  tag: string;
  title: string;
  award?: string;
  blurb: string;
  tech: string[];
  glow?: "blue" | "purple";
  size: "large" | "medium" | "full" | "half";
  modal?: ProjectModal;
  href?: string;
  cta?: string;
};

export const projects: Project[] = [
  {
    id: "kairs",
    tag: "Startup • Medical Device",
    title: "KAIRS",
    award: "🏆 $37.5k Won",
    blurb:
      "Co-Founder. Developing a knee rehabilitation sleeve using AI to track patient recovery. Winner: NC State VenturePack Grand Prize 2025. Global First Runner-Up: 2024 Medtronic/BMES Student Design Competition.",
    tech: ["C++", "PyTorch", "Medical Device Design", "Hardware Development"],
    glow: "blue",
    size: "large",
    modal: {
      gradient: "blue",
      tag: "Startup Venture • Medical Device",
      title: "KAIRS: Knee AI Rehab Sleeve",
      image: "/assets/KAIRS_Pitch.webp",
      imageAlt: "KAIRS Device",
      skills: ["🤖 TensorFlow", "🐍 Python", "📡 IMU Sensors", "⚡ PCB Design"],
      sections: [
        {
          title: "The Unmet Clinical Need",
          paragraphs: [
            "Following a personal orthopedic injury and speaking to multiple clinicians, I realized that many forms of orthopedic rehabilitation are often unmonitored or lack the proper data to inform clinicians' decisions, leading to poor recovery outcomes and high rates of re-injury. In particular, one of the largest areas of rehabilitation is post-operative knee rehabilitation.",
          ],
        },
        {
          title: "The Solution",
          paragraphs: [
            "I co-founded KAIRS to build a wearable sleeve integrated with IMU sensors and a machine learning model to interpret the data collected from the sensors, and develop a recovery protocol/assist clinicians with their decision-making accordingly. My primary technical contribution was engineering the sleeve equipped with sensors, which is incorporated with an ESP-32 to track range-of-motion and exercise form in real-time.",
          ],
        },
        {
          title: "Impact & Awards",
          list: [
            "$37,500 Funding: Secured non-dilutive, equity-free funding.",
            "Grand Champion: NC State VenturePack Challenge 2025 (also voted Audience's Choice Winner).",
            "First Place: Winner of i4 competition at 2026 UNC/NCSU Lampe Joint Department of Biomedical Engineering Design Symposium.",
            "Audience Choice: Joan and Chester Luby Pitch Competition 2026.",
            "Global Runner-Up: 2nd Place at 2024 BMES/Medtronic Student Design Competition.",
            "Second Place: 2nd place at the 2025 NC State Wolf Den Competition.",
            "Top 8 Worldwide: Recognized among the top 8 teams globally at the 2026 Johns Hopkins Healthcare Design Competition within the Digital Health Track.",
          ],
        },
      ],
      website: { label: "Our Website", href: "https://www.kairs.ai/" },
      github: "https://github.com/chinmaysingh1/kairs-firmware.git",
    },
  },
  {
    id: "igem",
    tag: "Synthetic Biology",
    title: "UNC iGEM",
    award: "🥇 Gold Medal",
    blurb:
      "Wet Lab Lead. Managed a team of 6 researchers to synthesize novel probiotic to uptake PFAS.",
    tech: ["Genetic Engineering", "Team Management"],
    glow: "purple",
    size: "medium",
    modal: {
      gradient: "purple",
      tag: "Synthetic Biology Research",
      title: "UNC iGEM: Wet Lab Lead",
      image: "/assets/iGEM.webp",
      imageAlt: "Protein Structure",
      skills: [
        "🧬 Genetic Recombineering",
        "🧫 E. coli Culture",
        "🧪 Wet Lab Lead",
        "⚡️ Electrochemistry",
      ],
      sections: [
        {
          title: "Project Overview",
          paragraphs: [
            "As Wet Lab Lead, I managed a team of 6 researchers to develop a novel probiotic aimed at environmental health.",
          ],
        },
        {
          title: "Methodology",
          paragraphs: [
            "We engineered Nissle 1917 E. coli, which have a natural affinity to uptake PFAS, to knock out the AcrB gene within the TolC efflux pump complex. We hypothesized this would prevent PFAS (Forever Chemicals) from re-entering the human gut, reducing systemic toxicity.",
            "Our work and experimentation led to a gold medal at the 2025 iGEM Grand Jamboree in Paris, France.",
          ],
        },
        {
          title: "Key Contributions",
          list: [
            "Organized bi-weekly lab workflows, managed check-ins with members, and discussed project directions.",
            "Wrote all experimental protocols and validated with Sode Lab members.",
            "Conducted proof of concept experiment with small-molecule inhibitor.",
            "Cultivated wildtype Nissle 1917 E. coli and treated in triplicate form with PFAS and GPN, and just PFAS, to establish a control and an experimental group.",
            "Conducted E. coli transformation via RecA-mediated recombination.",
            "Assessed viable transformed colonies via gel electrophoresis.",
            "Built upon and further developed a novel electrochemistry technique to quantify PFAS concentrations in extracellular and intracellular environments of Nissle 1917 E. coli for both proof of concept and transformation experiments.",
            "Wrote MATLAB code, importing and analyzing experimentation data after collection.",
            "Presented on findings and experiments at the iGEM Grand Jamboree in Paris, France.",
            "Presented findings to large groups and managed sub-team coordination.",
          ],
        },
      ],
      website: { label: "Our Website", href: "https://2025.igem.wiki/unc-chapelhill/" },
      github: "https://github.com/chinmaysingh1/iGEMMATLAB.git",
    },
  },
  {
    id: "biocast",
    tag: "Media • Web Dev",
    title: "BioCast",
    blurb:
      "Co-Founder & Host. Interviewed leaders like Dr. Robert Langer, Directors of the NIH, and more.",
    tech: ["Science Communication", "Web Development"],
    size: "medium",
    modal: {
      gradient: "dark",
      tag: "Web Development & Media",
      title: "BioCast Podcast",
      image: "/assets/BioCastLogo.webp",
      imageAlt: "BioCast Website",
      skills: ["💻 HTML/CSS/JS", "🎙️ Adobe Audition", "📢 Marketing"],
      sections: [
        {
          title: "The Project",
          paragraphs: [
            "Co-founded a podcast to bridge the gap between complex biological research and the public, particularly within a post-Covid-19 world, where medical misinformation is rampant.",
            "Another goal is to show how some of the most prolific researchers live and establishing a connection between them and the general public.",
          ],
        },
        {
          title: "Contributions",
          list: [
            "Coded entire website from scratch using HTML and CSS.",
            "Cold emailed guests and established connections with Dr. Robert Langer and Dr. Eric Green.",
            "Coordinated and collaborated on interview logistics with some of the greatest minds in science.",
            "Established connections with JP Flores, Host of From where does it STEM?. Co-hosted multiple episodes with him.",
            "Wrote questions and interview scripts.",
            "Conducted interviews via Zoom or in-person in some cases.",
            "Edited most episodes using Audacity or Adobe Audition.",
          ],
        },
        {
          title: "Notable Guests",
          list: [
            "Dr. Robert Langer: Co-founder of Moderna.",
            "Dr. Eric Green: Former Director of the NHGRI.",
            "Dr. Sethuraman Panchanathan: Director of the NSF.",
            "Dr. Karolin Luger: researcher who discovered the 3-D structure of chromatin and the nucleosome.",
            "Dr. Chad Bouton: inventor of the Double Neural Bypass; prolific BCI researcher, and PI of the Bouton Lab.",
          ],
        },
      ],
      website: { label: "Our Website", href: "https://www.biocast.co/" },
      github: "https://github.com/chinmaysingh1/biocast.git",
    },
  },
  {
    id: "ewh",
    tag: "Leadership",
    title: "Engineering World Health @ UNC",
    blurb: "President and Founder. Organized UNC's inaugural 'Engineer-A-Thon'.",
    tech: ["Leadership", "Event Organization"],
    size: "medium",
    modal: {
      gradient: "dark",
      tag: "Leadership & Electronics",
      title: "Engineering World Health",
      image: "/assets/EWH.webp",
      imageAlt: "Circuit Building",
      skills: ["🔌 Soldering", "💡 Circuit Design", "👥 Event Planning"],
      sections: [
        {
          title: "Role: President",
          paragraphs: [
            "I re-opened and led the UNC Chapter, focusing on hands-on engineering skills for undergraduates.",
          ],
        },
        {
          title: "Impact",
          list: [
            "Engineer-A-Thon: Organized UNC's first event for 40+ students, fundraising and managing a $2,000 corporate budget.",
            "Skills Workshops: Personally instructed 20+ students in soldering and electronics training to build optical heart rate monitors and pressure calibration kits.",
            "Career Advice and Future Goals: Conducted fireside chat with UNC professors regarding career prospects within biomedical engineering, as well as post-graduation plans for BME students.",
          ],
        },
      ],
    },
  },
  {
    id: "capstone",
    tag: "Engineering",
    title: "Senior Design",
    blurb:
      "Project Lead. Designed VR environment and haptic feedback glove for stroke rehab.",
    tech: ["Hardware", "Programming"],
    glow: "purple",
    size: "medium",
    modal: {
      gradient: "dark",
      tag: "Electronics and Medical Device Design",
      title: "Senior Design Capstone Project",
      image: "/assets/ThreeMusk.webp",
      imageAlt: "Senior Design Team",
      skills: ["🔌 Soldering", "💡 Circuit Design", "👥 Event Planning"],
      sections: [
        {
          title: "Role: Team Lead & Environment Designer",
          paragraphs: [
            "Organized group and searched for unmet clinical needs within the space of neuroscience and brain-computer interfaces.",
          ],
        },
        {
          title: "Key Contributions",
          list: [
            "Established connections with multiple clinicians in areas of BCI research.",
            "Established connection with Dr. Chad Bouton of the Northwell Feinstein Institute of Bioelectronic Medicine through Dr. Robert Langer.",
            "Developed Proof of Concept in Unreal Engine 5, using Blueprints and Epic Games' Fab Asset Manager.",
            "Developed bill of materials for supplies needed to develop haptic feedback glove.",
            "Coordinated efforts to visit Bouton Lab in New York City, New York to learn more about their technologies and research, as well as how to establish tech to best assist the lab.",
          ],
        },
      ],
      github: "https://github.com/acastiller1212/UNCSeniorDesign2526.git",
    },
  },
];

export const personalCards: Project[] = [
  {
    id: "mission",
    tag: "Purpose • Clinical Translation",
    title: "Why I Build",
    blurb:
      "Driven by the goal of becoming a physician-engineer. Building at the intersection of neuroscience, rehabilitation technology, and hardware design.",
    tech: ["Neuroengineering", "Global Health", "Problem Solving"],
    glow: "blue",
    size: "full",
    modal: {
      gradient: "blue",
      tag: "Purpose • Clinical Translation",
      title: "Why I Build",
      skills: ["🧠 Neuroscience", "🦾 Rehabilitation", "⚙️ Device Design"],
      sections: [
        {
          title: "The Mission",
          paragraphs: [
            "I want to become a physician-engineer because I am drawn to the space where medicine and engineering fail to fully meet. In healthcare, patients are often asked to recover within systems that are fragmented, reactive, and limited by tools that were never designed around how people actually live and heal. I want to help close that gap by building technologies that do more than perform well in theory—they need to work in the clinic, in the home, and in the uncertainty of real life.",
          ],
        },
        {
          title: "From Problem to Practice",
          paragraphs: [
            "My work sits at the intersection of neuroscience, rehabilitation, and human-centered design. I am most motivated by problems where biology, hardware, and behavior collide: restoring movement, improving recovery, and creating systems that clinicians can trust and patients can actually use. Long term, I do not just want to study disease or invent devices in isolation. I want to become the kind of builder who can understand a problem at the bedside, trace it to its technical roots, and create something practical enough to change care.",
          ],
        },
        {
          title: "Discipline Beyond the Lab",
          paragraphs: [
            "Outside of engineering, Taekwondo has shaped how I think about growth: repetition, restraint, humility, and the willingness to keep refining what is still imperfect. That mindset carries directly into how I build. The goal is not just to make something impressive once. It is to make something reliable, rigorous, and worthy of real trust.",
          ],
        },
      ],
    },
  },
  {
    id: "adventures",
    tag: "Systems • Exploration",
    title: "How I Think",
    blurb:
      "Applying a strategic mindset to everyday life—from navigating new cultures globally to beating the clock in escape rooms.",
    tech: ["Escape Rooms", "International Travel"],
    size: "half",
    modal: {
      gradient: "purple",
      tag: "Systems • Exploration",
      title: "How I Think",
      skills: ["🌍 Perspective", "🧩 Systems Thinking", "🤝 Teamwork"],
      sections: [
        {
          title: "Strategy Under Pressure",
          paragraphs: [
            "I love escape rooms because they compress everything I enjoy about problem-solving into one space: incomplete information, hidden constraints, time pressure, and the need to think clearly with other people. The best breakthroughs rarely come from brute force. They come from pattern recognition, communication, and noticing what others overlook. That instinct shows up everywhere in my work, from research and prototyping to leadership and collaboration.",
          ],
        },
        {
          title: "A Wider Lens",
          paragraphs: [
            "Travel has also changed the way I think about innovation. Seeing different places, cultures, and ways of living has made me more skeptical of one-size-fits-all solutions and more aware that useful technology has to fit real people in real contexts. That perspective matters to me because healthcare is never just a technical problem. It is also a human one, shaped by environment, access, culture, and trust.",
          ],
        },
        {
          title: "Fun!",
          paragraphs: [
            "Aside from escape rooms and traveling, I am a huge fan of watching shows, anime, and more. A few of my all-time favorites (in no particular order): Breaking Bad, Better Call Saul, Steins;Gate, Fullmetal Alchemist: Brotherhood, and Severance.",
            "Some of the shows I'm watching right now: NCIS, Jujutsu Kaisen: Season 3, and Frieren: Beyond a Journey's End.",
          ],
        },
      ],
    },
  },
  {
    id: "workbench",
    tag: "Hardware • Hobbies",
    title: "Workbench & Hardware",
    blurb:
      "Exploring embedded systems, microcontrollers, and retro-tech displays beyond the laboratory.",
    tech: ["ESP32 / Pi", "Nixie Tubes", "Mechanical Keyboards"],
    glow: "purple",
    size: "half",
    href: "/hardware",
    cta: "View Projects",
  },
];

export const tickerSkills = [
  "TensorFlow",
  "Python",
  "MATLAB",
  "AlphaFold",
  "Unreal Engine 5",
  "Rapid Prototyping",
  "PCB Design",
  "R Analysis",
  "Stem Cell Culture",
  "Antibody Engineering",
  "PyTorch",
];

export type TimelineEntry = {
  date: string;
  role: string;
  title: string;
  institution: string;
  body: string;
  tech?: string[];
};

export const education: TimelineEntry[] = [
  {
    date: "May 2026 — May 2027",
    role: "Graduate Program",
    title: "Johns Hopkins University",
    institution: "Center for Bioengineering Innovation and Design (CBID)",
    body: "Incoming M.S.E. candidate selected for a highly competitive translational engineering program. Focus on clinical observation, global health inequities, and developing commercializable medical devices.",
    tech: ["Translational Engineering", "Medical Device Design", "Global Health"],
  },
  {
    date: "Aug 2022 — May 2026",
    role: "Undergraduate Program",
    title: "UNC Chapel Hill & NC State University",
    institution: "Lampe Joint Department of Biomedical Engineering",
    body: "Pursuing a B.S. in Biomedical Engineering with a Minor in Data Science. Awarded Dean's List honors for 7 consecutive semesters. Campus leader serving as President of Engineering World Health and Wet-Lab Lead for the Gold-Medal winning UNC iGEM team.",
    tech: ["Neuroengineering", "Synthetic Biology", "Data Science"],
  },
  {
    date: "Aug 2020 — May 2022",
    role: "High School",
    title: "North Carolina School of Science and Mathematics",
    institution: "High School Diploma",
    body: "Selected to attend the nation's top-ranked public residential high school for gifted students. Completed rigorous, specialized coursework in advanced STEM principles, laying the foundational framework for a career in bioengineering.",
    tech: ["Advanced STEM", "Residential Program"],
  },
];

export const experience: TimelineEntry[] = [
  {
    date: "Jan 2025 — Present",
    role: "Teaching Assistant",
    title: "Junior Design & Manufacturing (BMME 398)",
    institution:
      "Lampe Joint Department of Biomedical Engineering at the University of North Carolina at Chapel Hill and North Carolina State University",
    body: "Instructing students on Unreal Engine 5 for biomedical applications in virtual reality, as well as mammalian and bacterial cell culture techniques.",
    tech: ["Unreal Engine 5", "VR", "Cell Culture", "Teaching"],
  },
  {
    date: "Jan 2025 — Present",
    role: "Undergraduate Researcher",
    title: "Sode Lab",
    institution:
      "Lampe Joint Department of Biomedical Engineering at the University of North Carolina at Chapel Hill and North Carolina State University",
    body: "Conducting scFv antibody research under mentorship of Dr. Madoka Nagata to develop pH-specific antibodies for diabetes sensing in continuous glucose monitor development. Leveraging AlphaFold to predict 3D structures and cultivating genetically modified E. coli.",
    tech: [
      "AlphaFold",
      "Antibody Engineering",
      "Bacterial Cell Culture",
      "Binding affinities",
    ],
  },
  {
    date: "Dec 2022 — Dec 2024",
    role: "Undergraduate Researcher",
    title: "Stein Lab",
    institution: "University of North Carolina at Chapel Hill",
    body: "Cultivated and differentiated brain organoids from iPSCs to examine biomarkers of autism spectrum disorder (ASD) and cortical hyperexpansion. Assisted with mycoplasma testing via gel electrophoresis.",
    tech: ["Stem Cells", "3-D Brain Organoids"],
  },
  {
    date: "Jun 2022 — Dec 2024",
    role: "Undergraduate Researcher",
    title: "Zylka Lab",
    institution: "University of North Carolina at Chapel Hill",
    body: "Studied effects of spinal macrophages on nociceptive pain. Induced cytokine secretion via agonist antibodies and quantified results using Fiji and ImageJ. Quantified cell counts in sex-specific RAG induction of mouse spinal cords. Examined effects of azoxystrobin on mice brains.",
  },
  {
    date: "Jan 2021 — Dec 2022",
    role: "Research Intern",
    title: "Troester Lab",
    institution: "University of North Carolina at Chapel Hill",
    body: "Assisted with the Carolina Breast Cancer Study's Third Phase. Documented data, analyzed tumors, and utilized NanoDrop machines to record DNA concentrations. Conducted research on epigenetics and racial disparities among breast cancer patients.",
  },
];

export type Award = {
  icon: string;
  title: string;
  org: string;
  detail: string;
  tier?: "gold" | "silver";
};

export const awards: Award[] = [
  {
    icon: "🏆",
    title: "Grand Prize Winner",
    org: "NC State VenturePack 2025",
    detail: "Won $12,000 in non-dilutive funding for KAIRS.",
    tier: "gold",
  },
  {
    icon: "🥈",
    title: "2nd Place Global",
    org: "BMES/Medtronic Design Comp",
    detail: "AI/ML in Sports Injury Treatment track.",
    tier: "silver",
  },
  {
    icon: "🗳️",
    title: "Audience Choice",
    org: "NC State VenturePack",
    detail: "Voted best startup by audience.",
  },
  {
    icon: "💡",
    title: "KEEN Award",
    org: "Entrepreneurial Mindset",
    detail: "UNC BEAM MakerFest Fall 2024.",
  },
  {
    icon: "🎓",
    title: "Dean's List",
    org: "Academic Excellence",
    detail: "Awarded 7 consecutive semesters.",
  },
];

export const hardwareProjects: Project[] = [
  {
    id: "nixie",
    tag: "Retro-Tech • Electronics",
    title: "IN-14 Nixie Tube Displays",
    blurb:
      "Designing and building functional art pieces using vintage Soviet vacuum tubes and custom PCBs.",
    tech: ["Soldering", "Circuit Design"],
    glow: "purple",
    size: "large",
  },
  {
    id: "nas",
    tag: "Security • Privacy",
    title: "Building Home NAS",
    blurb:
      "Modifying a Raspberry Pi 5 to self-host media and function as a Network Attached Storage (NAS).",
    tech: ["Digital Security", "Networking"],
    size: "medium",
  },
  {
    id: "portfolio-site",
    tag: "WebDev • UI/UX",
    title: "Coding Personal Portfolio Website",
    blurb: "Designing and building my own personal portfolio website.",
    tech: ["HTML", "CSS", "JavaScript"],
    size: "medium",
  },
  {
    id: "repair",
    tag: "Right to Repair • Electronics",
    title: "Electronics Repair",
    blurb: "Replacing battery on Apple iPhone 13 and screen on Apple Watch Series 3.",
    tech: ["Repair", "DIY"],
    glow: "blue",
    size: "large",
  },
];

export const heroStats = [
  { num: "$42.5k", label: "Funding Won" },
  { num: "5+", label: "Years Research" },
  { num: "1st", label: "Runner-up Globally (Medtronic)" },
];
