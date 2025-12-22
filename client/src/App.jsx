import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

// Pages
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyRentals from "./pages/MyRentals";
import ComparePrices from "./pages/ComparePrices";
import TrackOrders from "./pages/TrackOrders";

// ADMIN
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Logs from "./admin/pages/Logs";
import Inventory from "./admin/pages/Inventory";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />

      <div className="pt-24 px-6 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/my-rentals" element={<MyRentals />} />
          <Route path="/compare-prices" element={<ComparePrices />} />
          <Route path="/track-orders" element={<TrackOrders />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ADMIN */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="logs" element={<Logs />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </ThemeProvider>
  );
}
