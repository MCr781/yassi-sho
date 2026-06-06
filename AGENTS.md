# AGENTS.md - Yassi Sho

> موجع سریع برای OpenCode: هر چیزی که اگر نبود، agent احتمالاً اشتباه می‌کرد.

## Project at a Glance
- **Name:** Yassi Sho (یاسی شو) — Phase 1 charity demo
- **Stack:** Static HTML5 + Tailwind CSS v4 (CLI, not CDN) + Vanilla JS + FontAwesome 6 + Vazirmatn font
- **Lang:** Persian (RTL, `lang="fa" dir="rtl"` on every page)
- **Hard constraint:** Mobile-first. **99% of traffic is mobile.** All UI/UX must be flawless on phones; desktop is a bonus. See `GEMINI.md` and `phase1-roadmap.md` for the full spec.
- **No build step for HTML/JS** — open any `.html` directly. Only CSS goes through Tailwind.

## Dev Commands
```bash
npm run dev                          # Watch mode: npx tailwindcss -i src/input.css -o assets/css/style.css --watch
npx tailwindcss -i src/input.css -o assets/css/style.css   # One-shot build
```
CSS is committed to `assets/css/style.css`. Don't forget to rebuild after editing `src/input.css` or `tailwind.config.js` — the `<link>` in every HTML points to the compiled file.

## File Map
- **HTML (10 root files, each one a page):** `index.html` (home), `about.html`, `contact.html`, `board-order.html`, `deceased-detail.html`, `projects-archive.html`, `project-detail.html`, `profile.html`, `register.html`, `payment.html`
- **CSS sources:** `src/input.css` (Tailwind v4 entry, custom theme), `tailwind.config.js` (Vazirmatn font family + content paths)
- **Assets:** `assets/css/`, `assets/fonts/`, `assets/images/`, `assets/webfonts/`
- **Reference docs (read before non-trivial work):** `GEMINI.md`, `phase1-roadmap.md`, `docs_instructions/INSTRUCTIONS/`
- **`payment.html` is the outlier** — it has no header/footer (standalone donation card layout).

## Tailwind v4 Quirks (this repo, not v3)
- Entry is `src/input.css` with `@import "tailwindcss";` + `@config "../tailwind.config.js";`
- Custom theme tokens live in `@theme { ... }` block: `--font-vazir`, `--color-brand-*`
- Brand colors: `brand-purple-dark` (#7b2c83), `brand-purple-light` (#9e64a4), `brand-pink` (#e91e63), `brand-blue` (#3f51b5), `brand-cyan` (#00bcd4), `brand-gray` (#757575)
- Do **not** add a `tailwind.config.js` plugin for these — define in `input.css` `@theme` block.

## RTL Rules (strictly enforced per `phase1-roadmap.md`)
- **Always use logical properties:** `ps-*`/`pe-*` (padding), `ms-*`/`me-*` (margin), `start-*`/`end-*` (position), `inset-inline-*`.
- **Banned:** `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*` (unless for layout positioning that is genuinely direction-agnostic, which is rare).
- The mobile menu drawer slides from the **right** (start side in RTL).
- `text-align: right` is implicit for RTL; use `text-start`/`text-end` not `text-left`/`text-right`.

## Mobile-First Patterns (already established — match them)

### Header (all 9 pages with header — see `index.html` lines 17-97 as canonical)
- Outer: `<header class="sticky top-0 ... shadow-sm z-50">` with inner `<div class="relative ... h-16 md:h-20 flex justify-between items-center gap-3">`
- Mobile: hamburger button on the **right** (start side) opens `#mobile-menu` drawer.
- Logo is `flex-1 md:flex-none md:absolute md:left-1/2 md:-translate-x-1/2` (flex on mobile for centering, absolute on desktop).
- Right side (desktop only): nav links. Left side: `فارسی | EN` switcher + social icons.
- Mobile menu drawer: `<div id="mobile-menu" class="fixed inset-0 z-[60] hidden md:hidden">` — backdrop + panel sliding from right, `w-72 max-w-[85vw]`. Toggled via `onclick` (no JS framework). Body scroll lock via `document.body.classList.add/remove('overflow-hidden')`.
- **Header height is `h-16` (64px) on mobile, `h-20` (80px) on `md+`.** Main content must use `pt-16 md:pt-20` to clear the sticky header. Do not use `pt-20` everywhere.

### Sidebar + Main layout (used in 5 pages: index, about, contact, profile, projects-archive)
- Wrapper: `flex flex-col lg:flex-row gap-8 md:gap-12` — stacks on mobile, side-by-side on `lg+`.
- `<aside class="w-full lg:w-[300px] shrink-0 flex flex-col items-center gap-6 md:gap-8 lg:border-l lg:pl-10">` (border on left because sidebar is on the right in RTL).
- Filter buttons: horizontal scrollable row on mobile (`flex-row overflow-x-auto snap-x`), vertical stack on `md+` (`md:flex-col md:overflow-visible`).
- Intro text card: `hidden sm:block` (skipped on phones to save vertical space).
- Login CTA: `w-full max-w-[320px]` with `py-3` button.

### Touch targets
- Buttons: minimum `py-3` (12px) for ~44px height (Apple/Google minimum).
- Inputs: `py-3` minimum; `py-2.5` is too small.
- Form labels: `mb-1.5` for breathing room.

### Modals (OTP, gallery, upload)
- Pattern: `<div id="X-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/60 backdrop-blur-sm p-4">` with `max-w-md` inner card. Toggle via `onclick="document.getElementById('X-modal').classList.remove('hidden'); document.getElementById('X-modal').classList.add('flex');"`.
- Use `max-h-[90vh] overflow-y-auto` on the inner card for long content.

## Content Quirks
- Persian digits in prices (`۵۰۰,۰۰۰`) and dates (`۱۴۰۳/۰۴/۱۲`) — keep them, don't convert to ASCII.
- Phone inputs: `dir="ltr" placeholder="09123456789"` so users see numbers left-to-right.
- `text-sm` + `font-bold` is the standard readable size for body. `text-[13px]` for fine print.
- FontAwesome 6 is loaded locally from `assets/css/all.css` (not CDN).

## Things to NOT do
- Do not introduce `ml-*`/`mr-*`/`left-*`/`right-*` (RTL violation).
- Do not set `min-h-screen` on the body of pages with sticky header without accounting for the header height.
- Do not add JS frameworks — repo is intentionally vanilla.
- Do not put interactive logic in CSS — modal toggling is in `onclick` attributes for demo simplicity.
- Do not add hover-only interactions to critical flows (mobile has no hover).

## Common Tasks
- **Add a new page:** copy `index.html` shell (head, header, mobile-menu, footer) — they are nearly identical across files. Update the `<title>` and active nav state.
- **Add a form field:** wrap with `relative` + `fa-*` icon positioned with `start-4` (not `left-4`). Use `py-3` minimum padding, `text-sm`, `bg-slate-50 border border-slate-200 rounded-xl`, focus ring `focus:border-brand-purple-light focus:ring-2 focus:ring-brand-purple-light/20`.
- **Recompile CSS after edits:** `npx tailwindcss -i src/input.css -o assets/css/style.css` (one-shot) or `npm run dev` (watch).

## Verification
There is no test suite. Verify by:
1. Run `npx tailwindcss -i src/input.css -o assets/css/style.css` — should complete in <1s with no errors.
2. Open `index.html` in a browser at <400px width to spot-check mobile menu, header height, and sidebar stacking.
3. Toggle the OTP login modal via the sidebar CTA to confirm modal pattern works.
