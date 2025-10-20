# Practicode - Installation & Setup Guide

## ✅ Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js version 18 or higher installed
- [ ] npm, yarn, or pnpm package manager
- [ ] Git installed (optional, for version control)
- [ ] A code editor (VS Code recommended)

## 🚀 Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

Or if you prefer pnpm:
```bash
pnpm install
```

This will install all required dependencies including:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- React Hook Form
- Zod
- Lucide Icons
- And more...

### Step 2: Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and update the values if needed:
```env
# EmailJS Configuration (Get these from https://www.emailjs.com/)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Practicode Academy
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Step 4: Verify Installation

Open your browser and check:
- ✅ Homepage loads without errors
- ✅ Navigation menu works
- ✅ Dark/light mode toggle works
- ✅ All pages are accessible
- ✅ No console errors

## 🔧 Troubleshooting

### Issue: Port 3000 is already in use

**Solution**: Run on a different port
```bash
npm run dev -- -p 3001
```

### Issue: Module not found errors

**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution**: Most TypeScript errors should resolve after running `npm install`. If they persist:
```bash
npm run type-check
```

### Issue: Styling not working

**Solution**: Ensure Tailwind is configured correctly
```bash
# Check if PostCSS is installed
npm list postcss

# Restart dev server
npm run dev
```

## 📧 EmailJS Setup (Contact Form)

To enable the contact form:

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Sender name
   - `{{from_email}}` - Sender email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{phone}}` - Sender phone (optional)
4. Copy your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file
6. Update `src/app/contact/page.tsx` to use EmailJS (code is marked with TODO)

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    black: '#0A0903',  // Your color
    red: '#FF0000',    // Your color
    orange: '#FF8200', // Your color
    amber: '#FFC100',  // Your color
    vanilla: '#FFEAAE', // Your color
  }
}
```

### Update Content

All mock data is in `src/data/index.ts`. Update:
- Courses
- Testimonials
- Team members
- FAQ items
- Solutions
- Internship programs

### Add Your Images

Replace placeholder images in:
- Team member photos
- Course images
- Hero images
- Solution images

## 🏗️ Build for Production

### Test Production Build

```bash
npm run build
npm start
```

### Build Output

The build command creates an optimized production build in `.next` folder.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Click Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Add environment variables in Netlify dashboard

### Deploy to Custom Server

```bash
npm run build
npm start
```

Use a process manager like PM2 for production:
```bash
npm install -g pm2
pm2 start npm --name "practicode" -- start
```

## 📚 Next Steps

1. ✅ Complete EmailJS setup for contact form
2. ✅ Replace placeholder images with real photos
3. ✅ Update course details and syllabi
4. ✅ Add real testimonials
5. ✅ Update team member information
6. ✅ Test all forms and functionality
7. ✅ Add Google Analytics (optional)
8. ✅ Set up custom domain
9. ✅ Configure SEO metadata
10. ✅ Test on mobile devices

## 🆘 Get Help

If you encounter issues:

1. Check the [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for detailed documentation
2. Review error messages in the terminal
3. Check browser console for client-side errors
4. Search for similar issues online
5. Contact the development team

## ✅ Installation Checklist

- [ ] Node.js installed
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Development server runs successfully
- [ ] All pages load without errors
- [ ] Forms work correctly
- [ ] Images display properly
- [ ] Dark/light mode works
- [ ] Mobile responsive
- [ ] Ready for deployment

---

**Need help?** Contact: practicodeacademy@gmail.com

Good luck with your Practicode Academy website! 🎉
