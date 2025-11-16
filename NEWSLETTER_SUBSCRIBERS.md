# Newsletter Subscriber Management

## 📧 How to Access All Newsletter Emails

Your newsletter subscribers are automatically saved to a JSON file every time someone subscribes.

### Option 1: View the File Directly

**File Location:** `data/newsletter-subscribers.json`

This file contains all subscriber information:
```json
[
  {
    "email": "user@example.com",
    "subscribedAt": "2025-11-15T10:30:00.000Z",
    "status": "active"
  },
  {
    "email": "another@example.com",
    "subscribedAt": "2025-11-15T11:45:00.000Z",
    "status": "active"
  }
]
```

**To copy all emails:**
1. Open `data/newsletter-subscribers.json`
2. Copy the emails you need
3. Use them for your email campaigns

### Option 2: Use the API Endpoint (Easier!)

Visit this URL in your browser or use curl:

**Local Development:**
```
http://localhost:3000/api/newsletter
```

**Production:**
```
https://your-domain.com/api/newsletter
```

**Response Format:**
```json
{
  "total": 2,
  "subscribers": [
    {
      "email": "user@example.com",
      "subscribedAt": "2025-11-15T10:30:00.000Z",
      "status": "active"
    }
  ],
  "emailList": [
    "user@example.com",
    "another@example.com"
  ],
  "emailString": "user@example.com, another@example.com"
}
```

**Easy Copy Options:**
- `emailList` - Array of emails
- `emailString` - Comma-separated list (easiest to copy & paste!)

### Option 3: Create a Simple Admin Page

You can create a simple admin page to view subscribers. Create `src/app/admin/subscribers/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function SubscribersPage() {
  const [data, setData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/newsletter')
      .then(res => res.json())
      .then(setData)
  }, [])

  const copyEmails = () => {
    if (data?.emailString) {
      navigator.clipboard.writeText(data.emailString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!data) return <div className="p-8">Loading...</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Newsletter Subscribers</h1>
      <p className="mb-4">Total: {data.total}</p>
      
      <button
        onClick={copyEmails}
        className="bg-yellow-400 px-6 py-2 rounded mb-4"
      >
        {copied ? 'Copied!' : 'Copy All Emails'}
      </button>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Email List (Comma-separated):</h2>
        <pre className="whitespace-pre-wrap">{data.emailString}</pre>
      </div>

      <div>
        <h2 className="font-bold mb-2">All Subscribers:</h2>
        <ul className="space-y-2">
          {data.subscribers.map((sub: any, i: number) => (
            <li key={i} className="bg-white p-3 rounded shadow">
              <div className="font-mono">{sub.email}</div>
              <div className="text-sm text-gray-500">
                {new Date(sub.subscribedAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

Then visit: `http://localhost:3000/admin/subscribers`

## 🔒 Security Notes

1. **File is gitignored**: `data/newsletter-subscribers.json` won't be committed to GitHub
2. **Keep it private**: Don't share subscriber emails publicly
3. **GET endpoint**: Consider adding authentication to `/api/newsletter` GET endpoint in production

## 🎯 Features

- ✅ **Auto-saves** every new subscriber
- ✅ **Prevents duplicates** - checks before saving
- ✅ **Includes timestamp** - know when they subscribed
- ✅ **Multiple access methods** - file, API, or admin page
- ✅ **Easy copying** - comma-separated format ready to paste

## 📝 Export Formats

The data is available in multiple formats:

1. **JSON Array** (`emailList`): For importing into other systems
2. **Comma-separated** (`emailString`): For pasting into email clients
3. **Full details** (`subscribers`): Includes subscription dates and status

## 🚀 Quick Access

**Fastest way to copy all emails:**

1. Open browser
2. Go to: `http://localhost:3000/api/newsletter`
3. Copy the `emailString` value
4. Paste into your email client!

Example:
```
user1@example.com, user2@example.com, user3@example.com
```

## 📊 On Vercel/Production

The file will be created automatically on your server when someone subscribes. Since Vercel uses serverless functions, the file will be stored in the `/tmp` directory and may not persist between deployments.

**For production, consider:**
- Using a database (Supabase, MongoDB, etc.)
- Using Airtable or Google Sheets integration
- Using a dedicated email marketing service (Mailchimp, ConvertKit)

But for now, the file system works great for development and small-scale use!
