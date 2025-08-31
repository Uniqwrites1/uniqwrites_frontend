# Quick Setup Checklist for Google Sheets Integration

## ✅ What You Need To Do Next

### Step 1: Add Column Headers (If Not Done Already)
Make sure each of your Google Sheets has these column headers in Row 1:

**All sheets should have these basic columns:**
- A: Timestamp
- B: Form Type
- C: Name
- D: Email
- E: Phone Number
- F-O: (Additional columns as needed for specific form data)

### Step 2: Set Up Google Apps Script for Each Sheet

**For EACH Google Sheet you created:**

1. **Open the Google Sheet**
2. **Click Extensions > Apps Script**
3. **Delete all existing code**
4. **Copy and paste the code from `google-apps-script-universal.js`**
5. **Click Save (Ctrl+S)**
6. **Click Deploy > New Deployment**
7. **Settings:**
   - Type: Web app
   - Execute as: Me ([your-email])
   - Who has access: Anyone
8. **Click Deploy**
9. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 3: Update Your Environment Variables

Create a `.env` file in your project root (copy from `.env.example`) and add:

```bash
# Replace with your actual Web App URLs from Step 2
VITE_GOOGLE_SHEETS_PARENT_URL=https://script.google.com/macros/s/YOUR_PARENT_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_STUDENT_URL=https://script.google.com/macros/s/YOUR_STUDENT_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_SCHOOL_URL=https://script.google.com/macros/s/YOUR_SCHOOL_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_TEACHER_URL=https://script.google.com/macros/s/YOUR_TEACHER_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_INITIATIVE_URL=https://script.google.com/macros/s/YOUR_INITIATIVE_SCRIPT_ID/exec
```

### Step 4: Test the Integration

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Submit a test form** on your website

3. **Check your Google Sheet** - you should see the data appear

### Step 5: Verify Everything is Working

**Check these things:**

✅ Data appears in the correct Google Sheet  
✅ Timestamp is automatically added  
✅ All form fields are captured  
✅ Email notifications still work  
✅ No console errors in browser  

## 🚨 Troubleshooting

**If data doesn't appear in Google Sheets:**

1. **Check the browser console** for error messages
2. **Test the Web App URL** by visiting it directly (should show a status message)
3. **Check Google Apps Script logs:**
   - Go to Apps Script editor
   - Click "Executions" on the left
   - Look for error messages
4. **Verify permissions:**
   - Make sure the script is deployed with "Anyone" access
   - Try re-deploying if needed

**Common Issues:**
- ❌ **CORS errors**: Make sure deployment has "Anyone" access
- ❌ **No data appearing**: Check if the Web App URL is correct
- ❌ **Script errors**: Make sure you copied the entire script code
- ❌ **Permission denied**: Re-deploy with proper permissions

## 📝 What Happens Next

Once set up:
- ✅ Every form submission automatically goes to Google Sheets
- ✅ You get email notifications (existing functionality)
- ✅ Data is organized and ready for analysis
- ✅ Real-time updates as forms are submitted

## 🆘 Need Help?

If you run into issues:
1. Check the browser console for errors
2. Test one sheet at a time
3. Verify the Web App URLs are correct
4. Make sure the `.env` file is in the project root

The integration should work immediately after completing these steps!
