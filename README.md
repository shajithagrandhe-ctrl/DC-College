# DC College

DC College is a frontend-only college website built with React, TypeScript, Vite, Tailwind CSS, React Router, GSAP, Framer Motion, Lenis, and Lucide icons. It presents academic programs, admissions guidance, placements, student life, infrastructure, college leadership, and contact options for prospective students and visitors.

## Key Features

- Home page with video hero, course previews, gallery, testimonials, and WhatsApp enquiry form.
- Course listing and detail pages for BBA, BCA, B.Com Computer Applications, and B.Sc Computer Science.
- Admissions page with eligibility tabs, process timeline, required documents, FAQ, and enquiry form.
- Placements page with statistics, recruiter logos, student story filtering, career-development sections, and testimonials.
- About, life-at-DC, infrastructure, and contact pages.
- Client-side form validation with WhatsApp handoff.
- Static content managed through TypeScript data files.

## Technology Stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build Tool | Vite 6 |
| Routing | React Router DOM |
| Styling | Tailwind CSS, global CSS |
| Animation | GSAP, Framer Motion, Lenis |
| Icons | Lucide React |
| Data | Local TypeScript modules |

## Architecture

The project is a static React single-page application. It has no backend server, database, authentication layer, or internal HTTP API in the current codebase. Pages read local data from `src/data`, render static assets from `public`, and use browser integrations for WhatsApp, phone, email, and Google Maps.

See [Architecture](docs/ARCHITECTURE.md) for details.

## Prerequisites

- Node.js and npm.
- A modern browser.

The exact Node.js version is not specified in the repository.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print the local development URL.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/   Shared UI and layout components
├── data/         Static content and configuration
├── hooks/        Reusable React hooks
├── pages/        Route-level pages
├── styles/       Global styles
├── App.tsx       Routes and application shell
└── main.tsx      React entry point
```

Static assets are stored under `public/images` and `public/videos`.

## Configuration

Public college contact configuration is stored in:

```text
src/data/config.ts
```

No `.env` file or environment-variable usage was found. Do not store secrets in frontend source files.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server. |
| `npm run build` | Run TypeScript build and Vite production build. |
| `npm run preview` | Preview the production build locally. |

## Documentation

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Features](docs/FEATURES.md)
- [Setup and Installation](docs/SETUP_AND_INSTALLATION.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database and Storage](docs/DATABASE.md)
- [Authentication and Security](docs/AUTHENTICATION_AND_SECURITY.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [Dependencies](docs/DEPENDENCIES.md)
- [Deployment](docs/DEPLOYMENT.md)

## Troubleshooting

- If dependencies are missing, run `npm install`.
- If an image or video does not appear, verify the referenced file exists under `public`.
- If route refreshes fail after deployment, configure the host to serve `index.html` for client-side routes.
- If WhatsApp does not open, check browser popup behavior and the configured WhatsApp number.

## Development Notes

Keep application content changes grounded in the existing data modules. If a backend, CMS, authentication, or database is added later, document the new environment variables, APIs, and deployment requirements before release.
