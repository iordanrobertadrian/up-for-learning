# Up for Learning

Website de producție pentru **Up for Learning**, un centru educațional premium din România.
Platforma prezintă programele, atelierele, excursiile tematice și taberele centrului și
permite părinților să înscrie copilul (clasele I–VIII) printr-un formular online. Limba
site-ului este română.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS** pentru stilizare, tokeni de brand în `src/app/globals.css`
- **MongoDB Atlas** + **Mongoose** pentru persistența înscrierilor
- **Server Actions** + **Route Handlers**, **React Hook Form** + **Zod** pentru formulare
- **Framer Motion** pentru animații, **Lucide React** pentru iconițe
- Autentificare admin cu sesiune JWT (`jose`) și parolă hashuită cu `bcryptjs`

## Cerințe

- Node.js 20+
- Un cluster MongoDB (ex. MongoDB Atlas)

## Configurare

1. Instalează dependențele:
   ```bash
   npm install
   ```
2. Copiază fișierul de exemplu și completează valorile locale:
   ```bash
   cp .env.example .env.local
   ```
   `.env.example` documentează toate variabilele necesare (bază de date, sesiune,
   credențiale admin, SMTP, integrări). **Nu comite niciodată `.env.local` sau valori reale.**
3. Generează hash-ul parolei de admin și pune-l în `.env.local`:
   ```bash
   npm run seed:admin -- "parola-ta"
   ```

## Comenzi

| Comandă | Descriere |
| --- | --- |
| `npm run dev` | Pornește serverul de dezvoltare (implicit pe `:3000`) |
| `npm run build` | Build de producție |
| `npm start` | Rulează build-ul de producție |
| `npm run typecheck` | Verificare de tipuri (`tsc --noEmit`) |
| `npm run lint` | Analiză statică (`eslint`) |
| `npm run seed:admin -- "parola"` | Generează hash-ul bcrypt pentru parola de admin |

Înainte de a considera o schimbare gata, rulează `typecheck`, `lint` și `build` — toate
trebuie să treacă curat.

## Structura proiectului

```
src/
  app/(site)/     Paginile publice (Acasă, Despre noi, Programe, Excursii/Tabere, Contact, Înscriere)
  app/admin/      Panoul de administrare (listă înscrieri, filtrare, status, ștergere)
  components/     Componente UI, secțiuni, carduri, formulare
  config/         Configurare centrală a site-ului (contact, social, integrări)
  constants/      Texte și liste de conținut
  actions/        Server Actions
  services/       Logica de business
  repositories/   Acces la date
  models/         Modele Mongoose
  validators/     Scheme Zod partajate client/server
  lib/            Utilitare (auth, sesiune, SEO, env)
public/           Resurse statice (imagini, iconițe)
```

## Deploy

Țintă de deploy: **Vercel** + **MongoDB Atlas**. Variabilele de mediu se configurează în
dashboard-ul platformei de hosting — nu în repository.

## Licență

Proprietar — toate drepturile rezervate.

---

Realizat de [iWeb Digital](https://iweb-digital.ro).
