# Developer Guide

## Codebase Organization

The application is organized by route-level pages, shared components, static data modules, hooks, and global styles.

- Add page-level behavior in `src/pages`.
- Add reusable UI in `src/components`.
- Add static content records in `src/data`.
- Add shared hooks in `src/hooks`.
- Add global/custom styling in `src/styles/globals.css` and Tailwind theme values in `tailwind.config.ts`.

## Development Workflow

```bash
npm install
npm run dev
```

Before sharing changes, run:

```bash
npm run build
```

## Adding A New Page

1. Create a page component in `src/pages`.
2. Add a lazy import in `src/App.tsx`.
3. Add a `<Route>` entry in `src/App.tsx`.
4. Add navigation links in `Navbar` or other appropriate components if the page should be user-accessible.
5. Add required styles and assets.

## Adding Or Modifying A Course

1. Update `src/data/courses.ts`.
2. Ensure the `slug` is unique.
3. Add or verify the course image under `public/images/courses`.
4. If the course needs a custom detail layout, update `src/pages/CourseDetail.tsx`.
5. Verify `/courses` and `/courses/:slug` in the browser.

## Adding A Reusable Component

Place reusable UI in `src/components`. Follow the existing pattern of typed React function components and keep data-specific content in `src/data` where practical.

## Adding An API Or Service

No API/service layer currently exists. If one is introduced:

- Keep service functions separate from page components.
- Do not expose secrets in frontend code.
- Document endpoints and environment variables in `docs/API_DOCUMENTATION.md` and `docs/SETUP_AND_INSTALLATION.md`.

## Modifying Data Models

Static data models are TypeScript interfaces or typed arrays. Update the interface first, then update all consuming components.

Important data files:

- `src/data/courses.ts`
- `src/data/placements.ts`
- `src/data/recruiters.ts`
- `src/data/infrastructure.ts`
- `src/data/authorities.ts`
- `src/data/config.ts`

## Naming Conventions

Observed conventions:

- Route page components use PascalCase filenames, such as `Admission.tsx`.
- Shared components use PascalCase filenames, such as `CourseCard.tsx`.
- Hooks use `use...` naming, such as `useLenis.ts`.
- Data modules use lowercase plural names, such as `courses.ts`.
- CSS class names are mostly descriptive kebab-case strings.

## Architectural Rules From Current Code

- Pages own most page-specific state and animation logic.
- Static content is imported from `src/data`.
- Assets are referenced through root-relative paths under `public`.
- Enquiry actions should use `collegeConfig` rather than duplicating contact values.
- Client-side routes are defined centrally in `src/App.tsx`.

## Common Pitfalls

- Adding asset references that do not exist under `public`.
- Placing private secrets in frontend source.
- Updating course fields without updating all course detail rendering paths.
- Assuming enquiry data is persisted; currently it is only sent through WhatsApp.
- Mounting `EnquiryModal` requires additional state wiring because it exists as a component but is not currently used by `App`.
