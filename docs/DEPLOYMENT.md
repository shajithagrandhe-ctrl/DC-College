# Deployment

## Production Build

The project builds to static assets with Vite.

```bash
npm run build
```

This runs:

```bash
tsc -b && vite build
```

The output directory is Vite's default `dist`.

## Preview Build

```bash
npm run preview
```

This serves the production build locally through Vite preview.

## Hosting

No hosting-platform configuration was found in the current codebase. There are no detected Netlify, Vercel, GitHub Actions, Docker, or server deployment files.

Because the app is a client-side routed single-page application, production hosting should be configured to serve `index.html` for route refreshes such as `/courses/bba` and `/contact`.

## Environment Variables

No environment variables were found. Public contact configuration is currently stored in `src/data/config.ts`.

## Deployment Requirements

- Install npm dependencies.
- Run the production build.
- Upload or serve the generated `dist` directory.
- Configure SPA fallback routing on the hosting platform.
- Ensure static assets under `public` are included in the build.

## Production Considerations

- Verify all asset paths resolve after deployment.
- Verify WhatsApp, phone, email, social, and Google Maps links.
- Review `src/data/config.ts` for production-ready contact and social URLs.
- Do not add secrets to frontend source.
- Consider adding automated tests and a CI build check before production deployment.
