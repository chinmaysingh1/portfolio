export type GalleryPhoto = {
  src: string;
  caption: string;
};

export type Album = {
  id: string;
  title: string;
  description: string;
  cover: string;
  coverFit?: "contain" | "cover";
  photos: GalleryPhoto[];
};

export const albums: Album[] = [
  {
    id: "kairs",
    title: "KAIRS Development",
    description: "Prototyping, awards and recognition, and pitch competitions.",
    cover: "/assets/KAIRS_Pitch.webp",
    coverFit: "contain",
    photos: [
      {
        src: "/assets/KAIRS_Pitch.webp",
        caption:
          "Chinmay Singh pitching KAIRS at the 2025 NC State VenturePack Awards Ceremony.",
      },
      {
        src: "/assets/IMUSetup.webp",
        caption:
          "Initial Setup for KAIRS Prototype and Proof of Concept using IMU sensors.",
      },
      {
        src: "/assets/KAIRS_Firmware_Code.webp",
        caption: "Firmware code for IMU testing, analyzing yaw, roll, and pitch.",
      },
      {
        src: "/assets/KAIRS_VP.webp",
        caption: "KAIRS Team accepting their 2025 VenturePack Grand Prize Award.",
      },
      {
        src: "/assets/KAIRS_VP2.webp",
        caption: "KAIRS Team accepting their 2025 VenturePack Audience Choice Award.",
      },
      {
        src: "/assets/KAIRS_BMES.webp",
        caption:
          "Chinmay after presenting KAIRS at the 2024 Medtronic/BMES Student Design Competition.",
      },
    ],
  },
  {
    id: "igem",
    title: "iGEM Wet Lab",
    description: "Genetic engineering, cell culture, and team collaboration.",
    cover: "/assets/iGEM.webp",
    coverFit: "contain",
    photos: [
      {
        src: "/assets/iGEM.webp",
        caption: "UNC iGEM team after winning Gold at the 2025 iGEM Grand Jamboree.",
      },
      {
        src: "/assets/Deposition.webp",
        caption:
          "Deposition curve for electrochemistry techniques used to quantify PFAS; in this case, electrodes are treated with Meldola Blue.",
      },
      {
        src: "/assets/DPVCurve.webp",
        caption: "Differential Pulse Voltammetry Curve during PFAS quantification.",
      },
      {
        src: "/assets/ResultsiGEM.webp",
        caption:
          "Results for PFAS Quantification in parts per trillion across different conditions; top row is PFAS quantification when treated with a small-molecule inhibitor, while bottom row is PFAS quantification for three different engineered probiotics.",
      },
    ],
  },
  {
    id: "biocast",
    title: "BioCast",
    description: "Combatting scientific misinformation, one interview at a time.",
    cover: "/assets/BioCastLogo.webp",
    photos: [
      { src: "/assets/BioCastLogo.webp", caption: "BioCast Logo" },
      {
        src: "/assets/PanchEpisode.webp",
        caption:
          "Interview with Dr. Sethuraman Panchanathan, director of the National Science Foundation.",
      },
      {
        src: "/assets/SchererEpisode.webp",
        caption:
          "Interview with Dr. Steven Scherer, director of research at SickKids Hospital.",
      },
      {
        src: "/assets/MarrazzoEp.webp",
        caption:
          "Interview with Dr. Jeanne Marrazzo, director of the National Institute of Allergy and Infectious Diseases.",
      },
    ],
  },
  {
    id: "ewh",
    title: "Engineering World Health @ UNC",
    description: "Circuit building, soldering, and teaching events.",
    cover: "/assets/EWH.webp",
    coverFit: "contain",
    photos: [
      {
        src: "/assets/EWH.webp",
        caption: "EWH: Schematic for the optical heart rate monitor.",
      },
      {
        src: "/assets/Engineer-A-Thon.webp",
        caption: "EWH: Students learning soldering techniques.",
      },
      {
        src: "/assets/EAThon-2.webp",
        caption: "EWH: Completed kit testing on the oscilloscope.",
      },
      {
        src: "/assets/EAThon-3.webp",
        caption: "EWH: Schematic for the optical heart rate monitor.",
      },
      {
        src: "/assets/EAThon-4.webp",
        caption: "EWH: Schematic for the optical heart rate monitor.",
      },
    ],
  },
  {
    id: "capstone",
    title: "Senior Design Capstone Project",
    description:
      "Clinician interviews, VR Development, and hardware prototyping with haptic feedback glove.",
    cover: "/assets/ThreeMusk.webp",
    coverFit: "contain",
    photos: [
      {
        src: "/assets/ThreeMusk.webp",
        caption:
          "Three Musketeers Senior Design Capstone Group Visiting New York to visit the Bouton Lab.",
      },
      {
        src: "/assets/Environment.webp",
        caption:
          "Rendering of the Virtual Reality Environment created for the stroke rehabilitation patients. Pictured are a comforting environment (with lo-fi music playing in the background), grabbable components, such as a spoon, plate, and cup, and a VRPawn.",
      },
      {
        src: "/assets/Blueprint.webp",
        caption:
          'One blueprint that went into the Proof of Concept design, such that when the spoon touches the plate and hitboxes overlap, the widget blueprint (pictured in the next image) updates accordingly, where the "Done" is invisible until the action is completed.',
      },
      {
        src: "/assets/WidgetBlueprint.webp",
        caption:
          "The widget blueprint, attached to the VRPawn, which is displayed in front of the viewer at all times when they are completing actions within the environment.",
      },
    ],
  },
];
