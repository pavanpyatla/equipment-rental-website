import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { rentalAPI } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

export default function MyRentals() {
    const { state } = useLocation();
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(state?.message || "");

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            setLoading(true);
            const data = await rentalAPI.getUserRentals();
            setRentals(data);
        } catch (err) {
            console.error("Fetch rentals error:", err);
            if (err.response?.status === 401) {
                setError("Please login to view your rentals");
            } else {
                setError("Failed to load rental requests");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900";
            case "approved":
                return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900";
            case "completed":
                return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 pt-24 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    My Rental Requests
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Track and manage your equipment rental requests
                </p>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
                    >
                        {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading your rentals...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && rentals.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        No Rental Requests Yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        You haven't submitted any equipment rental requests.
                    </p>
                    <Link
                        to="/equipment"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Request Equipment
                    </Link>
                </motion.div>
            )}

            {/* Rentals Grid */}
            {!loading && !error && rentals.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {rentals.map((rental, index) => (
                            <motion.div
                                key={rental._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-sm hover:shadow-lg dark:shadow-slate-900/50 transition-all duration-300"
                            >
                                {/* Status Badge */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {rental.equipment}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{rental.category}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                            rental.status
                                        )}`}
                                    >
                                        {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                                    </span>
                                </div>

                                {/* Rental Details */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start">
                                        <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Location:</span>
                                        <span className="text-slate-900 dark:text-slate-200 font-medium">{rental.location}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Duration:</span>
                                        <span className="text-slate-900 dark:text-slate-200 font-medium">{rental.duration}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Start Date:</span>
                                        <span className="text-slate-900 dark:text-slate-200 font-medium">
                                            {formatDate(rental.startDate)}
                                        </span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">End Date:</span>
                                        <span className="text-slate-900 dark:text-slate-200 font-medium">
                                            {formatDate(rental.endDate)}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <div className="text-sm space-y-1">
                                        <div className="flex items-center">
                                            <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Contact:</span>
                                            <span className="text-slate-900 dark:text-slate-200">{rental.fullName}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Phone:</span>
                                            <span className="text-slate-900 dark:text-slate-200">{rental.phone}</span>
                                        </div>
                                        {rental.email && (
                                            <div className="flex items-center">
                                                <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">Email:</span>
                                                <span className="text-slate-900 dark:text-slate-200">{rental.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                {rental.notes && (
                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Notes:</p>
                                        <p className="text-sm text-slate-900 dark:text-slate-200 mt-1">{rental.notes}</p>
                                    </div>
                                )}

                                {/* Timestamp */}
                                <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                                    Submitted on {formatDate(rental.createdAt)}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
