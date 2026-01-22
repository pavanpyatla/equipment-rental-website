import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
          >
            How Renting Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-slate-600 dark:text-slate-400 text-lg"
          >
            Complete your equipment rental in just four simple steps
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <StepCard
            step="01"
            title="Explore Equipment"
            desc="Browse rental equipment based on your location and project needs."
            icon="🔍"
            delay={0.1}
          />

          <StepCard
            step="02"
            title="Submit Request"
            desc="Provide rental details and submit your requirement online."
            icon="📝"
            delay={0.2}
          />

          <StepCard
            step="03"
            title="Compare Offers"
            desc="Get quotes from vendors and choose the best available option."
            icon="📊"
            delay={0.3}
          />

          <StepCard
            step="04"
            title="Delivery & Usage"
            desc="Equipment is delivered to your site and ready for operation."
            icon="🚚"
            delay={0.4}
          />

        </div>
      </div>
    </section>
  );
}

/* ================= STEP CARD ================= */

function StepCard({ step, title, desc, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:shadow-slate-900/50 transition group"
    >

      {/* Step Number */}
      <div className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
        {step}
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
