import {
  Backpack,
  BarChart3,
  BookOpen,
  Brush,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  FileCheck,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Languages,
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
  CoursePrice,
  FeatureItem,
  GalleryImage,
  ProcessStep,
  ProgramHighlight,
  TeamMember,
  ValueItem,
} from "@/types";

const coursePrice: CoursePrice = {
  amount: 80,
  currency: "RON",
  unit: "oră",
  note: "2 ore/sesiune",
};

const clubPrice: CoursePrice = {
  amount: 100,
  currency: "RON",
  unit: "zi",
  note: "2 ore/zi",
};

export const comingSoon = {
  label: "Coming soon",
  text: "Ne deschidem porțile în curând, în Voluntari. Înscrierile sunt deja deschise.",
} as const;

export const heroCopy = {
  eyebrow: "Fiecare progres solid începe cu o bază construită corect.",
  title: "Up for Learning",
  subtitle: "From Curiosity to Performance",
  paragraphs: [
    "Up for Learning este un centru educațional pentru copii și adolescenți, în care pregătirea academică este completată de formarea unui mod clar, organizat și autonom de a gândi și de a lucra.",
    "Prin programe de pregătire și ateliere, elevii își consolidează cunoștințele, înțeleg legăturile dintre noțiuni și învață să aplice ceea ce știu în contexte diferite. Explicațiile clare, exercițiile gradate, recapitulările și provocările adaptate nivelului elevilor asigură continuitatea învățării.",
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

export const enrollmentPromo = {
  badge: "Înscrieri deschise",
  title: "Am deschis înscrierile!",
  subtitle: "Rezervă un loc și beneficiază de reducerile noastre:",
  discounts: [
    {
      value: "5%",
      description: "reducere dacă alegi două programe Up for Learning",
    },
    {
      value: "10%",
      description:
        "reducere la plata integrală a cursului pentru tot anul academic",
    },
  ],
  note: "Reducerile se cumulează.",
  cta: "Rezervă un loc",
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
    price: coursePrice,
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
    price: coursePrice,
    accent: "gold",
  },
  {
    slug: "clubul-de-dupa-ore",
    name: "Clubul de după ore",
    icon: Backpack,
    image: "/images/courses/club-dupa-ore.jpg",
    tags: "Teme · Pregătire suplimentară · Cluburi de lectură",
    description:
      "Sprijin la teme, recapitulări și lectură, într-un cadru organizat, după programul de școală.",
    grades: "Clasele P – IV",
    price: clubPrice,
    accent: "gold",
  },
  {
    slug: "limba-engleza",
    name: "Limba engleză",
    icon: MessagesSquare,
    image: "/images/courses/limba-engleza-v2.jpg",
    tags: "Comunicare · Gramatică · Examene Cambridge",
    description:
      "Exprimare orală și scrisă, vocabular activ, gramatică aplicată și pregătire pentru examenele Cambridge.",
    grades: "Clasele P – VIII",
    price: coursePrice,
    accent: "brand",
  },
];

export const programHighlights: ProgramHighlight[] = [
  {
    slug: "limba-germana",
    title: "Limba germană",
    tags: "Vocabular · Gramatică · Conversație",
    description:
      "De la primele cuvinte până la exprimarea nuanțată: structură clară, pronunție corectă și încredere în comunicare.",
    badge: "Curs de limbă",
    icon: Languages,
    accent: "brand",
    grades: "Clasele P – XII",
    price: "80 lei/oră",
  },
  {
    slug: "limba-franceza",
    title: "Limba franceză",
    tags: "Vocabular · Gramatică · Conversație",
    description:
      "Exprimare orală și scrisă, gramatică aplicată și deschidere către cultura francofonă, pas cu pas, la orice nivel.",
    badge: "Curs de limbă",
    icon: Globe,
    accent: "gold",
    grades: "Clasele P – XII",
    price: "80 lei/oră",
  },
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
    slug: "simulari-evaluari-nationale",
    title: "Simulări Evaluări Naționale",
    tags: "Condiții de examen · Corectare pe barem",
    description:
      "Simulare completă, corectată după barem, urmată de feedback individual pentru fiecare părinte: unde stă copilul acum și ce urmează de lucrat.",
    badge: "Feedback individual",
    icon: FileCheck,
    accent: "gold",
    grades: "Clasele II · IV · VI · VIII",
    price: "120 lei/simulare",
  },
  {
    slug: "ateliere-de-dezvoltare",
    title: "Ateliere de dezvoltare",
    tags: "Lectură · Caligrafie · Scriere creativă",
    description:
      "Atenție, concentrare în exprimare, finețe grafică și creativitate.",
    badge: "Ateliere complementare",
    icon: Sprout,
    accent: "brand",
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
    "La Up for Learning, pregătirea înseamnă mai mult decât acumularea de informații. Înseamnă formarea unor elevi care știu să gândească, să învețe și să aplice cu încredere ceea ce au înțeles.",
    "Punem accent pe strategiile de lucru care îi ajută pe elevi să își organizeze ideile, să analizeze o cerință, să identifice pașii de rezolvare, să argumenteze, să verifice și să corecteze. Nu urmărim doar răspunsul corect, ci procesul prin care copilul ajunge la el și capacitatea de a aplica strategiile învățate în contexte noi.",
    "În grupele restrânse, putem observa felul în care fiecare elev înțelege, lucrează și progresează. Construim baze academice solide, autonomie, perseverență, interes pentru cunoaștere și încredere în ceea ce poate realiza.",
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

export const teamIntro = {
  eyebrow: "Echipa noastră",
  title: "Profesorii care stau lângă fiecare elev",
  description:
    "Oameni cu experiență la catedră, care explică pe înțeles, au răbdare și știu să transforme o oră de curs într-un motiv de curiozitate.",
} as const;

export const team: TeamMember[] = [
  {
    slug: "mihaela-mitrut",
    name: "Mihaela Mitruț",
    role: "Profesor învățământ primar · 23 de ani de experiență",
    image: "/images/team/mihaela-mitrut.jpg",
    description:
      "Douăzeci și trei de ani la catedră au învățat-o că fiecare copil pornește din alt punct și ajunge departe în ritmul lui. Crede într-o educație centrată pe copil, în care răbdarea, încurajarea și încrederea îl ajută să își descopere și să își valorifice propriul potențial.",
  },
  {
    slug: "andreea-fundeanu",
    name: "Andreea Fundeanu",
    role: "Profesor de limba engleză · 10 ani de experiență",
    image: "/images/team/andreea-fundeanu.jpg",
    description:
      "Îmbină cu succes metodele tradiționale și pe cele moderne, pune accent pe gândirea critică și stimulează curiozitatea, astfel încât engleza să fie învățată eficient și folosită cu naturalețe.",
  },
  {
    slug: "alexandra-tudor",
    name: "Alexandra Tudor",
    role: "Profesor de limba și literatura română",
    image: "/images/team/alexandra-tudor.jpg",
    description:
      "Pregătește elevi de gimnaziu și de liceu, cu metode interactive și activități adaptate la ritmul, nivelul și nevoile fiecăruia. Textul devine, la ea la oră, un teren de explorat, nu o lecție de memorat.",
  },
  {
    slug: "ashley-justice",
    name: "Ashley Justice",
    role: "Profesor de limba engleză · vorbitor nativ",
    image: "/images/team/ashley-justice.jpg",
    description:
      "Profesor de origine americană, organizează activități și ateliere în limba engleză. Este profesorul creativ care creează contexte naturale de învățare, în care jocul, conversația și interacțiunea îi ajută pe copii să folosească engleza cu încredere.",
  },
  {
    slug: "lucia-ghita",
    name: "Lucia Ghiță",
    role: "Profesor de matematică",
    image: "/images/team/lucia-ghita.jpg",
    description:
      "Pregătește elevi de gimnaziu și de liceu, îmbinând rigoarea matematicii cu explicații clare și adaptate. Încurajează fiecare elev să gândească logic și să aibă încredere în propriile soluții.",
  },
  {
    slug: "aneliz-craciun",
    name: "Aneliz Crăciun",
    role: "Profesor de limba și literatura română",
    image: "/images/team/aneliz-craciun.jpg",
    description:
      "Pregătește elevi de gimnaziu și de liceu, organizează simulări pentru Evaluarea Națională și oferă feedback individual părinților, ca fiecare familie să știe exact unde se află copilul și ce urmează.",
  },
  {
    slug: "stefania-petcu",
    name: "Ștefania Petcu",
    role: "Profesor de limba germană",
    image: "/images/team/stefania-petcu.jpg",
    description:
      "Cultivă prin limba germană rigoarea exprimării, încrederea în comunicare și deschiderea către o nouă cultură — o limbă învățată temeinic, pas cu pas, fără grabă și fără teamă de greșeală.",
  },
  {
    slug: "oana-eremia",
    name: "Oana Eremia",
    role: "Profesor de limba franceză",
    image: "/images/team/oana-eremia.jpg",
    description:
      "Îmbină frumusețea limbii franceze cu rigoarea exprimării, cultivând naturalețea în comunicare și curiozitatea pentru cultura francofonă.",
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
    image: "/images/trips/istorie.jpg",
  },
  {
    slug: "stiinta-si-tehnologie",
    title: "Știință & tehnologie",
    icon: Rocket,
    image: "/images/trips/stiinta.jpg",
  },
  {
    slug: "natura-si-ecologie",
    title: "Natură & ecologie",
    icon: Leaf,
    image: "/images/trips/natura.jpg",
  },
  {
    slug: "cultura-si-arta",
    title: "Cultură & artă",
    icon: Palette,
    image: "/images/trips/cultura.jpg",
  },
];

export const educationalCamps: CategoryItem[] = [
  {
    slug: "tabere-in-natura",
    title: "Tabere în natură",
    icon: Trees,
    image: "/images/trips/tabara-natura.jpg",
  },
  {
    slug: "tabere-de-dezvoltare-personala",
    title: "Tabere de dezvoltare personală",
    icon: Users,
    image: "/images/trips/tabara-dezvoltare.jpg",
  },
  {
    slug: "tabere-creative",
    title: "Tabere creative",
    icon: Brush,
    image: "/images/trips/tabara-creativa.jpg",
  },
  {
    slug: "tabere-de-limba",
    title: "Tabere de limbă",
    icon: MessagesSquare,
    image: "/images/trips/tabara-limba.jpg",
  },
];

export const tripsClosing =
  "Experiențe care inspiră, prietenii care rămân și amintiri care formează.";

export const courseOptions: string[] = [
  "Limba română",
  "Matematică",
  "Clubul de după ore",
  "Limba engleză",
  "Limba germană",
  "Limba franceză",
  "Evaluări Naționale",
  "Simulări Evaluări Naționale",
  "Ateliere de dezvoltare",
  "Excursii tematice și tabere",
  "Nu sunt sigur/ă încă",
];
