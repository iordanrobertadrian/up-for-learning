import type { NavItem } from "@/types";

export const ROUTES = {
  home: "/",
  about: "/despre-noi",
  programs: "/programe",
  trips: "/tabere",
  contact: "/contact",
  enroll: "/inscriere",
  privacy: "/politica-de-confidentialitate",
  cookies: "/politica-cookies",
  terms: "/termeni-si-conditii",
  admin: "/admin",
  adminLogin: "/admin/login",
} as const;

export const mainNav: NavItem[] = [
  { label: "Acasă", href: ROUTES.home },
  { label: "Despre noi", href: ROUTES.about },
  { label: "Programe și ateliere", href: ROUTES.programs },
  { label: "Excursii tematice și tabere", href: ROUTES.trips },
  { label: "Contact", href: ROUTES.contact },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Educație",
    links: [
      { label: "Programe și ateliere", href: ROUTES.programs },
      { label: "Excursii tematice și tabere", href: ROUTES.trips },
      { label: "Înscrie-te", href: ROUTES.enroll },
    ],
  },
  {
    title: "Up for Learning",
    links: [
      { label: "Despre noi", href: ROUTES.about },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Politica de confidențialitate", href: ROUTES.privacy },
      { label: "Politica de cookies", href: ROUTES.cookies },
      { label: "Termeni și condiții", href: ROUTES.terms },
    ],
  },
];
