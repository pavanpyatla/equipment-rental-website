import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <div className="bg-gradient-to-r from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-15 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-full text-sm font-medium"
        >
          🏗 Trusted Construction Equipment Rentals
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight"
        >
          Rent Construction Equipment <br />
          <span className="text-indigo-600 dark:text-indigo-400">
            For Every Site, Every Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto"
        >
          Book well-maintained construction equipment with flexible rental plans.
        </motion.p>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
        >
          Choose Your Equipment Category
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          <CategoryCard title="Crane Rental" desc="Heavy lifting solutions" color="indigo" icon="🏗" delay={0.1} />
          <CategoryCard title="Excavator Rental" desc="Earth moving equipment" color="amber" icon="🚜" delay={0.2} />
          <CategoryCard title="Loader Rental" desc="Material handling machines" color="blue" icon="🚛" delay={0.3} />
          <CategoryCard title="Bulldozer Rental" desc="Powerful site clearing" color="orange" icon="🏗️" delay={0.4} />
          <CategoryCard title="Dumper Rental" desc="Heavy-duty transport" color="emerald" icon="🚚" delay={0.5} />
        </div>
      </section>
    </div>
  );
}

/* ================= CATEGORY CARD ================= */

function CategoryCard({ title, desc, color, icon, delay }) {
  const navigate = useNavigate();

  const colors = {
    indigo: "bg-indigo-50 border-indigo-300 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-700 dark:text-indigo-400",
    amber: "bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-400",
    blue: "bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400",
    orange: "bg-orange-50 border-orange-300 text-orange-600 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-400",
    emerald: "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={() => navigate("/equipment")}
      className="relative bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm hover:shadow-md dark:shadow-slate-900/50 transition cursor-pointer"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{desc}</p>

      <button
        type="button"
        className={`mt-6 w-full py-2 rounded-lg font-medium border ${colors[color]} transition-colors`}
      >
        Book now →
      </button>
    </motion.div>
  );
}
