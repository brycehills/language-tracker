
# 🧠 Language Tracker

**Track your language learning progress, analyze your study habits, and get personalized AI suggestions.**

> A full-stack TypeScript web application built with React, TailwindCSS, Express, and PostgreSQL. Ideal for language learners, this app allows users to log study sessions and receive tailored recommendations from OpenAI’s GPT API.

---

## 📸 Screenshots

| Main Dashboard | AI Suggestions |
|----------------|----------------|
| ![screenshot-placeholder-1](./screenshots/main.pdf) | ![screenshot-placeholder-2](./screenshots/AI.png) |

> Replace `./screenshots/*.png` with actual screenshots of your app. Include:
> - Login screen
> - Study session form
> - Auto-updating session list
> - Graph showing study activity
> - ChatGPT suggestions box

---

## ✨ Features

- 🔐 **Secure Auth** – Email/password authentication with JWT (bcrypt + protected routes)
- ✍️ **Log Study Sessions** – Track reading, writing, listening, and speaking time
- 📊 **Data Visualization** – Graph study trends over time
- ⚡️ **Real-Time Updates** – Session list and chart update live after entry
- 🤖 **AI-Powered Suggestions** – GPT-generated study tips based on your latest session
- 🎨 **Minimalist UI** – Styled with Tailwind for clean, responsive design
- 🔄 **Persistent Sessions** – Data saved to PostgreSQL via RESTful API

---

## 🧱 Tech Stack

| Frontend               | Backend                   | Other            |
|------------------------|---------------------------|------------------|
| React + TypeScript     | Node.js + Express          | PostgreSQL       |
| Tailwind CSS           | REST API + JWT Auth        | Vite             |
| React Router DOM       | dotenv, bcrypt, jsonwebtoken | OpenAI API    |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/language-tracker.git
cd language-tracker
```

### 2. Setup the backend

```bash
cd server
npm install
cp config.env.example config.env   # Replace with actual secrets
npm run dev
```

### 3. Setup the frontend

```bash
cd client
npm install
npm run dev
```

### 4. Create your PostgreSQL database

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE study_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  language TEXT,
  date DATE,
  notes TEXT,
  reading_minutes INTEGER,
  writing_minutes INTEGER,
  listening_minutes INTEGER,
  speaking_minutes INTEGER
);
```

---

## 🧠 How It Works

### Authentication

- Users register and log in using email/password
- JWT token is stored in React Context and sent with all protected API requests

### Data Flow

1. User submits a new session
2. Session is saved to the database
3. SessionList and Graph auto-refresh
4. Suggestions.tsx sends session to `/api/gpt/suggestions` for tips

### AI Integration

```ts
POST /api/gpt/suggestions

Request Body:
{
  session: {
    language: "Japanese",
    date: "2025-06-16",
    notes: "Studied passive voice grammar.",
    reading_minutes: 20,
    ...
  }
}
```

Response:

```json
{
  "suggestions": "via OpenAI (example): Next time, review active/passive transformations. Try listening to a Japanese podcast."
}
```

---

## 🧪 Future Improvements

- ✅ Editable sessions
- ✅ Dark mode toggle
- 🌍 Multi-language support for UI
- 📱 Mobile PWA version
- 🧠 GPT-based feedback scoring

---

## 💼 Author & Contact

**Bryce Hills**  
IT Consultant | Full-Stack Dev | CS @ UCR  
📫 [hillsbryce0@gmail.com]  
🌐 [https://www.linkedin.com/in/brycehills1/](#)
