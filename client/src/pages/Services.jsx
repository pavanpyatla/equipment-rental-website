import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookNow = () => {
    navigate("/equipment");
  };

  const services = [
    {
      title: "Excavator Rental",
      desc: "Heavy-duty excavators for all construction needs",
      icon: "🚜",
    },
    {
      title: "Crane Rental",
      desc: "Mobile, tower & hydraulic cranes",
      icon: "🏗️",
    },
    {
      title: "Loader Rental",
      desc: "Efficient material handling equipment",
      icon: "🚧",
    },
    {
      title: "Bulldozer Rental",
      desc: "Powerful machines for earthmoving",
      icon: "🛠️",
    },
    {
      title: "Backhoe Loader",
      desc: "Multi-purpose construction equipment",
      icon: "⚙️",
    },
    {
      title: "Dumper Rental",
      desc: "Reliable dumpers for site transport",
      icon: "🚚",
    },
    {
      title: "Road Roller",
      desc: "Compaction equipment for road works",
      icon: "🛣️",
    },
    {
      title: "Equipment with Operator",
      desc: "Certified and experienced operators",
      icon: "👷",
    },
  ];

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

      {/* ===== SERVICES BANNER ===== */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-900 dark:to-blue-800 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-blue-100 dark:text-blue-200 max-w-2xl mx-auto"
          >
            Discover our complete range of construction equipment rental services across India
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setSearchQuery(searchQuery)}
                className="flex-1 px-5 py-3 rounded-lg shadow-sm text-slate-900 dark:text-white dark:bg-slate-700 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
              <button
                onClick={() => setSearchQuery(searchQuery)}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition shadow-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== EQUIPMENT SERVICES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          >
            Construction Equipment Services
          </motion.h2>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-slate-400 text-lg">
                No services found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredServices.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-8 text-center hover:shadow-lg dark:shadow-slate-900/50 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-2">
                    {item.desc}
                  </p>

                  <button
                    onClick={handleBookNow}
                    className="mt-6 px-6 py-2 bg-blue-700 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors shadow-sm hover:shadow-md"
                  >
                    Book now
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}
