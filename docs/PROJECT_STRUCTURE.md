# Project Structure

## Directory Tree

```text
.
├── dc_college_reference_media/
├── docs/
├── public/
│   ├── images/
│   │   ├── campus/
│   │   ├── courses/
│   │   ├── logos/
│   │   └── students/
│   └── videos/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

Generated, installed, and build-output directories such as `node_modules`, `dist`, and TypeScript build info files are intentionally excluded from this tree.

## Root Files

| Path | Purpose |
| --- | --- |
| `package.json` | Defines scripts and dependencies. |
| `package-lock.json` | Locks npm dependency versions. |
| `index.html` | Vite HTML entry point with the React root element. |
| `vite.config.ts` | Vite configuration using `@vitejs/plugin-react`. |
| `tailwind.config.ts` | Tailwind content paths, colors, and fonts. |
| `postcss.config.js` | PostCSS configuration for Tailwind and Autoprefixer. |
| `tsconfig.json` / `tsconfig.node.json` | TypeScript compiler configuration. |

## `src`

Contains the application source code.

### `src/App.tsx`

Defines the main app shell, lazy-loaded routes, global navigation/footer, scroll behavior, and page transition wrapper.

### `src/main.tsx`

Mounts React to `#root`, imports global styles, and wraps the app with `BrowserRouter`.

### `src/pages`

Route-level page components:

- `Home.tsx`
- `About.tsx`
- `Courses.tsx`
- `CourseDetail.tsx`
- `Admission.tsx`
- `Placements.tsx`
- `LifeAtDC.tsx`
- `Contact.tsx`
- `AcademicInfrastructure.tsx`
- `NonAcademicInfrastructure.tsx`

### `src/components`

Reusable UI and layout components, including navigation, footer, cards, modals, scroll progress, image reveal helpers, and move-to-top behavior.

### `src/data`

Local TypeScript data modules used by the pages:

- Course definitions and course options.
- Placement stories and statistics.
- Recruiter logo references.
- Infrastructure data module, although current infrastructure page content is primarily page-local.
- Authority/person data.
- Contact and college configuration.

### `src/hooks`

Reusable hooks for smooth scrolling and scroll-triggered reveal behavior.

### `src/styles`

Global styles for the application. Tailwind utility classes are used alongside custom CSS classes.

## `public`

Static files served by Vite at the site root. Source code references assets using paths such as `/images/courses/bba.png` and `/videos/home-campus.mp4`.

## `dc_college_reference_media`

Reference media files and grouped source assets. The application primarily references assets from `public`, not this directory.
