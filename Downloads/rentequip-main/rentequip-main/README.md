## 🌐 Live Project Links (Deployed)

### 🔹 Frontend (Vercel)

[https://equipment-rental-website.vercel.app](https://equipment-rental-website.vercel.app)

### 🔹 Backend API (Render)

[https://equipment-rental-website.onrender.com](https://equipment-rental-website.onrender.com)

---

# RentEquip – Construction Equipment Rental Platform

A **full-stack MERN web application** for renting construction equipment. Built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB Atlas**.

---

## ✨ Features

### ✅ User Authentication

* Secure signup & login using **JWT**
* Password hashing with **bcrypt**
* Protected routes & APIs

### ✅ Equipment Rental System

* Multi-step rental request form
* Equipment selection with visual cards
* Date range & duration selection
* Contact information collection

### ✅ Rental Management

* View all submitted rental requests
* Status tracking (pending, approved, completed, cancelled)
* Detailed rental information display

### ✅ Modern UI / UX

* Fully responsive design
* Clean & professional UI
* Smooth navigation

---

## 🛠 Tech Stack

### Frontend

* React 18 (Vite)
* React Router v6
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB Atlas + Mongoose
* JWT Authentication
* bcrypt

---

## 📁 Project Structure

```
equipment-rental-website/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend/                # Backend (Node + Express)
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Live URLs

### Production

* **Frontend:** [https://equipment-rental-website.vercel.app](https://equipment-rental-website.vercel.app)
* **Backend API:** [https://equipment-rental-website.onrender.com](https://equipment-rental-website.onrender.com)

### Development

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:4000](http://localhost:4000)

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)

```env
PORT=4000
MONGO_URI=<MongoDB Atlas connection string>
JWT_SECRET=<your_secret_key>
```

> ⚠️ In production, **MongoDB Atlas** is used instead of local MongoDB.

### Frontend (Vercel)

```env
VITE_API_URL=https://equipment-rental-website.onrender.com
```

---

## 📦 Installation & Setup (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pavanpyatla/equipment-rental-website.git
cd equipment-rental-website
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔗 API Endpoints

### Authentication

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user

### Rentals

* `POST /api/rentals/create` – Create rental (protected)
* `GET /api/rentals` – Get all rentals (admin)
* `GET /api/rentals/user` – User rentals

---

## 🧪 Usage Guide

### For Users

1. Sign up / Login
2. Browse equipment
3. Fill rental form
4. Submit request
5. Track rental status

### For Developers

* Frontend code → `client/src`
* Backend code → `Backend/`
* API routes → `Backend/routes`
* DB models → `Backend/models`

---

## 🗄 Database Schema

### Users

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Rentals

```js
{
  userId: ObjectId,
  equipment: String,
  location: String,
  startDate: Date,
  endDate: Date,
  duration: String,
  status: String
}
```

---

## 🌍 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

The frontend communicates with the backend using environment variables.

---

## 🔐 Security Notes

* Use strong JWT secrets
* Store secrets in environment variables
* Use MongoDB Atlas in production
* Enable CORS properly

---

## 🚧 Future Enhancements

* Admin dashboard
* Payment integration
* Email notifications
* Equipment availability calendar
* Search & filters

---

## 📜 License

This project is for educational and commercial use.

---

**Built with ❤️ using React, Node.js, and MongoDB**
