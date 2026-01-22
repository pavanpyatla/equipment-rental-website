import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-slate-900 border-b border-emerald-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">

        {/* LEFT - Logo (clickable) */}
        {/* LEFT - Logo (clickable) */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo Icon Container */}
          <div className="relative flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
            {/* Abstract Construction Icon (Building/Crane hint) */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-10h2m-2 4h2m-4-8h4M5 21h14" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">RE</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-200 leading-none">
              Rent<span className="text-slate-800 dark:text-slate-100">Equip</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-medium tracking-wide hidden sm:block">
              PREMIUM CONSTRUCTION RENTALS
            </p>
          </div>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* DESKTOP CENTER NAV */}
        <div className="hidden lg:flex gap-6">
          <NavLink to="/" className={navStyle}>Home</NavLink>
          <NavLink to="/about" className={navStyle}>About Us</NavLink>
          <NavLink to="/services" className={navStyle}>Our Services</NavLink>
          {user && (
            <>
              <NavLink to="/my-rentals" className={navStyle}>My Rentals</NavLink>
              {user.role === "admin" && (
                <NavLink to="/admin" className={navStyle}>Admin</NavLink>
              )}

            </>
          )}
          <NavLink to="/contact" className={navStyle}>Contact Us</NavLink>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden lg:flex gap-5 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 text-xl hover:scale-110 transition-transform"
            title="Toggle Theme"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-5 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 dark:hover:border-indigo-400 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 shadow-lg shadow-amber-200 dark:shadow-amber-900/20 hover:-translate-y-0.5 transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-3 border border-red-400 dark:border-red-500/50 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 shadow-lg">
          <div className="flex flex-col p-4 space-y-2">
            <NavLink to="/" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
              About Us
            </NavLink>
            <NavLink to="/services" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
              Our Services
            </NavLink>
            {user && (
              <>
                <NavLink to="/my-rentals" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
                  My Rentals
                </NavLink>
                {user.role === "admin" && (
                  <NavLink to="/admin" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
                    Admin
                  </NavLink>
                )}


              </>
            )}
            <NavLink to="/contact" onClick={closeMobileMenu} className="px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition">
              Contact Us
            </NavLink>

            <div className="border-t dark:border-slate-800 pt-4 mt-4 flex flex-col space-y-2">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 dark:hover:border-indigo-400 transition text-center"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-center"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium text-center">
                    Welcome, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 border border-red-400 dark:border-red-500/50 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const navStyle =
  "px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors";
