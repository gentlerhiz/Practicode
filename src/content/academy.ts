/** Real photos from our classes and events, partners and the team. */

export const photos = {
  cohort: { src: '/images/photos/cohort-group.jpg', alt: 'PractiCode Academy students with their certificates outside our Old Bodija centre' },
  graduation: { src: '/images/photos/graduation.jpg', alt: 'PractiCode Academy students holding their certificates' },
  classData: { src: '/images/photos/class-data.jpg', alt: 'A Power BI class at PractiCode Academy' },
  classLaptops: { src: '/images/photos/class-laptops.jpg', alt: 'Students working on laptops in a PractiCode Academy class' },
  studentLaptop: { src: '/images/photos/student-laptop.jpg', alt: 'A student working on a laptop in class' },
  certificates: { src: '/images/photos/certificates.jpg', alt: 'Students showing their PractiCode Academy certificates' },
  outdoor: { src: '/images/photos/outdoor-cohort.jpg', alt: 'A class photo outdoors in Ibadan' },
  coding: { src: '/images/photos/student-coding.jpg', alt: 'A student writing code during a lesson' },
}

export type Photo = { src: string; alt: string; caption: string }

export const galleryHome: Photo[] = [
  { ...photos.graduation, caption: 'Graduation day, Ibadan' },
  { ...photos.classData, caption: 'Power BI in a data analysis class' },
  { ...photos.classLaptops, caption: 'Building in class' },
  { ...photos.certificates, caption: 'Certificates in hand' },
  { ...photos.coding, caption: 'Writing code, week by week' },
]

export const galleryAbout: Photo[] = [
  { ...photos.cohort, caption: 'Outside our Old Bodija centre' },
  { ...photos.outdoor, caption: 'Class photo, Ibadan' },
  { ...photos.studentLaptop, caption: 'Hands-on, every lesson' },
  { ...photos.classData, caption: 'A data analysis class' },
  { ...photos.graduation, caption: 'Graduation day' },
]

export const partners = [
  { name: 'Google Developer Groups', src: '/images/partners/gdg.svg', width: 220, height: 40 },
  { name: 'Muslim Tech Expo', src: '/images/partners/mte.png', width: 160, height: 56 },
  { name: 'Bimaplan Consult', src: '/images/partners/bimaplan.png', width: 156, height: 48 },
  { name: 'Zeeh Africa', src: '/images/partners/zeeh.png', width: 140, height: 40 },
]

export const founder = {
  name: 'Idris Akande Rasaq',
  role: 'Founder',
  photo: '/images/photos/idris.jpg',
  bio: 'Idris started PractiCode Academy in 2023 so people in Ibadan could learn tech by building real things, with an instructor checking the work.',
  linkedin: 'https://www.linkedin.com/in/idris-rasaq-5202091a6/',
}

export const team = [
  {
    name: 'Paul Olaojo',
    role: 'Instructor, Data Analysis',
    tone: 'da' as const,
    photo: '/images/photos/paul.jpg',
    initials: 'PO',
    bio: 'An AI/ML engineer, data scientist and backend engineer who builds production-ready AI systems that solve real business problems.',
  },
  {
    name: 'Hamdalat Omolola Akinyele',
    role: 'Business Development & Partnerships',
    tone: 'ux' as const,
    photo: '',
    initials: 'HA',
    bio: 'A data analyst skilled in Excel, Power BI, SQL and Python, and trained on our Data Analytics programme.',
  },
]
