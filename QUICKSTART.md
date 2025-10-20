# Practicode - Quick Start Guide

Welcome to your Practicode Academy website! Follow these steps to get started.

## 🎯 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

Wait for installation to complete...

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

Visit: **http://localhost:3000**

✅ **Done!** Your website is now running locally.

---

## 📋 What You Get

### ✨ Features
- 🏠 Homepage with hero & testimonials
- 📚 Courses page with filtering
- 💼 Internship programs
- 🛠️ Digital solutions showcase
- 👥 Mentorship program
- 📞 Contact form
- ❓ FAQ page
- 👨‍💼 About us with team
- 🌙 Dark/light mode
- 📱 Fully responsive

### 🎨 Design
- Modern & minimal UI
- Smooth animations
- Custom color scheme
- Mobile-first approach

---

## 🔄 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality
npm run type-check   # Check TypeScript
```

---

## ✏️ Quick Customizations

### Update Contact Info

Edit `src/components/layout/Footer.tsx`:
- Change address
- Update phone numbers
- Modify email

### Change Colors

Edit `tailwind.config.ts`:
- Update primary colors
- Modify brand palette

### Update Course Data

Edit `src/data/index.ts`:
- Add/edit courses
- Update testimonials
- Modify team members

### Enable Contact Form

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Add credentials to `.env.local`
3. Uncomment EmailJS code in `src/app/contact/page.tsx`

---

## 🚀 Deploy

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com)

---

## 📖 Need More Help?

- **Detailed Guide**: Read [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)
- **Installation**: See [INSTALLATION.md](./INSTALLATION.md)
- **Email**: practicodeacademy@gmail.com

---

## ✅ Quick Checklist

Before going live:

- [ ] Update all text content
- [ ] Replace placeholder images
- [ ] Set up EmailJS for contact form
- [ ] Add real testimonials
- [ ] Update team member info
- [ ] Test on mobile
- [ ] Check all links
- [ ] Set up analytics (optional)
- [ ] Deploy to production

---

**Ready to launch? Let's go!** 🚀

© 2025 Practicode Academy
