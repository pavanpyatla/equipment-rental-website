import { useState } from "react";
import { motion } from "framer-motion";

// Shared equipment data (same as User view)
const equipmentData = [
    { id: 1, name: "Crawler Crane", icon: "🏗", category: "Lifting", stock: 5 },
    { id: 2, name: "Hydraulic Excavator", icon: "🚜", category: "Earthmoving", stock: 8 },
    { id: 3, name: "Wheel Loader", icon: "🚛", category: "Earthmoving", stock: 4 },
    { id: 4, name: "Bulldozer", icon: "🏗️", category: "Earthmoving", stock: 3 },
    { id: 5, name: "Dump Truck", icon: "🚚", category: "Transport", stock: 10 },
    { id: 6, name: "Backhoe Loader", icon: "🚜", category: "Earthmoving", stock: 6 },
    { id: 7, name: "Motor Grader", icon: "🛣️", category: "Grading", stock: 2 },
    { id: 8, name: "Concrete Mixer", icon: "🧱", category: "Concrete", stock: 12 },
    { id: 9, name: "Tower Crane", icon: "🏢", category: "Lifting", stock: 1 },
    { id: 10, name: "Road Roller", icon: "🛞", category: "Compaction", stock: 4 },
    { id: 11, name: "Piling Rig", icon: "⚙️", category: "Foundation", stock: 2 },
    { id: 12, name: "Forklift", icon: "🏭", category: "Lifting", stock: 15 },
];

export default function Inventory() {
    const [equipment] = useState(equipmentData);

    return (
        <div className="text-slate-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-2">Equipment Inventory</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Manage fleet and stock levels</p>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">Item</th>
                            <th className="p-4">Category</th>
                            <th className="p-4 text-center">Total Stock</th>
                            <th className="p-4 text-center">Available</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {equipment.map(item => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-sm"
                            >
                                <td className="p-4 font-medium flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-slate-900 dark:text-white">{item.name}</span>
                                </td>
                                <td className="p-4 text-slate-500">
                                    {item.category}
                                </td>
                                <td className="p-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                                    {item.stock}
                                </td>
                                <td className="p-4 text-center font-semibold text-green-600 dark:text-green-400">
                                    {item.stock} {/* Mock availability for now */}
                                </td>
                                <td className="p-4 text-center">
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">In Stock</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-xs">
                                        Edit
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
