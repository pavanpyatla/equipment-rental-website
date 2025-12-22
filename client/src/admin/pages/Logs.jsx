import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:4000/api/admin/logs", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setLogs(data);
                }
            } catch (error) {
                console.error("Failed to fetch logs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="text-slate-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-2">Activity Logs</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">History of administrative actions</p>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">Admin</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">Details</th>
                            <th className="p-4 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan="4" className="p-8 text-center">Loading logs...</td></tr>
                        ) : logs.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">No activity recorded yet</td></tr>
                        ) : (
                            logs.map(log => (
                                <motion.tr
                                    key={log._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-sm"
                                >
                                    <td className="p-4 font-medium">
                                        <div className="text-slate-900 dark:text-white">{log.adminId?.name || "Unknown"}</div>
                                        <div className="text-xs text-slate-500">{log.adminId?.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${log.action === "APPROVED" ? "bg-green-100 text-green-700" :
                                                log.action === "DECLINED" || log.action === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                    "bg-blue-100 text-blue-700"
                                            }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">
                                        {log.details}
                                    </td>
                                    <td className="p-4 text-right text-slate-500 text-xs text-nowrap">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
