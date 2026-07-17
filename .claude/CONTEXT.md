# CONTEXT — Up for Learning

Fișier de context pentru Claude. Citește-l la începutul fiecărei sesiuni ca să știi ce e în repository, cum e organizat și ce convenții au fost stabilite.

## Ce este proiectul

Website de producție pentru **Up for Learning**, un centru educațional premium din România (SRL, fără alt site). Public-țintă: părinți care vor să-și înscrie copilul (clasele I–VIII) la cursuri, ateliere, excursii și tabere. Limba site-ului: **română**. Ton: cald, profesionist, de încredere.

Sursa de adevăr pentru design și texte au fost 5 poze trimise de client (fostele `1.jpeg`–`5.jpeg` din root, acum șterse — implementate integral). Regula clientului: **design și texte 1:1 după poze**; tot ce nu era în poze a fost eliminat. Materialele-sursă rămân în `references/` (docx cu cerințe, logo, poze de referință).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **React 19**
- **Tailwind CSS** (config: `tailwind.config.ts`, tokens brand în `src/app/globals.css`)
- **MongoDB Atlas** + **Mongoose** (formular de înscriere → DB)
- **Server Actions** + **Route Handlers**, **React Hook Form** + **Zod**, **Framer Motion**, **Lucide React**
- `next/image`, `next/font`. Fără backend separat — totul în Next.

## Comenzi

- `npm run dev` — server de dezvoltare (de obicei pe :3000)
- `npm run build` / `npm start`
- `npm run typecheck` (`tsc --noEmit`), `npm run lint` (`eslint .`)
- `npm run seed:admin -- "parola"` — generează hash bcrypt pentru `ADMIN_PASSWORD_HASH`

Înainte de a considera o schimbare gata: rulează **typecheck + lint + build**; toate trebuie să treacă curat.

## Structura paginilor publice (`src/app/(site)/`)

Meniu (5 iteme, în `src/constants/navigation.ts`): **Acasă · Despre noi · Programe și ateliere · Excursii tematice și tabere · Contact** + buton „Programează o vizită".

- `/` (`page.tsx`) — Hero → „Cum lucrăm" (3 pași) → 4 highlight-uri → galerie „Momente din activitățile noastre".
- `/despre-noi` — hero cu imagine (profesoara + copiii) + 3 valori (Claritate / Consecvență / Încredere).
- `/programe` — titlu „PROGRAME" + 3 carduri (Limba română / Matematică / Limba engleză) + 2 carduri (Evaluări Naționale / Ateliere de dezvoltare) + strip 4 features + CTA. Ruta e `/programe`, dar eticheta din meniu e „Programe și ateliere".
- `/tabere` — „Excursii tematice și tabere": hero cu cercetași + 4 carduri excursii + 4 carduri tabere. Ruta e `/tabere`, eticheta „Excursii tematice și tabere".
- `/contact` — adresă, telefon, email, program, social + Google Maps (`MapEmbed`).
- `/inscriere` — formular pe 5 secțiuni numerotate (vezi mai jos).
- Legal: `/politica-de-confidentialitate`, `/politica-cookies`, `/termeni-si-conditii`.

Pagini/rute care NU există (cerute inițial dar eliminate pentru 1:1 cu pozele): metoda-noastra, ateliere (separat), blog, pagini de prețuri/abonamente, testimoniale, statistici, parteneri, FAQ.

## Conținut (`src/constants/content.ts`)

Toate textele și listele de pe paginile publice sunt aici (heroCopy, processSteps, highlights, galleryImages, courses, programHighlights, programFeatures, values, thematicTrips, educationalCamps, courseOptions etc.). Modifici textele de aici, nu în componente.

## Formular de înscriere — flux complet

Poza 5 a definit un formular pe **5 secțiuni numerotate**:
1. Date de contact: nume, telefon, email
2. Despre copil: vârstă („Între 6 și 18 ani") + clasă („Ex: a VIII-a")
3. Cursul dorit (dropdown din `courseOptions`)
4. Programul preferat: zile **Lu–Du** (selecție multiplă) + un **singur** interval orar (radio)
5. Informații suplimentare: mesaj opțional + acord GDPR

Lanțul de date (nu sări peste niciun strat când adaugi/schimbi câmpuri):
`components/form/enrollment-form.tsx` → `actions/enrollment.actions.ts` → `services/enrollment.service.ts` → `repositories/enrollment.repository.ts` → `models/enrollment.model.ts`.
Validare partajată client+server în `validators/enrollment.validator.ts` (Zod). DTO în `types/index.ts` (`EnrollmentDTO`). Email de notificare: `emails/enrollment-notification.ts`. Opțiuni zile/intervale: `constants/enrollment.ts` (`PREFERRED_DAYS`, `PREFERRED_SCHEDULES`). Protecție anti-spam: honeypot (câmpul `website`).

## Panou admin (`src/app/admin/`)

Autentificare cu parolă (bcrypt hash în `ADMIN_PASSWORD_HASH`) + sesiune JWT (`jose`) — vezi `lib/auth.ts`, `lib/session.ts`, `proxy.ts` (middleware de protecție rute). Dashboard: listă înscrieri cu căutare, filtrare pe status, schimbare status, ștergere, paginare. Componente în `components/admin/`, acțiuni în `actions/admin.actions.ts`.

## Config central (`src/config/site.ts`)

Toate datele de contact/firmă/social/integrări sunt aici (`siteConfig`). **Telefon, email, adresă, Google Maps, social — se schimbă DOAR aici** și se propagă peste tot.
- Telefon curent: `+40 762 689 534`.
- Google Maps: embed de tip `?q=<adresă>&output=embed` (afișează pin la adresă, fără API key). Adresa: Str. Tudor Vladimirescu 40C, Voluntari, Ilfov.
- Multe valori au fallback + override prin env (`NEXT_PUBLIC_*`). Vezi `.env.example`.

## Design system

- Culori brand (Tailwind): `brand` (verde ~#5F8248), `gold` (~#E4A836), `cream`, `sage`, `ink`/`ink-soft`/`ink-muted`. Definite în `tailwind.config.ts` + `globals.css`.
- Primitive UI reutilizabile în `components/ui/`: Button, Badge, IconCircle, Section/SectionHeader, Container, Modal, Toast, Spinner, Pagination, SearchInput, EmptyState, Logo, Decorations (Blob/DotGrid).
- Secțiuni în `components/sections/`, carduri în `components/cards/`.

⚠️ **Gotcha important**: `globals.css` are o regulă globală `h1,h2,h3,h4 { text-ink }` care setează culoarea **direct pe element** → suprascrie orice `text-*` moștenit de la un container. Dacă pui un titlu pe fundal închis, adaugă explicit culoarea (ex. `text-cream`) pe acel `h<n>`, altfel iese închis/ilizibil.

## Imagini (`public/images/`)

Convenție **cache-bust prin nume**: când înlocuiești o imagine existentă, dă-i un nume NOU (sufix `-v2` etc.) și actualizează referința în cod. Dacă păstrezi același nume de fișier, browserul + optimizatorul Next servesc versiunea veche din cache. Fișierele hero/„background" au forma organică + decorațiunile deja incluse (opace, fundal crem) — se plasează ca `<Image>` simplu, iar secțiunea primește un `bg-[#...]` egal cu culoarea colțului imaginii, pentru îmbinare fără cusur.
- Home hero: `home-hero.jpg`. Galerie acasă: `gallery/home-1..4-v2.jpg`. Despre noi: `about/about-hero-v2.jpg`.
- Programe (carduri): `courses/limba-romana-v2.jpg`, `matematica-v2.jpg`, `limba-engleza-v2.jpg`.
- Excursii/tabere: `trips/hero-v2.jpg` + 8 carduri (`istorie-v2`, `stiinta-v2`, `natura-v2`, `cultura-v2`, `tabara-limba-v2`, `tabara-creativa-v2`, `tabara-dezvoltare-v2`, `tabara-natura-v2`).
- Logo: `brand/logo-v2.png` (transparent real; cel vechi avea checkerboard-ul „copt" — de evitat). `sharp` e disponibil în node_modules pentru procesare/decupare imagini.

## SEO

`lib/seo.ts` (`buildMetadata`), `components/seo/json-ld.tsx` (Organization, Website, Breadcrumb, Course), `app/sitemap.ts`, `app/robots.ts`. Fiecare pagină publică setează metadata + breadcrumb JSON-LD.

## Convenții de cod (stabilite explicit de client)

- **Fără comentarii** în cod. Singura excepție păstrată: `// eslint-disable-next-line react-hooks/exhaustive-deps` în `components/admin/enrollment-filters.tsx`. Nu adăuga comentarii noi.
- Fără cod mort, fără fișiere/exporturi nefolosite, fără erori de typecheck/lint, fără `console.log` (există `console.error` intenționat în service/action pentru erori).
- Logica de business stă în services/repositories, nu în componente UI. Preferă Server Components, Server Actions, module reutilizabile.

## Env & deploy

`.env.example` documentează variabilele: `MONGODB_URI`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, SMTP (`SMTP_*` / `MAIL_TO`), `NEXT_PUBLIC_SITE_URL`, social, Google Maps, GA. Țintă de deploy: Vercel + MongoDB Atlas. Fără date reale în repo.

## Note

- Proiectul **nu e sub git** — ștergerile nu au plasă de siguranță; confirmă schimbările mari.
- Data curentă în sesiunile anterioare: iulie 2026. Spațiul fizic al centrului se amenajează; pozele reale vin în a doua jumătate a lui august — imaginile actuale se înlocuiesc doar în `public/images/` (cu nume noi, vezi convenția cache-bust).
