# Folder structure

The supplied parent guide separates routes, shared UI, sections, hooks, and utilities. This migration adapts that organization to Next.js App Router, using file-based routes instead of React Router and native metadata instead of React Helmet.

```text
bijaytimilsina/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Shared header, footer, metadata and skip link
│   │   ├── page.tsx            # Scroll-based portfolio
│   │   ├── globals.css         # Original responsive design and motion preferences
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── HeroPortrait.tsx    # Pointer-responsive hero photo
│   │   ├── SpiderIntro.tsx     # Skippable session intro
│   │   ├── SpiderMark.tsx      # Reusable vector emblem
│   │   ├── Header.tsx          # Responsive keyboard-accessible navigation
│   │   ├── Footer.tsx
│   │   ├── PageShell.tsx       # Shared standalone page introduction
│   │   ├── ScrollMotion.tsx    # Scroll progress and hero parallax
│   │   ├── Reveal.tsx          # Progressive enhancement for scroll reveals
│   │   ├── three/OrbitalScene.tsx
│   │   └── sections/          # Home, About, Services, Skills, Projects, Contact
│   ├── data/portfolio.ts       # Single source for personal content and links
│   ├── hooks/useReveal.ts
│   └── utils/seo.ts
├── public/
│   ├── images/                # Original portrait and background image
│   ├── favicon.png
│   ├── CNAME
│   └── .nojekyll
├── legacy/                    # Original static template, assets and notices
├── tests/portfolio.spec.ts     # Navigation, filtering, form, motion and fallback tests
├── playwright.config.ts
├── next.config.ts             # Static export with trailing-slash routes
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

| Route         | Content                                                           |
| ------------- | ----------------------------------------------------------------- |
| `/`           | Hero, about, services, explorations, skills, contact              |
| `/about/`     | Biography and portrait                                            |
| `/services/`  | Areas of practice                                                 |
| `/skills/`    | Grouped toolkit                                                   |
| `/projects/`  | Filterable interests and creative practice                        |
| `/contact/`   | Contact details and form                                          |
| Unknown route | Custom 404 (`out/404.html`; host must serve it for missing paths) |

There is no third-party chat widget or copied project data. UI that needs browser state is isolated in client components; route metadata and static sections render through Next.js.
