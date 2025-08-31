# Google Apps Script Deployment Fix

## Issue
The Google Apps Script web apps are not publicly accessible and require authentication, which prevents form submissions from working.

## Solution
Each Google Apps Script deployment needs to be configured with the correct permissions:

### Step 1: Open Google Apps Script
1. Go to https://script.google.com
2. Open each of your Google Apps Script projects for the forms

### Step 2: Deploy with Correct Permissions
For each project:

1. Click **"Deploy"** > **"Manage deployments"**
2. Click the **Edit** button (pencil icon) next to your deployment
3. Set the following configuration:
   - **Execute as:** "Me" (your Google account)
   - **Who has access:** "Anyone" (this is critical!)
4. Click **"Deploy"**
5. Copy the new web app URL (it might be different)

### Step 3: Update Environment Variables
Update the URLs in your `.env` file with the new web app URLs from step 2.

## URLs to Update
Based on your current `.env` file, you need to update these Google Apps Script deployments:

- **Parent Form:** `https://script.google.com/macros/s/AKfycbwjWLYsSwzgtiNKes_cAovz82Sdk10LShwhT5ol4hYFILcqJOKD0PQgXgTJ8QM4urMY/exec`
- **Student Form:** `https://script.google.com/macros/s/AKfycbxXTXlp3f6bxO7lZAO7qBudv5Jt3L8PDEim9pviIb1ENvE7HYhbPwnbb7zTSuNZy3QE/exec`
- **School Form:** `https://script.google.com/macros/s/AKfycbwoRPS5KRhfzfuifU-UoO-dzt8C7EuWuPe4gKsp3BFhwXMSUEholTNx11S-xHEW6_fa/exec`
- **Teacher Form:** `https://script.google.com/macros/s/AKfycbzsuaPl-NW6SvopSWzcKKjVSFaDFZbG2Rm3x0XVykbxhirf2ad2pSLtnWfyWAsgaJjJSQ/exec`
- **Initiative Form:** `https://script.google.com/macros/s/YOUR_INITIATIVE_SCRIPT_ID/exec` (needs to be created)

## Testing
After making these changes:
1. Restart your development server (`npm run dev`)
2. Submit a form to test
3. Check the browser console for debug information

## Expected Result
Once properly configured:
1. Form data will be saved to Google Sheets
2. Users will automatically receive personalized welcome emails
3. Admin notifications will be sent via Formspree
4. Console will show successful submissions

## Troubleshooting
If it still doesn't work:
1. Check that the Google Apps Script code matches the `google-apps-script-universal.js` file
2. Verify that the Gmail account has the correct App Password set up
3. Test the URLs directly in a browser - they should return JSON instead of login pages
