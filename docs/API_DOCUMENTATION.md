# API Documentation

## Internal APIs

No internal HTTP API endpoints were found in the current codebase. The project is a client-rendered static frontend and does not define server routes, API controllers, request handlers, or backend services.

## Consumed APIs And Browser Integrations

The project does not use `fetch`, Axios, or a dedicated API client. It does construct URLs for external browser integrations.

| Integration | Purpose | Implementation |
| --- | --- | --- |
| WhatsApp `wa.me` | Opens admission or placement enquiries with a prefilled message. | `Home.tsx`, `Admission.tsx`, `Contact.tsx`, `EnquiryModal.tsx`; configured through `collegeConfig.whatsapp`. |
| Google Maps search | Opens campus location in Google Maps. | `Home.tsx`, `Contact.tsx`; query derived from `collegeConfig.mapQuery`. |
| Google Maps embed | Embeds map on contact page. | `Contact.tsx` iframe `src` uses `https://www.google.com/maps?q=...&output=embed`. |
| Phone links | Starts a phone call on supported devices. | `collegeConfig.phoneHref`. |
| Email links | Opens email client. | `mailto:${collegeConfig.email}` in contact UI. |

## WhatsApp Enquiry Message Shape

Forms build a plain-text message containing fields such as:

- Full Name
- Phone Number
- Email Address
- Course Interested In
- Message or City, depending on the form

The text is URL-encoded and appended to:

```text
https://wa.me/{collegeConfig.whatsapp}?text={encodedMessage}
```

## Authentication Requirements

Not determined from the current codebase. No authenticated API calls or protected endpoints were found.

## Error Responses

Not applicable for internal APIs because no internal API layer exists. Client-side form validation errors are rendered inline before WhatsApp is opened.
