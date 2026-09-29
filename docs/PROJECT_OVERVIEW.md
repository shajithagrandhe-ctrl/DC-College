# Project Overview

## Introduction

DC College is a static, client-rendered college website built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, GSAP, Lenis, and Lucide icons. The application presents information about DC College programs, admissions, placements, campus life, infrastructure, leadership, and contact options.

## Purpose

The application helps prospective students and visitors explore DC College, understand available undergraduate programs, review admission guidance, view placement information, and contact the admissions team through phone, email, Google Maps, or WhatsApp.

## Problem Statement

Prospective students need a single web experience where they can discover courses, compare eligibility details, understand admissions, view campus and placement information, and make an enquiry without navigating multiple disconnected sources.

## Proposed Solution

The implementation provides a responsive React single-page application with dedicated routes for the major college information areas. Most content is stored in local TypeScript data files and rendered by reusable page and component modules. Enquiry forms validate required fields client-side and open WhatsApp with a pre-filled admissions message.

## Target Users

- Prospective students exploring undergraduate programs.
- Parents or guardians reviewing admissions and campus information.
- College staff maintaining content and assets.
- Developers extending or deploying the website.

## Main Objectives

- Present DC College programs and campus information in a polished web interface.
- Provide course detail pages for BBA, BCA, B.Com Computer Applications, and B.Sc Computer Science.
- Route enquiry actions toward the admissions team through WhatsApp, phone, or email.
- Showcase placements, recruiters, campus life, infrastructure, leadership, and contact information.

## Core Features

- Home page with video hero, course previews, statistics, gallery, testimonials, and enquiry form.
- About page with college story, infrastructure links, and authorities.
- Courses listing and course detail routes.
- Admissions page with eligibility tabs, process timeline, documents, FAQ, and enquiry form.
- Placements page with statistics, recruiter logos, filterable student stories, development journey, and testimonials.
- Life at DC page for student life and campus activities.
- Academic and non-academic infrastructure pages.
- Contact page with enquiry form, contact links, Google Maps embed, office hours, and FAQ.

## Major Modules

| Module | Implementation |
| --- | --- |
| Routing | `src/App.tsx` defines all React Router routes. |
| Pages | `src/pages/*.tsx` contains route-level screens. |
| Shared UI | `src/components/*.tsx` contains navigation, footer, cards, progress, modals, and visual helpers. |
| Data | `src/data/*.ts` stores course, placement, recruiter, infrastructure, authority, and college configuration data. |
| Styling | `src/styles/globals.css` and `tailwind.config.ts`. |
| Animations | GSAP, Framer Motion, Lenis, and custom scroll reveal hooks. |
| Assets | `public/images`, `public/videos`, and reference media under `dc_college_reference_media`. |

## Application Workflow

1. The browser loads `index.html`.
2. `src/main.tsx` mounts React inside `#root` and wraps `App` in `BrowserRouter`.
3. `src/App.tsx` lazy-loads page components, renders shared navigation/footer, applies page transitions, and resets scroll on route changes.
4. Pages render static data from `src/data`.
5. Enquiry forms validate required fields and open WhatsApp using `collegeConfig.whatsapp`.

## Technology Choices

- React and TypeScript are used for component-based UI development.
- Vite provides local development, TypeScript build integration, and production bundling.
- React Router handles client-side navigation.
- Tailwind CSS and custom global CSS handle presentation.
- GSAP, Framer Motion, and Lenis support scroll effects and route/page animations.

## Current Project Scope

The current codebase is a frontend-only informational website. No backend application, database, authentication system, or server-side enquiry processing was found.

## Known Limitations

- No server-side API or database persists enquiries.
- No authentication or protected administration area exists.
- Some data-driven infrastructure image paths in `src/data/infrastructure.ts` reference files that are not visible in the current `public/images/campus` listing.
- `src/components/EnquiryModal.tsx` exists but is not mounted by `src/App.tsx`.
- Contact and social links are configured locally in `src/data/config.ts`; the Instagram and Facebook URLs are generic domains in the current code.

## Potential Future Improvements

These are suggestions only and are not implemented in the current codebase:

- Add a backend or form service to persist and route enquiries.
- Add a CMS or structured content source for non-developer updates.
- Add production deployment configuration for the chosen hosting platform.
- Add automated tests for routing, forms, and important UI flows.
- Add asset validation to catch missing image/video references during development.
