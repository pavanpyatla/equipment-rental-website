import { useEffect, useState } from "react";
import { rentalAPI } from "../../utils/api";
import { motion } from "framer-motion";

export default function Dashboard() {
    const [rentals, setRentals] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, overdue: 0 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const data = await rentalAPI.getAll();
            setRentals(data);
            calculateStats(data);
        } catch (error) {
            console.error("Failed to fetch rentals", error);
        } finally {
            setLoading(false);
        }
    };

    const isOverdue = (rental) => {
        if (rental.status !== 'approved') return false;
        return new Date(rental.endDate) < new Date();
    };

    const calculateStats = (data) => {
        const stats = {
            total: data.length,
            pending: data.filter(r => r.status === 'pending').length,
            approved: data.filter(r => r.status === 'approved').length,
            overdue: data.filter(r => isOverdue(r)).length
        };
        setStats(stats);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:4000/api/rentals/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchRentals(); // Refresh
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const filteredRentals = rentals
        .filter(r =>
            searchTerm === "" ||
            r.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "newest") return new Date(b.startDate) - new Date(a.startDate);
            if (sortOrder === "oldest") return new Date(a.startDate) - new Date(b.startDate);
            return 0;
        });

    const getStatusColor = (status, rental) => {
        if (isOverdue(rental)) return "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse";
        switch (status) {
            case 'pending': return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case 'approved': return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case 'declined': return "bg-red-500/10 text-red-500 border-red-500/20";
            case 'completed': return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <div className="space-y-6 text-slate-900 dark:text-white">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 text-sm font-medium">Total Rentals</h3>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-amber-500 text-sm font-medium">Pending Requests</h3>
                    <p className="text-3xl font-bold mt-2 text-amber-500">{stats.pending}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-emerald-500 text-sm font-medium">Active Rentals</h3>
                    <p className="text-3xl font-bold mt-2 text-emerald-500">{stats.approved}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-red-500 text-sm font-medium">Overdue Items</h3>
                    <p className="text-3xl font-bold mt-2 text-red-500">{stats.overdue}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                    type="text"
                    placeholder="Search rentals..."
                    className="bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Rentals Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs uppercase">
                        <tr>
                            <th className="p-4">Equipment</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Dates</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? <tr><td colSpan="5" className="p-8 text-center">Loading...</td></tr> :
                            filteredRentals.map(rental => (
                                <motion.tr
                                    key={rental._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="font-medium">{rental.equipment}</div>
                                        <div className="text-xs text-slate-500">{rental.location}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium">{rental.fullName}</div>
                                        <div className="text-xs text-slate-500">{rental.phone}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(rental.status, rental)}`}>
                                            {isOverdue(rental) ? "OVERDUE" : rental.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        {rental.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(rental._id, 'approved')}
                                                    className="px-3 py-1 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 transition"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(rental._id, 'declined')}
                                                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )}
                                        {rental.status === 'approved' && (
                                            <button
                                                onClick={() => handleStatusUpdate(rental._id, 'completed')}
                                                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                                            >
                                                Return
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
