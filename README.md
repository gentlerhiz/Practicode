# PractiCode Academy website

The website for [practicode.tech](https://practicode.tech): tech classes in Ibadan and online, from Practicode Consult Limited (company registration no. 8415811).

Version 2 (October 2026) is built in the PractiCode Learn "Prism" look, in dark and light. The previous site is kept on the `practicode-v1` branch.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- lucide-react icons
- Zod
- Supabase, used on the server only
- Paystack
- Resend
- Vercel Analytics, which sets no cookies

## Pages

| Page | What's on it |
| --- | --- |
| Home | Hero, programmes, how it works, SIWES, photos, partners, PractiCode Learn, FAQs |
| Programmes | Programme finder, plus one page per programme. AI & Machine Learning is "coming soon", with a "notify me" form |
| SIWES, About, FAQ, Contact | Information pages; Contact has a message form |
| Blog | News posts, written in `src/content/blog.ts` |
| Resources | Free reference PDFs from `public/resources` |
| Privacy, Terms | The privacy notice and terms of enrolment |
| Enrol | The enrolment form, plus two confirmation pages |

Most content lives in `src/content`: programmes, FAQs, the team, partners, blog posts and the legal pages. Edit it there.

## Enrolment

The form saves a row in `academy_enrolments`, in the Supabase project shared with PractiCode Learn. Introduction letters and transfer receipts go to the private `academy-uploads` bucket. The tables and bucket are created by `supabase/academy.sql`.

- **Paystack:** the student pays on Paystack's checkout. When Paystack sends them back to `/enrol/confirmed`, the server checks the payment with Paystack and marks the enrolment `paid`.
- **Bank transfer:** the enrolment is saved as `transfer_submitted`, for the academy to check against the account.

Each enrolment emails the student and the academy inbox. The academy email links to any uploads.

The Paystack account is shared with PractiCode Learn. Learn's webhook ignores Academy charges, so Academy payments are confirmed only on the return page.

**Test keys are switched off in production.** With a `sk_test_` key, the live site offers bank transfer only, so test cards can't create real enrolments. Set `PAYSTACK_ALLOW_TEST=1` to override this on purpose.

## Run it

```bash
cp .env.example .env.local   # then fill it in
npm install
npm run dev
```

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## Environment variables (Vercel)

| Name | Notes |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://practicode.tech` |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY` | The shared Supabase project |
| `PAYSTACK_SECRET_KEY` | The same key as PractiCode Learn |
| `RESEND_API_KEY` | Sends from `academy@practicode.tech` |
| `ACADEMY_INBOX` | Optional. Defaults to practicodeacademy@gmail.com |
| `EMAIL_FROM` | Optional. Defaults to `PractiCode Academy <academy@practicode.tech>` |

If the Supabase variables are missing, the forms don't fail. They send people to WhatsApp, or to the old Google Form for enrolment.
