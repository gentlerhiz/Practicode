export interface Course {
  id: string
  title: string
  slug: string
  category: 'development' | 'design' | 'data' | 'marketing'
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  features: string[]
  projects: string[]
  price: number
  image: string
  syllabus: {
    week: number
    topic: string
    description: string
  }[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  image: string
  rating: number
  text: string
  course?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface InternshipProgram {
  id: string
  title: string
  duration: string
  type: 'hybrid' | 'remote' | 'onsite'
  description: string
  benefits: string[]
  requirements: string[]
  schedule: string
}

export interface Solution {
  id: string
  title: string
  category: string
  description: string
  features: string[]
  technologies: string[]
  image: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'courses' | 'payment' | 'technical'
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}
