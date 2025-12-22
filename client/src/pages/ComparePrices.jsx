import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ComparePrices() {
    const navigate = useNavigate();
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [duration, setDuration] = useState("daily");

    const equipmentPricing = {
        excavator: { daily: 5500, weekly: 35000, monthly: 120000 },
        crane: { daily: 8500, weekly: 55000, monthly: 180000 },
        loader: { daily: 4500, weekly: 28000, monthly: 95000 },
        bulldozer: { daily: 6000, weekly: 38000, monthly: 130000 },
        dumper: { daily: 3500, weekly: 22000, monthly: 75000 },
        roller: { daily: 4000, weekly: 25000, monthly: 85000 }
    };

    const equipment = [
        { id: "excavator", name: "Hydraulic Excavator", icon: "🚜" },
        { id: "crane", name: "Mobile Crane", icon: "🏗️" },
        { id: "loader", name: "Wheel Loader", icon: "🚛" },
        { id: "bulldozer", name: "Bulldozer", icon: "🏗" },
        { id: "dumper", name: "Dump Truck", icon: "🚚" },
        { id: "roller", name: "Road Roller", icon: "🛣️" }
    ];

    return (
        <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">

            {/* Header */}
            <section className="bg-gradient-to-r from-indigo-700 to-indigo-600 dark:from-indigo-900 dark:to-indigo-800 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Compare Equipment Prices
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 text-lg text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto"
                    >
                        Transparent pricing for all construction equipment rentals
                    </motion.p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 mt-12">

                {/* Duration Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/50 p-6 mb-8 border border-transparent dark:border-slate-700"
                >
                    <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Select Rental Duration</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                        {["daily", "weekly", "monthly"].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDuration(d)}
                                className={`px-6 py-3 rounded-lg font-medium capitalize transition whitespace-nowrap ${duration === d
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Price Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all border-2 border-transparent hover:border-indigo-600 dark:hover:border-indigo-500 dark:border-slate-700"
                        >
                            <div className="text-5xl mb-4 text-center">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-center mb-4 text-slate-900 dark:text-white">{item.name}</h3>

                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                    ₹{equipmentPricing[item.id][duration].toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-slate-400 capitalize">
                                    per {duration === 'daily' ? 'day' : duration === 'weekly' ? 'week' : 'month'}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-slate-300 mb-6">
                                <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                                    <span>Daily:</span>
                                    <span className="font-medium">₹{equipmentPricing[item.id].daily.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                                    <span>Weekly:</span>
                                    <span className="font-medium">₹{equipmentPricing[item.id].weekly.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Monthly:</span>
                                    <span className="font-medium">₹{equipmentPricing[item.id].monthly.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/equipment", { state: { equipment: item.name } })}
                                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-md"
                            >
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-500 p-6 rounded-lg"
                >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Pricing Information</h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        <li>• Prices include equipment delivery and pickup</li>
                        <li>• Operator charges separate (₹1,500-₹2,500/day)</li>
                        <li>• Fuel costs not included</li>
                        <li>• Weekly and monthly rates offer significant savings</li>
                        <li>• Contact us for custom quotes on bulk orders</li>
                    </ul>
                </motion.div>

            </div>
        </div>
    );
}
