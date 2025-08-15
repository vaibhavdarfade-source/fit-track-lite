# FitTrack Lite 🏃‍♂️

A **minimal, privacy-first** web dashboard that pulls today’s fitness data (steps, calories, heart-rate) from **Fitbit** after a single OAuth click.  
No user accounts, no persistent storage—everything lives in the current browser session.

---

## ✨ Demo (30-second video)

[Watch 30-sec GIF](https://user-images.githubusercontent.com/YOU/demo.gif)  
Live site: https://fit-track-lite.onrender.com

---

## 🚀 Features

- **One-click Fitbit connect** via standard OAuth 2  
- Real-time display of:
  - Steps
  - Calories burned
  - Distance
- Auto-expires—no data stored on our side  
- Responsive, dark-mode-ready CSS (Water.css)  
- Deploys to **Render** (or any Node host) in 2 minutes

---

## 🛠️ Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Backend      | Node.js 22 + Express        |
| Auth         | Fitbit Web API (OAuth 2)    |
| Front-end    | Vanilla HTML/JS/CSS         |
| Hosting      | Render (free tier)          |

---

## 📦 Quick Start

### 1. Clone & install
```bash
git clone https://github.com/YOU/fit-track-lite.git
cd fit-track-lite
npm install
