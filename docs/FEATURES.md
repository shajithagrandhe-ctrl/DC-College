# Features

## Home Page

**Purpose:** Introduces DC College and routes users to courses, placements, admissions, social/contact links, and enquiries.

**User-facing behavior:** The page includes a video hero, quick social/contact links, course previews, animated statistics, before/after graduation slider, gallery with lightbox, admission preview, testimonials, and an enquiry form.

**Implementation:** `src/pages/Home.tsx` uses local state for galleries, sliders, counters, testimonials, and form validation. It consumes `courses` and `collegeConfig`.

**Validation and errors:** The home enquiry form requires full name, phone number, and selected course. Errors render inline. Valid submissions open WhatsApp with a prefilled message.

## About Page

**Purpose:** Presents the college story, infrastructure overview, and authority/leadership profiles.

**Implementation:** `src/pages/About.tsx` renders hero image rotation, story sections, infrastructure navigation links, and authority cards from `src/data/authorities.ts`. It uses GSAP ScrollTrigger for reveal animations.

## Courses

**Purpose:** Lists academic programs and routes users to detail pages.

**User-facing behavior:** Users can view BBA, BCA, B.Com Computer Applications, and B.Sc Computer Science, then open detail pages or trigger an enquiry.

**Implementation:** `src/pages/Courses.tsx` maps over `src/data/courses.ts` and links each course to `/courses/:slug`.

## Course Details

**Purpose:** Provides detailed program information.

**User-facing behavior:** Course detail pages show overview, duration, eligibility, certifications, career opportunities, skills, highlights, learning experience, and calls to enquire. Course overview downloads are generated as `data:text/plain` URLs in the browser.

**Implementation:** `src/pages/CourseDetail.tsx` selects the course by URL slug. BBA has a dedicated detail layout. BCA, B.Com, and B.Sc CS use premium course configuration objects. Unknown slugs redirect to `/courses`.

## Admissions

**Purpose:** Guides users through admission eligibility, required documents, process steps, FAQs, and enquiry.

**Implementation:** `src/pages/Admission.tsx` uses course data for eligibility tabs and a local enquiry form. It uses GSAP ScrollTrigger for animated sections.

**Validation and errors:** Full name, phone number, and course are required. On success, the page opens WhatsApp and displays a success status message.

## Placements

**Purpose:** Displays placement support, recruiter partners, student stories, and career-readiness activities.

**User-facing behavior:** Users can filter placement stories by course, view recruiter logos, read testimonials, and contact the placement/admissions team.

**Implementation:** `src/pages/Placements.tsx` consumes `placements`, `placementStats`, and `recruiters`. Filtering is client-side React state.

## Life At DC

**Purpose:** Presents student-life and campus-experience content.

**Implementation:** `src/pages/LifeAtDC.tsx` defines local arrays for hero slides, day-in-campus items, gallery entries, events, clubs, testimonials, and related campus-life sections. It uses GSAP ScrollTrigger and local React state for active slides and testimonial controls.

## Infrastructure

**Purpose:** Shows academic and non-academic infrastructure.

**Implementation:** `src/pages/AcademicInfrastructure.tsx` and `src/pages/NonAcademicInfrastructure.tsx` define their displayed infrastructure content locally inside the page files. `src/data/infrastructure.ts` also exists, but the inspected infrastructure pages use page-local arrays.

**Important note:** Some entries in `src/data/infrastructure.ts` reference generated image paths such as `/images/campus/campus-hero.jpg`, which were not visible in the current `public/images/campus` file listing. That data file may be unused by the current infrastructure pages.

## Contact

**Purpose:** Provides direct contact options, enquiry submission via WhatsApp, Google Maps location, office hours, and FAQ.

**Implementation:** `src/pages/Contact.tsx` reads `collegeConfig` for phone, email, address, WhatsApp number, and map query. It embeds Google Maps using an iframe URL derived from `collegeConfig.mapQuery`.

**Validation and errors:** Full name, phone number, and course are required before opening WhatsApp.

## Navigation And Layout

**Purpose:** Provides shared site navigation, footer, scroll progress, and move-to-top UI.

**Implementation:** `src/App.tsx` renders `Navbar`, `Footer`, `ScrollProgress`, and `MoveToTop` around all route pages.

## Enquiry Modal Component

`src/components/EnquiryModal.tsx` implements a modal enquiry form with focus handling and WhatsApp submission. It was not found mounted in `src/App.tsx` during this documentation pass.
