# GWS Authentication Setup Guide

## Prerequisites

- Google account with Google Workspace access
- Node.js 18+ installed

## Step 1: Install GWS

```bash
npm install -g @googleworkspace/cli
```

## Step 2: Initial Setup

```bash
gws auth setup
```

This will:
1. Check/create a Google Cloud project
2. Enable necessary APIs (Drive, Gmail, Calendar, Sheets, etc.)
3. Create OAuth credentials
4. Configure consent screen

## Step 3: Login

```bash
gws auth login
```

This opens a browser OAuth flow. Follow the prompts to authorize access.

## Step 4: Verify

```bash
gws auth status
```

Should show authentication status and token expiration.

## Troubleshooting

### "Token expired"
```bash
gws auth login
```

### "No valid credentials"
Re-run `gws auth setup` to recreate credentials.

### "API not enabled"
Visit Google Cloud Console → APIs & Services → Enable APIs and enable the required service.
