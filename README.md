# RentEquip - Construction Equipment Rental Platform

A full-stack web application for renting construction equipment. Built with React, Node.js, Express, and MongoDB.

## Features

✅ **User Authentication**
- Secure signup and login with JWT
- Password hashing with bcrypt
- Protected routes and API endpoints

✅ **Equipment Rental System**
- Multi-step rental request form
- Equipment selection with visual cards
- Date range and duration selection
- Contact information collection

✅ **Rental Management**
- View all submitted rental requests
- Status tracking (pending, approved, completed, cancelled)
- Detailed rental information display

✅ **Modern UI/UX**
- Responsive design
- Beautiful gradients and animations
- Professional styling
- Intuitive navigation

## Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- CSS3 with modern gradients

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

## Project Structure

```
ReactProject/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── Backend/                # Backend Express server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Server entry point
│   └── package.json
│
└── README.md              # This file
```

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone or Extract the Project

```bash
cd ReactProject
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section below)
# Add your configuration to Backend/.env

# Start the backend server
npm run dev
```

The backend server will run on **http://localhost:4000**

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

### 4. MongoDB Setup

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should start automatically as a service
# Or run: mongod
```

The application will connect to MongoDB at `mongodb://127.0.0.1:27017/rentequip`

## Environment Variables

### Backend (.env file)

Create a `.env` file in the `Backend/` directory with the following variables:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/rentequip
JWT_SECRET=your_secret_key_here
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Frontend

No environment variables needed for the frontend in development mode.

## Running the Application

1. **Start MongoDB** (if not already running)
2. **Start the Backend:**
   ```bash
   cd Backend
   npm run dev
   ```
3. **Start the Frontend:** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
4. **Open your browser** and navigate to `http://localhost:5173`

## Default URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **MongoDB:** mongodb://127.0.0.1:27017/rentequip

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user

### Rentals
- `POST /api/rentals/create` - Create rental request (protected)
- `GET /api/rentals` - Get all rentals (admin)
- `GET /api/rentals/user` - Get current user's rentals (protected)

## Usage Guide

### For Users:

1. **Sign Up:** Create a new account with your name, email, and password
2. **Login:** Sign in with your credentials
3. **Browse Equipment:** Navigate to "Our Services" to see available equipment
4. **Book Equipment:** Click "Book now" on any equipment
5. **Fill Form:** Complete the multi-step rental form:
   - Select equipment type
   - Enter project location
   - Choose rental dates and duration
   - Provide contact information
6. **Submit:** Submit your rental request
7. **View Rentals:** Check "My Rentals" to see your requests

### For Developers:

- Backend code is in `Backend/`
- Frontend code is in `client/src/`
- MongoDB models are in `Backend/models/`
- API routes are in `Backend/routes/`
- React components are in `client/src/components/`
- React pages are in `client/src/pages/`

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Rental Requests Collection
```javascript
{
  userId: ObjectId (ref: 'User'),
  category: String,
  equipment: String,
  location: String,
  startDate: Date,
  endDate: Date,
  duration: String ('Daily', 'Weekly', 'Monthly'),
  fullName: String,
  phone: String,
  email: String,
  notes: String,
  status: String ('pending', 'approved', 'completed', 'cancelled'),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- Check MongoDB connection string in `.env` file
- Verify MongoDB is listening on port 27017

### Port Already in Use
- **Frontend (5173):** Change port in `client/vite.config.js`
- **Backend (4000):** Change `PORT` in `Backend/.env`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:5173`
- Check that both frontend and backend are running

## Building for Production

### Frontend
```bash
cd client
npm run build
```
This creates an optimized production build in `client/dist/`

### Backend
The backend runs the same in production, but ensure:
- Use environment variables for sensitive data
- Set `NODE_ENV=production`
- Use a production MongoDB instance
- Use strong JWT secret

## Security Notes

⚠️ **Before deploying to production:**

1. Change the `JWT_SECRET` to a strong, random string
2. Use environment variables for all sensitive data
3. Enable HTTPS
4. Use a production MongoDB instance (MongoDB Atlas recommended)
5. Implement rate limiting
6. Add input sanitization
7. Review and update CORS settings

## Future Enhancements

- Admin dashboard for managing rental requests
- Email notifications
- Payment integration (Stripe/PayPal)
- Calendar view for equipment availability
- Real-time updates with WebSocket
- File upload for documents
- Search and filter functionality
- Mobile app version

## License

This project is for educational/commercial use.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using React, Node.js, and MongoDB**
