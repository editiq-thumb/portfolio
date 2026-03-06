# Quick Google Login Setup (5 Minutes)

## Step 1: Get Google Client ID

1. Go to: https://console.developers.google.com/
2. Create a new project or select existing
3. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
4. Choose "Web application"
5. Add authorized JavaScript origins:
   - `http://localhost:3000`
6. Copy the **Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)

## Step 2: Update Your Code

Open `public/ankur-admin-dashboard.html` and find this line:

```html
data-client_id="YOUR_GOOGLE_CLIENT_ID"
```

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID.

## Step 3: Test It!

1. Go to: `http://localhost:3000/ankur-admin-dashboard`
2. You'll see two login options:
   - **Login with Email** (username/password)
   - **Sign in with Google** button
3. Click "Sign in with Google"
4. Login with `contact.editiq@gmail.com`
5. Done! ✅

## Security

- Only `contact.editiq@gmail.com` can access
- Other Google accounts will be rejected
- No complex OAuth flow needed
- Works alongside existing username/password login

## Troubleshooting

**Google button not showing?**
- Make sure you added the Client ID
- Check browser console for errors

**"Access Denied" error?**
- Make sure you're using `contact.editiq@gmail.com`
- Check `.env` file has correct email

That's it! Super simple! 🎉
