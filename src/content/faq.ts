import { Award, GraduationCap, Laptop, Newspaper, Stamp, Wallet, type LucideIcon } from 'lucide-react'
import type { ProgrammeId, Tone } from './programmes'

export type QA = { q: string; a: string }
export type FaqTopic = { id: string; label: string; tone: Tone; icon: LucideIcon; items: QA[] }

const online: QA = { q: 'Can I join online?', a: 'Yes. Every class runs onsite at our centre in Old Bodija, Ibadan, and live online at the same time.' }
const cost: QA = { q: 'How much does a programme cost?', a: 'You’ll see the full fee on the enrolment form before you pay anything. SIWES and IT students get 50% off tuition.' }
const certificate: QA = { q: 'Do I get a certificate?', a: 'Yes. When you finish your programme and capstone project, you receive a PractiCode Academy certificate of completion.' }
const siwesJoin: QA = { q: 'I’m on SIWES or IT. Can I join?', a: 'Yes. We host SIWES and IT students from computer science and related courses, and we review and sign your logbook every week.' }
const selfPaced: QA = { q: 'Can I learn at my own pace instead?', a: 'Yes. Try PractiCode Learn, our self-paced platform. Module 1 of Front-End is free, and lessons run in your browser.' }
const howEnrol: QA = { q: 'How do I enrol?', a: 'Fill the form on our Enrol page, choose your programme and pay online with Paystack or by bank transfer. It takes about five minutes, and we confirm by email and on WhatsApp.' }

export const homeFaq: QA[] = [howEnrol, online, cost, certificate, siwesJoin, selfPaced]

export const siwesFaq: QA[] = [
  { q: 'Who can do SIWES with you?', a: 'Students on industrial training from computer science, software engineering, IT, computer engineering, cybersecurity, data science and related courses.' },
  { q: 'How long is the programme?', a: 'Three months, onsite at our centre in Old Bodija, Ibadan.' },
  { q: 'What does it cost?', a: 'SIWES and IT students pay half the usual tuition, plus a one-off administrative fee. You’ll see both amounts when you register.' },
  { q: 'Do you sign logbooks?', a: 'Yes. Submit your logbook every week and we review your entries before signing them.' },
  { q: 'Do I need my own laptop?', a: 'A laptop is strongly recommended, so you can practise between classes and keep your projects.' },
]

const start: Record<Exclude<ProgrammeId, 'ai'>, string> = {
  fe: 'No. Front-End starts from your very first web page and builds up week by week.',
  da: 'No. Data Analysis starts with Excel basics and builds up to Power BI dashboards.',
  ux: 'No. UI/UX starts with how people use products, then teaches Figma step by step.',
}
const finish: Record<Exclude<ProgrammeId, 'ai'>, string> = {
  fe: 'A published capstone website, the projects you built each week, and a PractiCode Academy certificate of completion.',
  da: 'A Power BI dashboard built on real data, the reports you made each week, and a PractiCode Academy certificate of completion.',
  ux: 'A clickable Figma prototype you have tested with real people, the case study behind it, and a PractiCode Academy certificate of completion.',
}

export function programmeFaq(id: ProgrammeId): QA[] {
  if (id === 'ai')
    return [
      { q: 'When does AI & Machine Learning open?', a: 'We haven’t set a date yet. Leave your details on this page and we’ll message you as soon as enrolment opens.' },
      { q: 'What will I need to know first?', a: 'We’ll share the entry requirements when enrolment opens. Comfort with a computer and basic maths will help.' },
      { q: 'Can I start another programme now?', a: 'Yes. Front-End, Data Analysis and UI/UX are all enrolling now, onsite in Ibadan or online.' },
      { q: 'Will it run online too?', a: 'Yes. Like our other programmes, it will run onsite in Ibadan and live online.' },
    ]
  return [
    { q: 'Do I need any experience?', a: start[id] },
    online,
    { q: 'How much does it cost?', a: cost.a },
    { q: 'What do I finish with?', a: finish[id] },
  ]
}

export const faqTopics: FaqTopic[] = [
  {
    id: 'pay',
    label: 'Enrolling and paying',
    tone: 'fe',
    icon: Wallet,
    items: [
      howEnrol,
      { q: 'When can I start?', a: 'Registration is open now. Once you’ve enrolled, we send you your class details and add you to your class WhatsApp group.' },
      cost,
      { q: 'Can I pay by bank transfer?', a: 'Yes. Choose “I’ve paid by bank transfer” on the form, then add your transaction ID or a screenshot of the receipt. We confirm your place once we have checked it.' },
      { q: 'Is paying online safe?', a: 'Card and bank payments go through Paystack, a licensed payment processor. We never see or store your card details.' },
      { q: 'Can I get a refund?', a: 'If we can’t run your programme or provide your classes, we refund you. We don’t refund if you choose to leave, travel or can’t attend because of other commitments.' },
    ],
  },
  {
    id: 'classes',
    label: 'Classes',
    tone: 'da',
    icon: Laptop,
    items: [
      online,
      { q: 'Where is the centre?', a: '7B Oba Olagbegi, Old Bodija, Ibadan, Oyo State. Find directions on our Contact page.' },
      { q: 'What do I need?', a: 'A laptop is strongly recommended, so you can practise between classes and keep your projects. If you join online, you also need a steady internet connection.' },
      { q: 'What if I miss a class?', a: 'Tell your instructor in the class WhatsApp group. They’ll point you to what you missed and help you catch up.' },
    ],
  },
  {
    id: 'programmes',
    label: 'Programmes',
    tone: 'ux',
    icon: GraduationCap,
    items: [
      { q: 'Which programme should I choose?', a: 'Start with what you enjoy: building things (Front-End), numbers and patterns (Data Analysis) or people and visuals (UI/UX). Our Programmes page has a short guide, or message us and we’ll help.' },
      { q: 'Do I need any experience?', a: 'No. Front-End, Data Analysis and UI/UX all start from zero.' },
      { q: 'Is AI & Machine Learning open?', a: 'Not yet. Leave your details on its page and we’ll tell you as soon as enrolment opens.' },
      { q: 'Can I take more than one programme?', a: 'Yes. Enrol for each one separately, and tell us if you want them to run one after the other.' },
    ],
  },
  {
    id: 'siwes',
    label: 'SIWES and IT',
    tone: 'ai',
    icon: Stamp,
    items: [
      siwesFaq[0]!,
      { q: 'How long is it?', a: 'Three months, onsite at our centre in Old Bodija, Ibadan.' },
      siwesFaq[2]!,
      { q: 'Do you sign logbooks?', a: 'Yes. Bring your logbook every week and we review your entries before signing them.' },
      { q: 'What do I need to register?', a: 'Your matric number, your level and the introduction letter from your school. You upload the letter on the enrolment form.' },
    ],
  },
  {
    id: 'certs',
    label: 'Certificates',
    tone: 'fe',
    icon: Award,
    items: [certificate, { q: 'What name goes on it?', a: 'The full name you give us on the enrolment form, so type it exactly as you want it to appear.' }],
  },
  {
    id: 'learn',
    label: 'PractiCode Learn',
    tone: 'da',
    icon: Newspaper,
    items: [
      { q: 'What is PractiCode Learn?', a: 'Our self-paced learning platform at learn.practicode.tech. Lessons run in your browser, so you can learn when it suits you.' },
      { q: 'Is it free?', a: 'Module 1 of Front-End is free. You can try it before you decide anything.' },
    ],
  },
]
