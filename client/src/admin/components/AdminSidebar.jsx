import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="fixed top-24 left-0 h-[calc(100vh-6rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm transition-all duration-300 z-40">
            <div className="p-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Admin Console
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`
                    }
                >
                    <span>📊</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/logs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`
                    }
                >
                    <span>📜</span>
                    <span>Activity Logs</span>
                </NavLink>

                <NavLink
                    to="/admin/inventory"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-indigo-600 shadow-lg shadow-indigo-900/50 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`
                    }
                >
                    <span>🚜</span>
                    <span>Inventory</span>
                </NavLink>

                <div className="pt-4 mt-4 border-t border-slate-800">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
                    <div className="px-4 py-2 text-slate-600 text-sm cursor-not-allowed">Users (Coming Soon)</div>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500 text-sm font-bold">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">Administrator</p>
                        <p className="text-xs text-slate-500 truncate">admin@system.com</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        ➤
                    </button>
                </div>
            </div>
        </aside>
    );
}
