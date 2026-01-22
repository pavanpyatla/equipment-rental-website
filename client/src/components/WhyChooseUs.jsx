import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-28">

      {/* Heading */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
        >
          Why Choose Our Platform?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-slate-600 dark:text-slate-400 text-lg"
        >
          Reliable construction equipment rentals with unmatched service quality
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        <WhyCard
          title="Verified Equipment Providers"
          desc="All vendors are carefully verified to ensure safety, reliability, and quality service."
          icon="🛡️"
          highlight
          delay={0.1}
        />

        <WhyCard
          title="Best Price Transparency"
          desc="Get competitive pricing with no hidden charges and clear rental breakdowns."
          icon="💰"
          delay={0.2}
        />

        <WhyCard
          title="Quick & Easy Booking"
          desc="Book required equipment in minutes with our simple and fast booking process."
          icon="⚡"
          delay={0.3}
        />

        <WhyCard
          title="Trusted by Contractors"
          desc="Used by thousands of contractors and builders across multiple projects."
          icon="⭐"
          delay={0.4}
        />

        <WhyCard
          title="24/7 Customer Assistance"
          desc="Round-the-clock support to help you at every stage of your rental."
          icon="🎧"
          delay={0.5}
        />

        <WhyCard
          title="Multi-City Availability"
          desc="Construction equipment rentals available across multiple cities and regions."
          icon="📍"
          delay={0.6}
        />

      </div>
    </section>
  );
}

function WhyCard({ title, desc, icon, highlight, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`rounded-2xl border p-8 bg-white dark:bg-slate-800 shadow-sm transition
        ${highlight
          ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/20 dark:border-emerald-500/50"
          : "border-slate-200 dark:border-slate-700 hover:shadow-md dark:shadow-slate-900/50"
        }`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-2xl mb-5">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
