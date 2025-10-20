# 🚀 Practicode Frontend - Project Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Setup](#installation--setup)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Pages](#pages)
6. [Components](#components)
7. [Styling](#styling)
8. [State Management](#state-management)
9. [Deployment](#deployment)
10. [Next Steps](#next-steps)

---

## 🎯 Project Overview

**Practicode** is a modern, responsive frontend web application built for a tech education and digital solutions platform based in Ibadan, Nigeria. The project showcases:

- **Tech Training Programs**: Web Development, Data Analytics, UI/UX Design, Digital Marketing
- **Internship Programs**: Hybrid 3-month and 6-month internships
- **Digital Solutions**: Custom software development services
- **Career Mentorship**: One-on-one guidance from industry professionals

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Email**: EmailJS (ready for integration)

### Brand Colors

- **Smoky Black**: `#0A0903` - Primary dark color
- **Red**: `#FF0000` - Primary accent
- **UT Orange**: `#FF8200` - Secondary accent
- **Amber**: `#FFC100` - Tertiary accent
- **Vanilla**: `#FFEAAE` - Light accent

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Step 1: Install Dependencies

```bash
cd Practicode
npm install
```

### Step 2: Environment Variables

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration (Optional for now)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Practicode Academy
```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Step 4: Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Practicode/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx           # Root layout with theme & navigation
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles & Tailwind
│   │   ├── about/               # About Us page
│   │   ├── courses/             # Courses listing page
│   │   ├── internship/          # Internship programs page
│   │   ├── solutions/           # Digital solutions page
│   │   ├── mentorship/          # Mentorship page
│   │   ├── contact/             # Contact form page
│   │   ├── faq/                 # FAQ page
│   │   └── not-found.tsx        # Custom 404 page
│   │
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Navigation header with dark mode
│   │   │   └── Footer.tsx       # Site footer
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Textarea.tsx
│   │       └── Modal.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark/Light mode context
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn, formatters)
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript types & interfaces
│   │
│   └── data/
│       └── index.ts             # Mock data (courses, testimonials, etc.)
│
├── public/                       # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

---

## ✨ Features

### 1. **Responsive Design**
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Fully responsive on all devices

### 2. **Dark/Light Mode**
- Toggle button in header
- Persists preference in localStorage
- Smooth transitions between themes

### 3. **Smooth Animations**
- Framer Motion for page transitions
- Scroll-triggered animations
- Hover effects and micro-interactions

### 4. **Form Validation**
- React Hook Form for form management
- Zod schema validation
- Real-time error messages

### 5. **SEO Optimized**
- Next.js metadata API
- Open Graph tags
- Semantic HTML structure

### 6. **Performance**
- Next.js Image optimization
- Code splitting
- Lazy loading

---

## 📄 Pages

### Homepage (`/`)
- Hero section with CTA buttons
- Programs overview
- Why Choose Us section
- Testimonials carousel
- Statistics showcase

### About Us (`/about`)
- Company story
- Mission, Vision, Values
- Team members
- Achievements

### Courses (`/courses`)
- Course cards with filters
- Search functionality
- Category filters
- Course detail modal with syllabus

### Internship (`/internship`)
- 3-month and 6-month programs
- Benefits and requirements
- Application process steps

### Solutions (`/solutions`)
- Digital services showcase
- Technology stack display
- Project examples

### Mentorship (`/mentorship`)
- Mentorship benefits
- How it works
- Success stories

### Contact (`/contact`)
- Contact information cards
- Contact form with validation
- Google Maps embed

### FAQ (`/faq`)
- Searchable FAQ accordion
- Category filters
- Expandable answers

---

## 🧩 Components

### Layout Components

#### **Header** (`components/layout/Header.tsx`)
- Sticky navigation
- Mobile menu
- Dark/light mode toggle
- Active link highlighting

#### **Footer** (`components/layout/Footer.tsx`)
- Company information
- Quick links
- Contact details
- Social media links

### UI Components

#### **Button** (`components/ui/Button.tsx`)
Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

```tsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

#### **Card** (`components/ui/Card.tsx`)
Compound component pattern:

```tsx
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### **Input** (`components/ui/Input.tsx`)
```tsx
<Input 
  label="Email" 
  error={errors.email?.message}
  {...register('email')}
/>
```

#### **Modal** (`components/ui/Modal.tsx`)
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Title" size="lg">
  Content
</Modal>
```

---

## 🎨 Styling

### Tailwind Configuration

Custom colors in `tailwind.config.ts`:

```ts
colors: {
  primary: {
    black: '#0A0903',
    red: '#FF0000',
    orange: '#FF8200',
    amber: '#FFC100',
    vanilla: '#FFEAAE',
  }
}
```

### Custom CSS Classes

Defined in `globals.css`:

- `.container-custom` - Max-width container with padding
- `.section-padding` - Consistent section spacing
- `.heading-1`, `.heading-2`, `.heading-3` - Typography scale
- `.text-gradient` - Gradient text effect
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.card` - Card component base styles

### Utility Classes

```css
.text-balance    /* Better text wrapping */
.animate-fade-in /* Fade in animation */
.animate-slide-up /* Slide up animation */
```

---

## 🔌 State Management

### Theme Context

Located in `src/context/ThemeContext.tsx`

```tsx
import { useTheme } from '@/context/ThemeContext'

const { theme, toggleTheme } = useTheme()
```

### Form State

Using React Hook Form:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Netlify

```bash
npm run build
```

Deploy the `.next` folder

### Custom Server

```bash
npm run build
npm start
```

---

## 📝 Next Steps

### Immediate Tasks

1. **EmailJS Integration**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create email template
   - Add credentials to `.env.local`
   - Update `src/app/contact/page.tsx` with EmailJS send logic

2. **Add Real Images**
   - Replace placeholder images with actual photos
   - Add team member photos
   - Add course-specific images

3. **Content Updates**
   - Update company information
   - Add actual course syllabi
   - Update testimonials with real data

### Future Enhancements

1. **Blog System**
   - Add `/blog` route
   - Integrate MDX for blog posts
   - Add categories and tags

2. **Student Portal**
   - Authentication (NextAuth.js)
   - Dashboard for enrolled students
   - Progress tracking

3. **Payment Integration**
   - Paystack/Flutterwave integration
   - Course enrollment payment
   - Payment confirmation

4. **CMS Integration**
   - Sanity.io or Contentful
   - Dynamic content management
   - Easy updates without code changes

5. **Analytics**
   - Google Analytics
   - Conversion tracking
   - User behavior analysis

6. **Performance Optimization**
   - Implement React Query for data fetching
   - Add loading skeletons
   - Optimize images further

---

## 🐛 Troubleshooting

### TypeScript Errors
The current TypeScript errors are expected because dependencies haven't been installed yet. Run `npm install` to resolve.

### Module Not Found Errors
Ensure you're in the project directory and have run `npm install`.

### Port Already in Use
Change the port: `npm run dev -- -p 3001`

---

## 📞 Contact & Support

**Practicode Academy**
- 📍 7B Oba Olagbegi, Old Bodija, Ibadan, Nigeria
- 📧 practicodeacademy@gmail.com
- 📞 +234 707 277 8657 / +234 903 057 8667

---

## 📜 License

© 2025 Practicode Academy. All rights reserved.

---

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
