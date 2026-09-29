# Authentication And Security

## Authentication

Not determined from the current codebase. No login, signup, authentication provider, session handling, JWT handling, or protected route logic was found.

## Authorization

Not determined from the current codebase. No user roles or permission checks were found.

## Protected Routes

No protected routes were found. All routes defined in `src/App.tsx` are public.

## Sensitive Data Handling

The repository stores public-facing contact configuration in `src/data/config.ts`, including phone number, WhatsApp number, email, address, social URLs, and map query.

No `.env` file or explicit secret variable usage was found.

Because this is a frontend build, all data imported into React source is public in the generated bundle. Do not place API keys, passwords, private tokens, Firebase secrets, or payment credentials in `src/data` or frontend code.

## Input Validation

Admission/contact enquiry forms validate required fields on the client:

- Full name.
- Phone number.
- Course selection.

Email and free-text message fields are optional in the inspected forms. Validation is implemented in page components and modal component state, not in a shared validation library.

## External Links

The app opens several external destinations:

- WhatsApp `wa.me` URLs.
- Google Maps URLs and embedded iframe.
- `tel:` phone links.
- `mailto:` email links.
- Facebook and Instagram URLs from config.

Some external links include `target="_blank"` and `rel="noreferrer"` where implemented.

## Security Considerations

- There is no backend validation because no backend exists.
- Enquiry data is passed to WhatsApp through a URL-encoded message and is not stored by the application.
- The Google Maps iframe and external links depend on third-party services.
- `src/data/config.ts` should remain limited to public contact details.
- Generic social URLs in `collegeConfig` should be reviewed before production use.
- Asset paths should be checked because some image references in data may not match visible files under `public`.
