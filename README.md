# Sardina de la patatina

A gentle web app to help overcome creative paralysis (blank page syndrome).

## Features

- 🎲 Random creative prompts across categories (Sketch, Photo, Talk, Writing, etc.)
- 📅 Activity log with calendar view
- 💾 Optional text/image uploads when completing activities
- 🌧️ "Not today" is a valid outcome
- ✨ Daily affirmations (one per day)

## Tech Stack

- Vanilla JS + Vite
- Firebase (Auth + Firestore)
- Hosted on GitHub Pages

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/SardinaYLaPatatina.git
cd SardinaYLaPatatina
npm install
```

### 2. Firebase Configuration

The app is pre-configured with a Firebase project. If you want to use your own:

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Sign-in method → Google
3. Enable **Firestore Database** → Start in test mode
4. Copy your config to `src/firebase-config.js`

### 3. Firestore Security Rules

In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User logs
    match /userLogs/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    
    // Pending tasks
    match /pendingTasks/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Run locally

```bash
npm run dev
```

### 5. Deploy to GitHub Pages

```bash
npm run build
```

Then push the `dist` folder to your `gh-pages` branch, or use the GitHub Actions workflow included.

## Design Philosophy

- **No pressure**: No streaks, no scores, no gamification
- **Calm UX**: Neutral colors, gentle language
- **Permission-based**: "Not today" is always valid
- **Low cognitive load**: One button to start
