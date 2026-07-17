import {
  BarChart3,
  BookOpen,
  Brush,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Heart,
  Landmark,
  Leaf,
  Lightbulb,
  MessagesSquare,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sprout,
  Target,
  Trees,
  TrendingUp,
  Users,
} from "lucide-react";

import type {
  CategoryItem,
  Course,
  FeatureItem,
  GalleryImage,
  ProcessStep,
  ProgramHighlight,
  ValueItem,
} from "@/types";

export const heroCopy = {
  eyebrow: "Fiecare progres solid începe cu o bază construită corect.",
  title: "Up for Learning",
  subtitle: "From Curiosity to Performance",
  paragraphs: [
    "La Up for Learning, susținem copiii și adolescenții printr-un parcurs educațional clar, atent structurat și adaptat ritmului lor de dezvoltare. Pornim de la curiozitatea naturală a fiecărui copil, construim înțelegerea pas cu pas și consolidăm cunoștințele prin practică bine orientată.",
    "Creăm un cadru în care elevii își consolidează baza academică, capătă autonomie în lucru și își dezvoltă încrederea. Rezultatele apar treptat, prin explicații clare, exercițiu constant și sprijin adaptat fiecărui copil.",
  ],
} as const;

export const processIntro = {
  title: "Cum lucrăm",
  description:
    "Un parcurs educațional clar, în care fiecare etapă susține înțelegerea, progresul și încrederea copilului.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    number: "1",
    icon: Lightbulb,
    title: "Stârnim curiozitatea",
    description:
      "Pornim de la întrebări bine alese, de la provocări potrivite vârstei și de la situații care trezesc interesul copilului pentru ceea ce urmează să învețe.",
    accent: "brand",
  },
  {
    number: "2",
    icon: BookOpen,
    title: "Construim înțelegerea",
    description:
      "Explicăm noțiunile clar și structurat, prin metode interactive și activități aplicate, astfel încât elevii să înțeleagă în profunzime ceea ce învață, să coreleze informațiile și să folosească noile cunoștințe în contexte variate.",
    accent: "gold",
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Cultivăm autonomia în învățare",
    description:
      "Prin sprijin atent, feedback clar și repere bine structurate, elevii învață să își urmărească progresul, să lucreze cu mai multă independență și să abordeze sarcinile cu rigoare, claritate și încredere.",
    accent: "brand",
  },
];

export const highlights: FeatureItem[] = [
  {
    icon: Users,
    title: "Grupe mici",
    description: "Atenție individuală pentru fiecare copil.",
  },
  {
    icon: GraduationCap,
    title: "Profesori dedicați",
    description: "Experiență, pasiune și implicare reală.",
  },
  {
    icon: ClipboardCheck,
    title: "Progres măsurabil",
    description: "Urmărim evoluția fiecărui elev și adaptăm parcursul.",
  },
  {
    icon: Heart,
    title: "Mediu prietenos",
    description: "Atmosferă caldă, bazată pe respect și încredere.",
  },
];

export const galleryIntro = {
  title: "Momente din activitățile noastre",
  paragraph:
    "Învățarea se vede cel mai frumos în momentele în care copiii întreabă, descoperă, creează și capătă curaj să meargă mai departe.",
} as const;

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/home-1-v2.jpg",
    alt: "Doi copii scriind împreună la o lecție Up for Learning",
  },
  {
    src: "/images/gallery/home-2-v2.jpg",
    alt: "Elevă citind o carte într-un atelier de lectură",
  },
  {
    src: "/images/gallery/home-3-v2.jpg",
    alt: "Copii lucrând împreună la o activitate",
  },
  {
    src: "/images/gallery/home-4-v2.jpg",
    alt: "Copii într-o excursie educațională în natură",
  },
];

export const programsIntro = {
  title: "Programe",
  subtitle:
    "Programe educaționale structurate, construite pentru progres, rigoare și rezultate vizibile.",
} as const;

export const courses: Course[] = [
  {
    slug: "limba-romana",
    name: "Limba română",
    icon: BookOpen,
    image: "/images/courses/limba-romana-v2.jpg",
    tags: "Lectură · Vocabular · Redactare",
    description:
      "Texte, cerințe, exprimare scrisă și răspunsuri clare, complete și argumentate.",
    grades: "Clasele I – VIII",
    accent: "brand",
  },
  {
    slug: "matematica",
    name: "Matematică",
    icon: Calculator,
    image: "/images/courses/matematica-v2.jpg",
    tags: "Raționament · Probleme · Geometrie",
    description:
      "Calcul, reprezentări, exerciții gradate și strategii de rezolvare.",
    grades: "Clasele I – VIII",
    accent: "gold",
  },
  {
    slug: "limba-engleza",
    name: "Limba engleză",
    icon: MessagesSquare,
    image: "/images/courses/limba-engleza-v2.jpg",
    tags: "Comunicare · Gramatică · Examene Cambridge",
    description:
      "Exprimare orală și scrisă, vocabular activ, gramatică aplicată și pregătire pentru Cambridge English.",
    grades: "Clasele I – VIII",
    accent: "brand",
  },
];

export const programHighlights: ProgramHighlight[] = [
  {
    slug: "evaluari-nationale",
    title: "Evaluări Naționale",
    tags: "Clasele II · IV · VI · VIII",
    description:
      "Itemi, cerințe, bareme, gestionarea timpului și siguranță în evaluare.",
    badge: "Pregătire structurată",
    icon: ClipboardList,
    accent: "brand",
  },
  {
    slug: "ateliere-de-dezvoltare",
    title: "Ateliere de dezvoltare",
    tags: "Lectură · Caligrafie · Scriere creativă",
    description:
      "Atenție, concentrare în exprimare, finețe grafică și creativitate.",
    badge: "Ateliere complementare",
    icon: Sprout,
    accent: "gold",
  },
];

export const programFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Grupe mici",
    description: "Atenție individuală pentru fiecare elev.",
  },
  {
    icon: Target,
    title: "Obiective clare",
    description: "Plan personalizat și monitorizare constantă.",
  },
  {
    icon: BarChart3,
    title: "Progres măsurabil",
    description: "Rezultate vizibile și feedback constant.",
  },
  {
    icon: ShieldCheck,
    title: "Mediu sigur și motivant",
    description: "Încredere, respect și susținere la fiecare pas.",
  },
];

export const programsClosing =
  "Alege programul potrivit și hai să construim, pas cu pas, un parcurs educațional solid.";

export const aboutIntro = {
  eyebrow: "Fiecare progres solid începe cu o bază construită corect.",
  title: "Un proces educațional clar, construit cu grijă",
  paragraphs: [
    "La Up for Learning, fiecare copil este ghidat printr-un proces educațional clar și bine structurat, în care curiozitatea devine punctul de plecare, cunoștințele se construiesc logic, iar progresul se dezvoltă prin practică, consecvență și atenție la fiecare etapă.",
    "Creăm un cadru în care elevii își consolidează baza academică, își dezvoltă autonomia în lucru și capătă mai multă încredere în propriile capacități. Astfel, rezultatele apar firesc, ca expresie a unui parcurs construit corect.",
  ],
} as const;

export const values: ValueItem[] = [
  {
    icon: Search,
    title: "Claritate",
    description: "Explicăm pas cu pas și așezăm învățarea pe baze solide.",
    accent: "brand",
  },
  {
    icon: TrendingUp,
    title: "Consecvență",
    description: "Exersăm progresiv și consolidăm prin practică bine orientată.",
    accent: "gold",
  },
  {
    icon: Heart,
    title: "Încredere",
    description: "Copiii devin mai siguri, mai autonomi și mai implicați.",
    accent: "brand",
  },
];

export const tripsIntro = {
  title: "Excursii tematice și tabere educaționale",
  subtitle:
    "Învățăm dincolo de clasă. Descoperim lumea împreună, prin aventură, curiozitate și prietenie. Natură, cultură, știință și creativitate – experiențe care rămân în suflet.",
} as const;

export const thematicTrips: CategoryItem[] = [
  {
    slug: "istorie-si-traditii",
    title: "Istorie și tradiții",
    icon: Landmark,
    image: "/images/trips/istorie-v2.jpg",
  },
  {
    slug: "stiinta-si-tehnologie",
    title: "Știință & tehnologie",
    icon: Rocket,
    image: "/images/trips/stiinta-v2.jpg",
  },
  {
    slug: "natura-si-ecologie",
    title: "Natură & ecologie",
    icon: Leaf,
    image: "/images/trips/natura-v2.jpg",
  },
  {
    slug: "cultura-si-arta",
    title: "Cultură & artă",
    icon: Palette,
    image: "/images/trips/cultura-v2.jpg",
  },
];

export const educationalCamps: CategoryItem[] = [
  {
    slug: "tabere-in-natura",
    title: "Tabere în natură",
    icon: Trees,
    image: "/images/trips/tabara-natura-v2.jpg",
  },
  {
    slug: "tabere-de-dezvoltare-personala",
    title: "Tabere de dezvoltare personală",
    icon: Users,
    image: "/images/trips/tabara-dezvoltare-v2.jpg",
  },
  {
    slug: "tabere-creative",
    title: "Tabere creative",
    icon: Brush,
    image: "/images/trips/tabara-creativa-v2.jpg",
  },
  {
    slug: "tabere-de-limba",
    title: "Tabere de limbă",
    icon: MessagesSquare,
    image: "/images/trips/tabara-limba-v2.jpg",
  },
];

export const tripsClosing =
  "Experiențe care inspiră, prietenii care rămân și amintiri care formează.";

export const courseOptions: string[] = [
  "Limba română",
  "Matematică",
  "Limba engleză",
  "Evaluări Naționale",
  "Ateliere de dezvoltare",
  "Excursii tematice și tabere",
  "Nu sunt sigur/ă încă",
];
