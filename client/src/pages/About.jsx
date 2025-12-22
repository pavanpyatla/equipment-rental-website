import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-2 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

      {/* ===== IMAGE BANNER SECTION ===== */}
      <section
        className="relative h-[320px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://equipmenttimes.in/uploads/images/202502/image_870x_67b6ff2499cbd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-900/80"></div>

        {/* Content */}
        <div className="relative text-center text-white px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold tracking-wide"
          >
            About <span className="text-amber-400">RentEquip</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-lg text-slate-200 max-w-2xl mx-auto"
          >
            India’s trusted construction equipment rental platform
          </motion.p>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">
              Our <span className="text-amber-500">Story</span>
            </h2>

            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              <p>
                RentEquip was founded with a clear mission — to simplify
                construction equipment rentals and make reliable machinery
                accessible to contractors and builders across India.
              </p>

              <p>
                We identified a major challenge in the construction industry:
                finding trusted rental vendors, transparent pricing, and timely
                delivery. RentEquip bridges this gap by connecting customers with
                verified providers.
              </p>

              <p>
                Today, we support projects of all sizes by offering cranes,
                excavators, loaders, dumpers, and more with flexible rental terms.
              </p>

              <p>
                Our platform empowers both customers and vendors, ensuring
                efficiency, safety, and on-time project completion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FACTS SECTION ===== */}
      <section className="bg-slate-700 dark:bg-slate-950 py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold tracking-wide text-white">
              FACTS ABOUT <span className="text-amber-400">RENTEQUIP</span>
            </h2>
            <div className="w-28 h-1 bg-amber-400 mx-auto mt-3 mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "300+", label: "Completed Projects" },
              { value: "80+", label: "Machineries" },
              { value: "20+", label: "Running Projects" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-xl py-12 hover:-translate-y-1 hover:shadow-xl dark:shadow-slate-900/50 transition-all"
              >
                <h3 className="text-4xl font-bold text-amber-400">
                  {item.value}
                </h3>
                <p className="text-slate-300 dark:text-slate-400 mt-2 tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
