# Google OAuth Setup Guide for EditIQ Admin Panel

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "EditIQ Admin Panel"
4. Click "Create"

## Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: EditIQ Admin Panel
   - User support email: contact.editiq@gmail.com
   - Developer contact: contact.editiq@gmail.com
   - Click "Save and Continue"
   - Scopes: Skip this (click "Save and Continue")
   - Test users: Add `contact.editiq@gmail.com`
   - Click "Save and Continue"

4. Now create OAuth client ID:
   - Application type: Web application
   - Name: EditIQ Admin
   - Authorized JavaScript origins:
     - `http://localhost:3000`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
   - Click "Create"

5. Copy the Client ID and Client Secret

## Step 4: Update .env File

Open `.env` file and update:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
ALLOWED_ADMIN_EMAILS=contact.editiq@gmail.com
```

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Start Server

```bash
npm run dev
```

## Step 7: Access Admin Panel

1. Go to: `http://localhost:3000/ankur-admin-dashboard`
2. Click "Sign in with Google"
3. Login with `contact.editiq@gmail.com`
4. You'll be redirected to the admin panel

## Security Notes

- Only the email in `ALLOWED_ADMIN_EMAILS` can access the admin panel
- The admin route is hidden at `/ankur-admin-dashboard`
- Never commit `.env` file to GitHub
- Keep your Client Secret secure

## For Production Deployment

When deploying to a live server:

1. Update authorized origins in Google Console:
   - Add your domain: `https://yourdomain.com`
   
2. Update redirect URI:
   - Add: `https://yourdomain.com/auth/google/callback`

3. Update `.env`:
   ```env
   GOOGLE_CALLBACK_URL=https://yourdomain.com/auth/google/callback
   ```

## Troubleshooting

**Error: redirect_uri_mismatch**
- Make sure the redirect URI in Google Console exactly matches the one in your .env

**Error: Access Denied**
- Make sure you're logging in with the email listed in `ALLOWED_ADMIN_EMAILS`

**Error: Google+ API not enabled**
- Go to Google Cloud Console and enable the Google+ API
