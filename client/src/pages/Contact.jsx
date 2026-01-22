import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

      {/* ===== HEADER / BANNER ===== */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 dark:from-slate-900 dark:to-slate-800 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-blue-100 dark:text-slate-300"
          >
            We’re here to help with your construction equipment needs
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              icon: "📞",
              title: "Phone",
              value: "+91 9XXXXXXXXX",
              sub: "Call us anytime",
            },
            {
              icon: "✉️",
              title: "Email",
              value: "support@rentequip.in",
              sub: "Send us an email",
            },
            {
              icon: "💬",
              title: "WhatsApp",
              value: "Chat Support",
              sub: "Message us anytime",
            },
            {
              icon: "📍",
              title: "Address",
              value: "Ring Road, Hyderabad, India",
              sub: "Visit our office",
            },
            {
              icon: "🌍",
              title: "Coverage",
              value: "100+ Cities",
              sub: "Across India",
            },
            {
              icon: "⏰",
              title: "Support Hours",
              value: "24 / 7 Available",
              sub: "Monday to Sunday",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center shadow-sm hover:shadow-lg dark:shadow-slate-900/50 transition-all duration-300 border border-transparent dark:border-slate-700"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-2">
                {item.value}
              </p>
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-10 shadow-sm dark:shadow-lg dark:border dark:border-slate-800"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border dark:border-slate-700 rounded-lg px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder-slate-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border dark:border-slate-700 rounded-lg px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border dark:border-slate-700 rounded-lg px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder-slate-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border dark:border-slate-700 rounded-lg px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder-slate-400"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border dark:border-slate-700 rounded-lg px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder-slate-400 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
