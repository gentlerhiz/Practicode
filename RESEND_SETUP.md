# Resend Email Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Get API Key
1. After logging in, go to [API Keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Give it a name (e.g., "Practicode Contact Form")
4. Select permission: **"Sending access"**
5. Click **"Add"**
6. **Copy the API key** (you'll only see it once!)

### Step 3: Add API Key to Your Project
1. Create a `.env.local` file in your project root:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

2. Make sure `.env.local` is in your `.gitignore` (it should be by default)

### Step 4: Test the Contact Form
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/contact

3. Fill out the form and submit

4. Check your email at **idrisaloma120@gmail.com**

## 📧 Email Configuration

### Default Setup (Free - Using Resend's Domain)
- **From**: `onboarding@resend.dev`
- **To**: `idrisaloma120@gmail.com`
- **Limit**: 3,000 emails/month (100/day)

### Custom Domain (Recommended for Production)
To use your own domain (e.g., `contact@practicodeacademy.com`):

1. **Add Domain in Resend**
   - Go to [Domains](https://resend.com/domains)
   - Click **"Add Domain"**
   - Enter your domain: `practicodeacademy.com`

2. **Add DNS Records**
   - Resend will provide DNS records
   - Add these to your domain registrar (e.g., Namecheap, GoDaddy)
   - Records needed: SPF, DKIM, DMARC

3. **Update API Route**
   In `src/app/api/contact/route.ts`, change:
   ```typescript
   from: 'Practicode Academy <contact@practicodeacademy.com>',
   ```

4. **Verify Domain**
   - Go back to Resend dashboard
   - Click **"Verify"** next to your domain
   - Wait for DNS propagation (can take up to 48 hours)

## 🎨 Email Template

The contact form sends a beautifully formatted HTML email with:
- ✅ Branded header with Practicode colors
- ✅ Clean layout with sender info
- ✅ Reply-to automatically set to sender's email
- ✅ Professional formatting
- ✅ Mobile responsive

## 🧪 Testing

### Test Email Sending
```bash
# In your terminal
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Check Resend Dashboard
- Go to [Resend Dashboard](https://resend.com/emails)
- You'll see all sent emails
- Click on any email to see delivery status
- Check for bounces or errors

## 📊 Free Tier Limits

| Feature | Free Plan |
|---------|-----------|
| Emails per month | 3,000 |
| Emails per day | 100 |
| Custom domains | 1 |
| API calls | Unlimited |
| Support | Email |

## 🔒 Security Best Practices

1. **Never commit your API key**
   - Always use `.env.local`
   - Check `.gitignore` includes `.env.local`

2. **Use environment variables**
   ```typescript
   const resend = new Resend(process.env.RESEND_API_KEY);
   ```

3. **Validate input**
   - Already implemented in the API route
   - Checks for required fields
   - Sanitizes HTML

4. **Rate limiting (Optional)**
   For production, consider adding rate limiting:
   ```bash
   npm install @upstash/ratelimit @upstash/redis
   ```

## 🚨 Troubleshooting

### Error: "Missing API key"
- Check `.env.local` file exists
- Verify the key starts with `re_`
- Restart your dev server after adding the key

### Error: "Failed to send email"
- Check your Resend API key is valid
- Verify you haven't exceeded free tier limits
- Check Resend dashboard for error details

### Emails going to spam
- Use a custom domain (not `onboarding@resend.dev`)
- Add SPF, DKIM, DMARC records
- Ask recipients to mark as "Not Spam"

### Not receiving emails
- Check spam folder
- Verify email address in API route is correct
- Check Resend dashboard for delivery status

## 📈 Scaling Up

When you need more than 3,000 emails/month:

### Pro Plan ($20/month)
- 50,000 emails/month
- 3 custom domains
- Priority support
- Advanced analytics

### Business Plan ($60/month)
- 100,000 emails/month
- 10 custom domains
- Dedicated IP
- SLA

## 🔗 Useful Links

- [Resend Documentation](https://resend.com/docs)
- [Next.js Integration Guide](https://resend.com/docs/send-with-nextjs)
- [API Reference](https://resend.com/docs/api-reference/emails/send-email)
- [Dashboard](https://resend.com/overview)

## 📝 Current Setup

- ✅ API route created: `/api/contact`
- ✅ Contact form updated to use API
- ✅ Beautiful HTML email template
- ✅ Error handling implemented
- ✅ Loading states and success messages
- ✅ Form validation
- ✅ Reply-to set to sender's email

## Next Steps

1. **Get your Resend API key** (2 minutes)
2. **Add it to `.env.local`** (1 minute)
3. **Test the form** (2 minutes)
4. **Deploy and enjoy!** 🎉
