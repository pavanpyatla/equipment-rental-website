# Quick Setup Guide

Follow these steps to get the RentEquip application running on your machine.

## Prerequisites Required

- ✅ Node.js (v14 or higher)
- ✅ MongoDB (v4 or higher)
- ✅ npm package manager

## Step-by-Step Setup

### 1️⃣ Extract/Open the Project

```bash
cd ReactProject
```

### 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

Create a file named `.env` in the `Backend/` folder with this content:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/rentequip
JWT_SECRET=supersecretkey
```

### 3️⃣ Setup Frontend

Open a **new terminal** and run:

```bash
cd client
npm install
```

### 4️⃣ Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB should start automatically, or run `mongod` in a terminal

## 🚀 Quick Start (Recommended)

1.  **Install Dependencies** (Installs both Frontend & Backend):
    ```bash
    npm install
    ```
    *Note: This will automatically run `install-all` to setup sub-folders.*

2.  **Start Application** (Runs both Client & Server):
    ```bash
    npm start
    ```
    - Frontend: http://localhost:5173
    - Backend: http://localhost:4000

---

## 📂 Manual Setup (Legacy)

### 1. Backend Setup
```bash
cd Backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Verification Checklist

✅ MongoDB is running  
✅ Backend server shows "MongoDB Connected"  
✅ Frontend dev server is running  
✅ Browser opens to http://localhost:5173  
✅ You can see the RentEquip homepage  

## Common Issues & Fixes

### "Cannot connect to MongoDB"
- Make sure MongoDB is installed and running
- Check that port 27017 is not blocked

### "Port 4000 already in use"
- Change PORT in `Backend/.env` to a different number (e.g., 4001)
- Update the API URL in `client/src/utils/api.js` accordingly

### "Port 5173 already in use"
- The frontend will automatically try the next available port
- Or kill the process using port 5173

### "Module not found" errors
- Delete `node_modules` folder
- Run `npm install` again

## Testing the Application

1. **Sign Up:** Create a new account
2. **Login:** Log in with your credentials
3. **Book Equipment:** Click "Book now" on any equipment
4. **Fill the form** and submit
5. **Check "My Rentals"** to see your booking

## Need Help?

- Read the full README.md for detailed documentation
- Check that all prerequisites are installed
- Make sure both backend and frontend are running
- Verify MongoDB connection

---

🎉 **Enjoy using RentEquip!**
