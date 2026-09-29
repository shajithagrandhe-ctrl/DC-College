# Setup And Installation

## Required Software

- Node.js and npm.
- A modern browser.

The exact Node.js version is not specified in the current codebase. The dependency set uses Vite 6, TypeScript 5.7, and React 19.

## Install Dependencies

```bash
npm install
```

The repository includes `package-lock.json`, so npm will install locked dependency versions.

## Environment Configuration

No `.env` file or environment-variable usage was found in the current codebase.

College contact and external-link configuration is stored in:

```text
src/data/config.ts
```

Do not place secrets in this file because it is bundled into the public frontend.

## Run Locally

```bash
npm run dev
```

The script runs:

```bash
vite --host 0.0.0.0
```

Vite will print the local development URL in the terminal.

## Build For Production

```bash
npm run build
```

The build script runs TypeScript project build first, then Vite production build:

```bash
tsc -b && vite build
```

## Preview Production Build

```bash
npm run preview
```

The script runs:

```bash
vite preview --host 0.0.0.0
```

## Common Setup Issues

| Issue | Notes |
| --- | --- |
| Missing dependencies | Run `npm install`. |
| TypeScript build errors | Run `npm run build` and inspect the reported file paths. |
| Missing images | Verify paths under `public/images`; source references use root-relative URLs such as `/images/...`. |
| WhatsApp does not open | Browser popup settings or WhatsApp URL handling may block `window.open`. |
| Google map does not display | Check network access and `collegeConfig.mapQuery`. |

## Database Or Service Setup

Not determined from the current codebase. No database, backend service, or authentication provider setup was found.
