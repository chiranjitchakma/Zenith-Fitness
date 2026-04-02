# Zenith Fitness — Website

Premium gym website for **Zenith Fitness**, Vijay Nagar, Mysuru.

## 📁 Files

```
zenith-fitness/
├── index.html      → Main HTML (all sections)
├── style.css       → All styles (mobile-first, dark theme)
├── app.js          → JS: nav, animations, WhatsApp form, lightbox
└── README.md       → This file
```

## 🚀 How to Run

### Option 1 — Open Directly
Just double-click `index.html` in any browser. Everything works offline except the Google Maps embed.

### Option 2 — VS Code Live Server
1. Open folder in VS Code
2. Install **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**

### Option 3 — Deploy to Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `zenith-fitness/` folder
3. Done — live in 30 seconds ✅

### Option 4 — Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` inside the folder
3. Follow the prompts

### Option 5 — GitHub Pages
1. Push folder to a GitHub repo
2. Go to **Settings → Pages → Deploy from branch → main → root**
3. Your site is live at `https://username.github.io/repo-name`

### Option 6 — Android Studio (WebView App)
1. Create new Android project → **Empty Activity**
2. In `activity_main.xml`, add a `WebView`
3. In `MainActivity.kt`:
   ```kotlin
   webView.loadUrl("file:///android_asset/index.html")
   ```
4. Copy `index.html`, `style.css`, `app.js` into `assets/` folder

---

## ✏️ What to Edit

| Item | Location |
|------|----------|
| Membership prices | `index.html` → Plans section → `₹ ——` |
| Phone number | Already set to `099868 88633` |
| Address | Already set |
| Hours | Already set: 5:30 AM – 10 PM |
| Google Maps embed | `index.html` → `<iframe>` in Contact section — replace with actual embed URL |
| Member reviews | `index.html` → Reviews section |

## 📌 Features
- ✅ Mobile-first, responsive
- ✅ WhatsApp enquiry form (no backend)
- ✅ Sticky bottom bar (Call / WhatsApp / Directions / Join)
- ✅ Gallery with lightbox
- ✅ Scroll animations
- ✅ SEO meta tags
- ✅ Rating card with animated counter
- ✅ Membership plans
- ✅ Click-to-call
- ✅ Google Maps embed

## 📞 Contact (Business)
- **Phone:** 099868 88633
- **Address:** #4576, Surya Complex, R K Corner Circle, Vijay Nagar 2nd Stage, Mysuru – 570017
- **Hours:** 5:30 AM – 10:00 PM Daily
