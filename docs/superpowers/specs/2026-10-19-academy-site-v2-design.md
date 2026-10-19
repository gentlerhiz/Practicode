# PractiCode Academy site v2: design and build spec

Date: 19 October 2026. Approved design: the PractiCode Academy Site canvas, version 25 (colourful look, dark and light).
The old site is kept on the `practicode-v1` branch.

## Goal

Replace practicode.tech with the PractiCode Learn ("Prism") look, with:

- real content
- an enrolment form on the site, with Paystack and a bank-transfer fallback, replacing the Google Form
- nothing the academy can't back up today

## Stack

The same stack as PractiCode Learn:

- Next.js 16 (App Router, typed routes)
- React 19
- Tailwind CSS 4, using the Prism tokens copied from Learn
- lucide-react icons
- Zod
- Supabase, used only on the server with the secret key
- Resend over its REST API
- Vercel Analytics, which sets no cookies

Dark is the default theme, with a light theme and a sun/moon switch. The switch uses the same boot script as Learn.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/programmes` | Programmes: search, subject and level filters, an "Enrolling now" filter, "Not sure where to start?" paths, what's included |
| `/programmes/front-end-web-development` | Front-End |
| `/programmes/data-analysis` | Data Analysis |
| `/programmes/ui-ux-design` | UI/UX Product Design |
| `/programmes/ai-machine-learning` | AI & ML: coming soon, with a "notify me" form and no enrol button |
| `/siwes` | SIWES and IT students |
| `/about` | About, team, partners, gallery |
| `/enrol` | Enrolment form (`?course=`) |
| `/enrol/confirmed` | After Paystack: the payment is verified on the server |
| `/enrol/received/[id]` | After a bank-transfer registration |
| `/faq` | FAQs, by topic, with search |
| `/contact` | Contact form, map card, partnerships |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post. Launches with two real news posts: Muslim Tech Expo 4.0 and DevFest 2026 |
| `/resources` | The free Notes for Professionals PDFs and the free tools we teach with |
| `/privacy` | Privacy notice |
| `/terms` | Terms of enrolment |
| not found | A 404 page |

Old routes redirect permanently:

- `/courses` goes to `/programmes`.
- The old course slugs go to the matching programme page, or to `/programmes`.
- `/store`, `/solutions`, `/marketers`, `/internship` and `/mentorship` go to `/`.

## Rules

- **Fees** appear only on `/enrol` and the enrolment confirmations.
  - Every programme costs ₦80,000.
  - SIWES and IT students pay ₦40,000, plus a ₦10,000 administrative fee due on resumption. The admin fee is not charged online.
  - The server works out the amount; it never takes it from the browser.
- **Dates:** no cohort start dates anywhere. Use "Enrolling now".
- **Glows:** no glow shadows on cards, tiles or pills. Only the code panels keep a glow.
- **Wording:** British English, no all-caps, no career support, never count tracks.
- **Paystack fees** are not shown; Paystack handles them.

## Enrolment

1. The form collects:
   - email
   - full name, as it should appear on the certificate
   - WhatsApp number
   - programme: Front-End, Data Analysis or UI/UX
   - whether the student is on SIWES/IT. If so, it also asks for matric number, level and the introduction letter (an upload)
   - how they will pay: Paystack, or bank transfer with a transaction ID and/or a receipt upload
   - a confirmation tick
2. A server action validates everything with Zod. Uploads must be PDF, JPG, PNG or WebP, up to 4 MB, and go to the private `academy-uploads` storage bucket. The action then inserts a row into `academy_enrolments`.
3. **Paystack:**
   1. Start a transaction with reference `PCA-…`, the server-computed amount and metadata `{ source: 'academy', enrolment_id }`.
   2. Redirect to Paystack's checkout.
   3. The callback page `/enrol/confirmed?reference=` checks the payment with Paystack: status `success`, currency NGN, amount at least the expected fee, and the reference must belong to the enrolment.
   4. The row is marked `paid`. Only the step that changes the status sends the emails, so a refresh never sends them twice.
   - The Paystack account is shared with PractiCode Learn, and its webhook points at Learn. Learn ignores charges that aren't Learn subscriptions, so the academy relies on the callback check.
4. **Bank transfer:** the row is saved as `transfer_submitted`, both emails are sent, and the student goes to `/enrol/received/[id]`. The id is an unguessable UUID.
5. **Emails**, sent from `PractiCode Academy <academy@practicode.tech>` with replies to practicodeacademy@gmail.com:
   - a confirmation to the student
   - a notice to the academy inbox. It links to the uploads through signed URLs that last seven days.
6. **Safety switch:** with a `sk_test_` key in production, the Paystack option is turned off and students pay by bank transfer. This stops test-mode payments being recorded as real ones. Set `PAYSTACK_ALLOW_TEST=1` to override.
7. **Fallback:** if the server secrets are missing, the forms show a WhatsApp link and the old Google Form link instead of failing.

The contact form writes to `academy_messages`, and the AI waitlist writes to `academy_waitlist`. Each also sends an email to the academy.

## Data

The tables live in the shared Supabase project and are created by `supabase/academy.sql`. The file is run by hand with `execute_sql`, so it stays out of Learn's migration history.

- Every table has row-level security turned on and no policies, so only the server's secret key can reach it.
- The `academy-uploads` bucket is private.

## Environment variables (Vercel, Academy project)

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://practicode.tech` |
| `NEXT_PUBLIC_SUPABASE_URL` | The shared Supabase project |
| `SUPABASE_SECRET_KEY` | The shared Supabase project |
| `PAYSTACK_SECRET_KEY` | The same key as Learn |
| `RESEND_API_KEY` | Learn's Resend key |
| `ACADEMY_INBOX` | Optional. Defaults to practicodeacademy@gmail.com |
| `EMAIL_FROM` | Optional. Defaults to `PractiCode Academy <academy@practicode.tech>` |
| `PAYSTACK_ALLOW_TEST` | Optional. See the safety switch above |

## Checks before pushing to main

- `npm run lint`, `npm run typecheck`, `npm test` (Vitest: fee maths, validation, the payment decision) and `npm run build` all pass.
- Screenshots of every page in dark and light, at desktop and phone width, compared with the canvas.
- A real test enrolment through Paystack test mode and one by bank transfer, run locally against the real database, with both emails received.
