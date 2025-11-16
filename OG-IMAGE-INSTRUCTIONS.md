# Open Graph Image Setup Instructions

## 📸 Create Your OG Image

The OG image generator has been opened in your browser. Follow these steps:

### Method 1: Screenshot Tool
1. The HTML file should now be open in your browser
2. You'll see a black box with yellow accents (1200x630px)
3. Use Windows Snipping Tool (Win + Shift + S) to capture just the OG image section
4. Save it as **og-image.png**
5. Place it in `public/images/og-image.png`

### Method 2: Browser DevTools (More Accurate)
1. Open the HTML file in Chrome/Edge
2. Press F12 to open DevTools
3. Press Ctrl+Shift+M to toggle device toolbar
4. Set dimensions to exactly **1200 x 630**
5. Press Ctrl+Shift+P and search "Capture screenshot"
6. Select "Capture screenshot"
7. Save as **og-image.png** in `public/images/`

### Method 3: Online Tool
1. Go to https://www.opengraph.xyz/ or https://www.bannerbear.com/tools/og-image-generator/
2. Use the template settings:
   - **Background**: Black (#000000)
   - **Primary Color**: Yellow (#FFCA1A)
   - **Title**: "Transform Your Future with Tech Skills"
   - **Subtitle**: "Hands-on training in Web Development, Data Analytics, UI/UX Design, and more."
   - **Logo**: Upload `public/images/yellowlogo.png`
3. Download and save as `public/images/og-image.png`

## 🔧 What We've Added

### 1. Enhanced Meta Tags (`src/app/layout.tsx`)
- ✅ Updated title and description
- ✅ Comprehensive keywords
- ✅ Open Graph tags for social media
- ✅ Twitter Card tags
- ✅ Geographic metadata (Ibadan location)
- ✅ Business contact information
- ✅ Icons and favicons
- ✅ Google verification placeholder

### 2. Structured Data (`src/app/page.tsx`)
- ✅ JSON-LD schema for EducationalOrganization
- ✅ Business address and contact info
- ✅ Course pricing information
- ✅ Social media links

## 🚀 Next Steps

### 1. Create the OG Image
Follow the instructions above to create `public/images/og-image.png`

### 2. Update Domain Name
In `src/app/layout.tsx`, update the URL if needed:
```typescript
metadataBase: new URL('https://practicodeacademy.com'),
```

### 3. Add Google Verification
When you verify with Google Search Console:
```typescript
verification: {
  google: 'your-actual-verification-code-here',
}
```

### 4. Update Social Media Handles
In `src/app/page.tsx`, update the structured data with your actual social links:
```typescript
"sameAs": [
  "https://twitter.com/your-actual-handle",
  "https://facebook.com/your-actual-page",
  // etc.
]
```

### 5. Create Missing Favicon Sizes
You need these files in `public/`:
- `favicon.ico` (already exists)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)

You can generate these from your logo at: https://realfavicongenerator.net/

## 🧪 Test Your Meta Tags

After deploying, test your meta tags at:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **General**: https://metatags.io/

## 📝 What This Fixes

When you share your website link on social media, it will now show:
- ✅ Beautiful preview image (OG image)
- ✅ Proper title: "Practicode Academy | Transform Your Future with Tech Skills"
- ✅ Engaging description with course information
- ✅ Your logo/branding
- ✅ Professional appearance on WhatsApp, Twitter, Facebook, LinkedIn

## 🔍 SEO Benefits

- Better Google search rankings
- Rich snippets in search results
- Local SEO for Ibadan, Nigeria
- Proper categorization as educational institution
- Course information in structured data
- Contact information for Google Business
