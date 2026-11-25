# Cinematic Spider-Man concept

The home route is a responsive Bahlil Morales promotional experience built with Next.js, Tailwind CSS, Framer Motion and Lucide React.

- 3.5-second skippable intro with reduced-motion support.
- Three-stage transparent character artwork with reversible radial reveal and manual slider.
- Responsive dropdown navigation, game reviews, trailer dialog and official-game store link.
- Accessible dialogs with keyboard dismissal and focus restoration.

Run `npm install` and `npm run dev`. Build the static site with `npm run build` (output: `out/`). Run the focused browser checks with `npx playwright test tests/spiderman.spec.ts` and TypeScript validation with `npm run typecheck`.

The reference video was not attached; the design follows the written brief. This is an independent fictional fan concept. Review scores are illustrative, and the pre-order action explains the concept and links to the real game rather than collecting payments. Trailer playback is embedded from YouTube and needs network access. Character artwork and its generation prompt are documented in `public/images/spiderman/README.md`.

The older portfolio routes and components remain in the repository; their original tests describe the previous home page.

---

# Bijay Timilsina — portfolio

An original Next.js App Router portfolio with TypeScript, Three.js, and responsive CSS. The existing biographical details, social links, and contact API are retained. The parent project's folder guide and redesign branches informed the component boundaries; the design and implementation are new.

## Develop

Requires Node.js 20.9+.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run typecheck
npm run build
npm test
```

The production build produces a static `out/` directory. Browser tests serve that export on port 3117 and currently use `/usr/bin/google-chrome`; change `executablePath` in `playwright.config.ts` for another environment. Contact requests are intercepted in tests so they do not send real messages.

## Deploy

Publish the **contents of `out/`**, not the repository root. This preserves direct route access on static hosts. `public/CNAME` and `.nojekyll` are copied into the export for the existing custom-domain GitHub Pages setup. If using GitHub Pages, configure a build workflow to run `npm ci` and `npm run build`, then upload `out/` as the Pages artifact. The old root HTML deployment is replaced by this build step. Nothing has been deployed automatically.

## Content and behavior

- Edit `src/data/portfolio.ts` for profile details, social links, skills, services, and exploration cards.
- Explore presents interests, not unverified project case studies. Add real project details when available.
- The form uses the existing JSON endpoint with `name`, `email`, and `message`. It handles validation, pending state, success, rate limits, network failure, and timeout. Live delivery depends on that service and its CORS/domain configuration.
- Three.js is dynamically imported in the browser. Rendering stops offscreen, in hidden tabs, on pause, and under reduced-motion preferences. GPU resources and listeners are cleaned up on unmount. A CSS illustration remains if WebGL cannot initialize.
- The original Bootstrap site and its license notices are retained in `legacy/` for reference and rollback. They are not included in the static export.

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for the route and component map.

## Scroll animation

`ScrollMotion` adds a reading-progress line and gently moves the hero artwork as the page scrolls. `useReveal` observes individual `data-reveal` blocks for staggered, one-time entrances; new cards inserted by filters are observed too. Add `data-reveal` inside a `Reveal` wrapper to animate another block. Content stays visible without JavaScript, focused controls reveal immediately, and reduced-motion preferences disable entrances and hero movement, including when changed while browsing.

## Spider-inspired hero

The crimson theme uses Bijay's existing portrait in the hero, with pointer tilt and scroll parallax. `HeroPortrait` owns the pointer interaction; `SpiderMark` is the reusable vector emblem. `SpiderIntro` shows a short, skippable loading-style introduction once per browser session. It is decorative, does not wait for network assets, and automatically clears after 1.8 seconds. Escape or Tab dismisses it, and reduced-motion visitors skip it. The existing Three.js scene remains as a subtle red backdrop.
