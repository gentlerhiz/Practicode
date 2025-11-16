# Contact Form Submissions Management

## 📬 How to Access All Contact Form Submissions

Every contact form submission is automatically saved to a JSON file for your records.

### File Location

**File:** `data/contact-submissions.json`

This file contains all contact form submissions with full details:
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your web development course...",
    "submittedAt": "2025-11-15T10:30:00.000Z",
    "status": "new"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Can you provide more details about the UI/UX program?",
    "submittedAt": "2025-11-15T11:45:00.000Z",
    "status": "new"
  }
]
```

## 🔍 Access Methods

### Method 1: API Endpoint (Easiest!)

Visit this URL in your browser:

**Local Development:**
```
http://localhost:3000/api/contact
```

**Production:**
```
https://your-domain.com/api/contact
```

**Response Format:**
```json
{
  "total": 5,
  "new": 5,
  "contacts": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Full message here...",
      "submittedAt": "2025-11-15T10:30:00.000Z",
      "status": "new"
    }
  ],
  "emails": [
    "john@example.com",
    "jane@example.com"
  ],
  "emailString": "john@example.com, jane@example.com"
}
```

**Quick Copy Options:**
- `emails` - Array of all contact emails
- `emailString` - Comma-separated list (easiest to copy!)
- `contacts` - Full submission details with names and messages

### Method 2: Direct File Access

1. Open `data/contact-submissions.json`
2. View all submissions with full details
3. Copy emails or entire submission data as needed

### Method 3: Create Admin Dashboard

Create `src/app/admin/contacts/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function ContactsPage() {
  const [data, setData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/contact')
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
      <h1 className="text-3xl font-bold mb-4">Contact Form Submissions</h1>
      <div className="mb-6">
        <p className="text-lg">Total Submissions: <strong>{data.total}</strong></p>
        <p className="text-lg">New/Unread: <strong>{data.new}</strong></p>
      </div>
      
      <button
        onClick={copyEmails}
        className="bg-yellow-400 px-6 py-2 rounded mb-6"
      >
        {copied ? 'Copied!' : 'Copy All Emails'}
      </button>

      <div className="space-y-4">
        {data.contacts.map((contact: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded shadow border-l-4 border-yellow-400">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{contact.name}</h3>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(contact.submittedAt).toLocaleString()}
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <p className="whitespace-pre-wrap">{contact.message}</p>
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded ${
                contact.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
              }`}>
                {contact.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Then visit: `http://localhost:3000/admin/contacts`

## 📊 Data Structure

Each submission contains:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name of the person |
| `email` | string | Email address |
| `message` | string | Full message content |
| `submittedAt` | ISO date | When the form was submitted |
| `status` | string | 'new' (can be updated to 'replied', 'archived', etc.) |

## 🔒 Security & Privacy

1. **Gitignored**: `data/contact-submissions.json` won't be committed to GitHub
2. **Private data**: Keep submission data confidential
3. **GDPR compliance**: Consider data retention policies
4. **Access control**: Add authentication to GET endpoint in production

## 🎯 Features

- ✅ **Auto-saves** every contact form submission
- ✅ **Full message history** - never lose a contact message
- ✅ **Timestamp tracking** - know when each person contacted you
- ✅ **Status tracking** - mark as new, replied, archived, etc.
- ✅ **Multiple export formats** - JSON, array, or comma-separated
- ✅ **Easy email copying** - for bulk email responses

## 📧 Use Cases

### 1. Follow-up Campaign
Copy all emails and send a bulk follow-up:
```
http://localhost:3000/api/contact
→ Copy "emailString"
→ Paste into BCC field
→ Send follow-up email
```

### 2. Export to Spreadsheet
1. Open `data/contact-submissions.json`
2. Use a JSON to CSV converter
3. Import into Excel/Google Sheets
4. Track responses and follow-ups

### 3. Integration with CRM
- Export JSON data
- Import into your CRM system
- Track customer relationships

## 🚀 Quick Access Commands

**View all submissions:**
```bash
cat data/contact-submissions.json
```

**Count total submissions:**
```bash
# On Mac/Linux
cat data/contact-submissions.json | jq 'length'

# On Windows PowerShell
(Get-Content data/contact-submissions.json | ConvertFrom-Json).Count
```

**Extract just emails:**
```bash
# Mac/Linux
cat data/contact-submissions.json | jq '.[].email'

# Windows PowerShell
(Get-Content data/contact-submissions.json | ConvertFrom-Json).email
```

## 📝 API Endpoints

### POST `/api/contact`
Submit a new contact form
- Saves to file
- Sends email to admin
- Returns success response

### GET `/api/contact`
Retrieve all submissions
- Returns full contact list
- Includes email lists
- Shows total count

## ⚠️ Production Considerations

On Vercel/serverless hosting:
- Files in `/tmp` may not persist between deployments
- Consider using a database for production (Supabase, MongoDB, Airtable)
- Or integrate with email marketing tools (Mailchimp, ConvertKit)
- Current file system works great for development and small-scale use

## 🔐 Recommended: Add Authentication

For production, protect the GET endpoint:

```typescript
// src/app/api/contact/route.ts
export async function GET(request: Request) {
  // Simple token authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // ... rest of code
}
```

Then access with:
```bash
curl -H "Authorization: Bearer your-secret-token" http://localhost:3000/api/contact
```

## 💡 Tips

1. **Regular backups**: Backup `data/` folder regularly
2. **Archive old contacts**: Move old submissions to separate files
3. **Update status**: Manually update status field after replying
4. **Export regularly**: Export to CSV for long-term storage
5. **Monitor file size**: Clean up old submissions periodically

---

**Need help?** Check the file at `data/contact-submissions.json` or visit the API endpoint!
