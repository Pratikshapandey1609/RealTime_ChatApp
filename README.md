# 💬 Chat App

A real-time chat and video calling application built with **React, Node.js, Express, MongoDB, and Stream Video SDK**.
This project demonstrates full-stack development skills, authentication, chat integration, and real-time communication.

---

## 🚀 Features

✅ User Authentication (Login/Signup)
✅ Real-time Chat with WebSockets
✅ Video Call using **Stream.io SDK**
✅ Responsive UI with **Tailwind CSS**
✅ State Management with **React Query**
✅ Error Handling with **Toast Notifications**
✅ Secure API using JWT

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* 🎨 Tailwind CSS
* 🔄 React Query
* 🎥 Framer Motion (animations)

### Backend

* 🌐 Node.js + Express
* 🗄️ MongoDB (Mongoose ODM)
* 🔑 JWT Authentication

### Video & Chat

* 📹 [Stream Video React SDK](https://getstream.io/video/)

---

## 📂 Project Structure

```
frontend/
 ├── src/
 │   ├── Pages/        # App pages (Home, Login, Chat, CallPage)
 │   ├── components/   # Reusable UI components
 │   ├── hooks/        # Custom React hooks
 │   ├── lib/          # API calls & utils
 │   └── App.jsx       # Main React component
 └── package.json

backend/
 ├── models/           # MongoDB models
 ├── routes/           # Express routes
 ├── controllers/      # API logic
 └── server.js         # App entry
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### Setup Backend

```bash
cd backend
npm install
npm run dev
```

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in **backend/** and **frontend/**:

### Backend

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend

```
VITE_STEAM_API_KEY=your_stream_api_key
```

## 🎯 How to Run

1. Start **backend** → `nodemon server.js`
2. Start **frontend** → `npm run dev`
3. Open `http://localhost:5173` in browser

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


✨ **Made with ❤️ by Pratiksha Pandey**
