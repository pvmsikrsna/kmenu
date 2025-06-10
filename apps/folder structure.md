# Folder and File Structure Explanation

This project is organized as a monorepo, with multiple apps and packages. Here’s an overview of the main folders and files:

---

## `/apps`

Contains runnable applications (Next.js apps, example apps, etc.).

- **`/web`**  
  The main Next.js web application for the project.
  - `app/` — Next.js app directory (routes, layouts, pages, providers, global styles).
    - `layout.tsx` — Root layout for the app.
    - `page.tsx` — Main landing page.
    - `providers.tsx` — Sets up React context providers (theme, menu).
    - `globals.css`, `cmdk.css` — Global and command menu CSS.
  - `components/` — React components used in the web app (e.g., `Hero.tsx`, `Footer.tsx`, `CommandMenu.tsx`).
  - `tailwind.config.js` — Tailwind CSS configuration for the web app.
  - `next.config.mjs` — Next.js configuration for the web app.
  - `README.md` — Documentation for the web app.

- **`/examples`**  
  Contains example Next.js apps demonstrating usage of the `kmenu` package.
  - `app/` — Next.js app directory for examples.
    - `examples/` — Example pages/components (e.g., `Basic.tsx`, `Checkbox.tsx`, `Loading.tsx`, `Modal.tsx`, `Nested.tsx`).
    - `styles/` — Example CSS files.
    - `layout.tsx` — Root layout for the example app.
    - `globals.css`, `cmdk.css` — Global and command menu CSS for examples.
  - `next.config.js` — Next.js configuration for the example app.

---

## `/packages`

Contains reusable packages (libraries, UI components, etc.).

- **`/kmenu`**  
  The core command menu package.
  - `src/` — Source code for the command menu library.
    - `typings.d.ts` — TypeScript type definitions.
    - Other files: React components, hooks, utilities, styles.
  - `turbo/` — Code generation and templates for scaffolding new components.
    - `generators/` — Plop/Turbo generators and templates.
      - `config.ts` — Generator configuration.
      - `templates/` — Handlebars templates for new components.
  - `README.md` — Documentation for the `kmenu` package.

---

## Other Files

- `.changeset/` — Changeset configuration for managing package versioning and releases.
- `README.md` — Root documentation for the monorepo.

---

## Example File/Folder Purposes

- **`CommandMenu.tsx`** — Implements the command palette UI and logic.
- **`Hero.tsx`** — Displays the main hero section of the landing page.
- **`Footer.tsx`** — Shows a fixed footer with keyboard shortcut hints.
- **`cmdk.css`** — Styles for the command menu.
- **`tailwind.config.js`** — Tailwind CSS configuration.
- **`next.config.mjs` / `next.config.js`** — Next.js configuration files.

---

For more details on each component or file, see the respective `documentation.md` files in each folder.
