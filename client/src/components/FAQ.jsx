import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I rent equipment from RentEquip?",
      answer: "Browsing our catalog, select the equipment you need, and click 'Book Now'. Follow the simple steps to confirm your booking.",
    },
    {
      question: "Is there a security deposit required?",
      answer: "Yes, a refundable security deposit is required for most equipment. The amount depends on the equipment value and rental duration.",
    },
    {
      question: "Do you offer operators along with the machines?",
      answer: "Absolutely! You can choose to rent equipment with or without an operator during the booking process.",
    },
    {
      question: "What happens if the equipment breaks down?",
      answer: "Our support team is available 24/7. In case of a breakdown, we provide immediate maintenance or a replacement machine.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-24" id="faqs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-lg">
          Got questions? We have answers.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm dark:shadow-slate-900/50 bg-white dark:bg-slate-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-white">{faq.question}</span>
        <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/50">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
