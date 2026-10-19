export type LegalSection = { id: string; title: string; paras: string[]; list?: string[] }
export type LegalDoc = { title: string; lead: string; updated: string; short: string[]; sections: LegalSection[] }

export const privacy: LegalDoc = {
  title: 'Privacy notice',
  lead: 'How PractiCode Academy collects, uses and protects your personal data when you use this website, enrol or contact us.',
  updated: '19 October 2026',
  short: [
    'We collect only what we need to enrol you, confirm payment and keep in touch about your class.',
    'We never sell your data, and Paystack handles card details, not us.',
    'You can ask to see, correct or delete your data at any time.',
  ],
  sections: [
    {
      id: 'who',
      title: 'Who we are',
      paras: [
        'PractiCode Academy is run by Practicode Consult Limited, a company registered in Nigeria (company registration no. 8415811), at 7B Oba Olagbegi, Old Bodija, Ibadan, Oyo State. We are responsible for the personal data described here.',
      ],
    },
    {
      id: 'collect',
      title: 'What we collect',
      paras: ['We collect the details you give us:'],
      list: [
        'When you enrol: your email, full name, WhatsApp number and chosen programme.',
        'If you are a SIWES or IT student: your matric number, level and introduction letter.',
        'For payment: your Paystack payment reference, or the transaction ID or receipt you upload for a bank transfer.',
        'When you message us or ask to be notified: your name, email, phone number and message.',
      ],
    },
    {
      id: 'use',
      title: 'How we use it',
      paras: [
        'We use your data to manage your enrolment, confirm your payment, issue your certificate, contact you about your classes and reply to your messages. We do not sell your data or use it for advertising.',
      ],
    },
    {
      id: 'share',
      title: 'Who we share it with',
      paras: ['We share data only with the services that help us run the academy, and only what each one needs:'],
      list: [
        'Paystack, which processes online payments. We never see or store your card details.',
        'Supabase, which stores our enrolment records and uploads.',
        'Resend, which sends our confirmation emails.',
        'Vercel, which hosts this website.',
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics and cookies',
      paras: ['We count visits with cookieless analytics, so we do not set tracking cookies. Your light or dark theme choice is saved in your own browser.'],
    },
    {
      id: 'keep',
      title: 'How long we keep it',
      paras: [
        'We keep enrolment records for as long as we need them to run your programme, confirm your certificate if you ask, and keep our accounts. We delete messages and waitlist entries once they are no longer needed.',
      ],
    },
    {
      id: 'rights',
      title: 'Your rights',
      paras: [
        'Under the Nigeria Data Protection Act 2023, you can ask us to show you the data we hold about you, correct it, delete it or stop using it. Email practicodeacademy@gmail.com and we will reply as soon as we can.',
      ],
    },
    { id: 'changes', title: 'Changes to this notice', paras: ['If we change this notice, we will update this page and the date at the top.'] },
  ],
}

export const terms: LegalDoc = {
  title: 'Terms of enrolment',
  lead: 'The terms that apply when you enrol on a PractiCode Academy programme or use this website.',
  updated: '19 October 2026',
  short: [
    'You see the full fee before you pay, and your place is confirmed once payment is checked.',
    'We refund you if we can’t run your programme. We don’t refund if you choose to leave.',
    'Your certificate carries the name you give us when you enrol.',
  ],
  sections: [
    {
      id: 'about',
      title: 'About these terms',
      paras: ['These terms are between you and Practicode Consult Limited (company registration no. 8415811), which runs PractiCode Academy. By enrolling, you agree to them.'],
    },
    { id: 'enrol', title: 'Enrolling', paras: ['Give accurate details when you enrol. Type your full name exactly as you want it to appear on your certificate.'] },
    {
      id: 'fees',
      title: 'Fees and payment',
      paras: ['You see the full fee on the enrolment form before you pay.'],
      list: [
        'Pay online with Paystack, or by bank transfer with your transaction ID or receipt.',
        'Your place is confirmed once we have checked your payment.',
        'The SIWES and IT discount needs a valid introduction letter from your school. A one-off administrative fee also applies, paid on resumption.',
      ],
    },
    {
      id: 'refunds',
      title: 'Refunds',
      paras: ['We refund your fee if we can’t provide your programme: for example, if we fail to teach the course or can’t run your classes.'],
      list: [
        'We don’t refund if you decide to leave the programme.',
        'We don’t refund if you travel, or can’t attend because of other commitments.',
      ],
    },
    {
      id: 'classes',
      title: 'Classes',
      paras: ['Classes run onsite at our centre in Old Bodija, Ibadan, and live online. Be respectful to instructors and classmates. A laptop is strongly recommended.'],
    },
    { id: 'certs', title: 'Certificates', paras: ['You receive a certificate of completion when you finish your programme and its capstone project.'] },
    { id: 'work', title: 'Your work', paras: ['You own the projects you build. With your permission, we may share examples of student work on this website and our social media.'] },
    { id: 'photos', title: 'Photos in class', paras: ['We sometimes take photos in class for our website and social media. Tell your instructor if you would rather not appear.'] },
  ],
}
