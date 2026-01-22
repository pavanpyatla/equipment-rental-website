import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rentalAPI } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrders() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const data = await rentalAPI.getUserRentals();
            setRentals(data);
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Please login to track your orders");
            } else {
                setError("Failed to load orders");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900",
            approved: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900",
            completed: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900",
            cancelled: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900"
        };
        return colors[status] || "bg-gray-100 text-gray-800 border-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
    };

    const filteredRentals = filter === "all"
        ? rentals
        : rentals.filter(r => r.status === filter);

    if (loading) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-slate-400">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="text-center">
                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">

            {/* Header */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 dark:from-green-900 dark:to-green-800 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Track Your Orders
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto"
                    >
                        Monitor all your equipment rental requests in real-time
                    </motion.p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 mt-12">

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/50 p-6 mb-8 border border-transparent dark:border-slate-700"
                >
                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                        {["all", "pending", "approved", "completed", "cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-3 rounded-lg font-medium capitalize whitespace-nowrap transition ${filter === status
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                                    }`}
                            >
                                {status} {status === "all" && `(${rentals.length})`}
                                {status !== "all" && `(${rentals.filter(r => r.status === status).length})`}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Orders List */}
                {filteredRentals.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/50 p-12 text-center border border-transparent dark:border-slate-700"
                    >
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No orders found</h3>
                        <p className="text-gray-600 dark:text-slate-400 mb-6">
                            {filter === "all"
                                ? "You haven't made any rental requests yet"
                                : `No ${filter} orders`}
                        </p>
                        <button
                            onClick={() => navigate("/equipment")}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Rent Equipment
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {filteredRentals.map((rental, index) => (
                                <motion.div
                                    key={rental._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md dark:shadow-slate-900/50 transition border border-transparent dark:border-slate-700"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{rental.equipment}</h3>
                                            <p className="text-sm text-gray-500 dark:text-slate-400">Order ID: {rental._id.slice(-8)}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(rental.status)}`}>
                                            {rental.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">Location:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">{rental.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">Duration:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">{rental.duration}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">Start Date:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">
                                                {new Date(rental.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">End Date:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">
                                                {new Date(rental.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">Contact:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">{rental.phone}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-slate-400">Requested:</span>
                                            <span className="ml-2 font-medium text-slate-900 dark:text-slate-200">
                                                {new Date(rental.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {rental.notes && (
                                        <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                                            <span className="text-sm text-gray-600 dark:text-slate-400">Notes:</span>
                                            <p className="text-sm mt-1 text-slate-900 dark:text-slate-200">{rental.notes}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

            </div>
        </div>
    );
}
