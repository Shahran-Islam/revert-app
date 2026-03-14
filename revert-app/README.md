# REVERT — A New Muslim Companion
### A special project for Deanna · by Shahran Islam

---

## Getting Started in IntelliJ

### Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (choose the LTS version).

### Step 2 — Open the project
1. Open IntelliJ IDEA
2. Click **File → Open** and select the `revert-app` folder
3. IntelliJ will detect it as a JavaScript project

### Step 3 — Install dependencies
Open the Terminal inside IntelliJ (bottom toolbar → Terminal) and run:
```
npm install
```

### Step 4 — Run the app locally
```
npm start
```
This opens the app at http://localhost:3000 in your browser.
To preview on your iPhone: make sure your phone is on the same WiFi,
then visit http://YOUR_COMPUTER_IP:3000 in Safari on your iPhone.

---

## Install on iPhone (No App Store needed!)

1. Open the app URL in **Safari** on your iPhone
2. Tap the **Share button** (box with arrow at bottom of Safari)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right
5. The REVERT app icon now appears on your home screen!

---

## Deploy to the Internet for Free (Vercel)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up for free.

### Step 2 — Push your code to GitHub
In IntelliJ Terminal:
```
git init
git add .
git commit -m "Initial REVERT app commit"
```
Then create a new repository on GitHub.com and follow their instructions to push.

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **"New Project"**
3. Select your `revert-app` repository
4. Click **"Deploy"** — that's it!

Vercel gives you a free URL like `revert-app.vercel.app`.
Share this link with Deanna — she can open it in Safari and add it to her home screen.

### Step 4 — Custom domain (optional)
Buy a domain at https://namecheap.com (~$10/year) like `revert-app.com`
Then connect it in Vercel's dashboard under **Settings → Domains**.

---

## App Features

| Screen | Features |
|--------|----------|
| Splash | Animated loading screen with Bismillah, app name, dedication to Deanna |
| Home | Live prayer countdown, daily dhikr, quick navigation tiles |
| Prayer Times | Real prayer times via Aladhan API, live Qibla compass |
| Quran | Surah list, featured verse, audio recitation player |
| Learning Guides | 10-lesson new Muslim curriculum with progress tracking |

---

## APIs Used (All Free)

- **Aladhan API** — Prayer times & Qibla direction (aladhan.com)
- **Islamic Network CDN** — Quran audio recitation

---

## iPhone Compatibility

Optimised for:
- iPhone 17 Pro Max (430×932pt)
- iPhone 16 Pro / Pro Max
- iPhone 15 series
- iPhone 14 series
- iPhone SE (3rd gen)
- All screen sizes via responsive clamp() CSS

---

## Project Structure

```
revert-app/
├── public/
│   ├── index.html          # PWA-ready HTML with Apple meta tags
│   └── manifest.json       # Makes app installable on home screen
├── src/
│   ├── screens/
│   │   ├── SplashScreen.js # Loading screen with dedication
│   │   ├── HomeScreen.js   # Dashboard
│   │   ├── PrayerScreen.js # Prayer times + Qibla
│   │   ├── QuranScreen.js  # Quran reader + audio
│   │   └── GuidesScreen.js # Learning journey
│   ├── components/
│   │   ├── BottomNav.js    # Navigation bar
│   │   └── StatusBar.js    # iPhone status bar
│   ├── hooks/
│   │   └── usePrayerTimes.js # Prayer times + location logic
│   ├── App.js              # Main app + routing
│   └── index.css           # Global styles + CSS variables
└── package.json
```

---

Made with ❤️ by Shahran Islam
