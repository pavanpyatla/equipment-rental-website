import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rentalAPI } from "../utils/api";
import { motion } from "framer-motion";

const equipmentOptions = [
  { id: 1, name: "Crawler Crane", icon: "🏗" },
  { id: 2, name: "Hydraulic Excavator", icon: "🚜" },
  { id: 3, name: "Wheel Loader", icon: "🚛" },
  { id: 4, name: "Bulldozer", icon: "🏗️" },
  { id: 5, name: "Dump Truck", icon: "🚚" },

  // 🔹 Additional Equipment
  { id: 6, name: "Backhoe Loader", icon: "🚜" },
  { id: 7, name: "Motor Grader", icon: "🛣️" },
  { id: 8, name: "Concrete Mixer", icon: "🧱" },
  { id: 9, name: "Tower Crane", icon: "🏢" },
  { id: 10, name: "Road Roller", icon: "🛞" },
  { id: 11, name: "Piling Rig", icon: "⚙️" },
  { id: 12, name: "Forklift", icon: "🏭" },
];

export default function Equipment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const category = state?.category || "Construction Equipment";

  const [step, setStep] = useState(1);

  // Form state
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!selectedEquipment) {
        setError("Please select an equipment");
        return;
      }
      if (!location.trim()) {
        setError("Please enter project location");
        return;
      }
    }

    if (step === 2) {
      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }
      if (!duration) {
        setError("Please select rental duration");
        return;
      }
      if (new Date(startDate) >= new Date(endDate)) {
        setError("End date must be after start date");
        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setError("");

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      await rentalAPI.create({
        category,
        equipment: selectedEquipment,
        location,
        startDate,
        endDate,
        duration,
        fullName,
        phone,
        email,
        notes
      });

      // Success - redirect to My Rentals
      navigate("/my-rentals", {
        state: { message: "Rental request submitted successfully!" }
      });
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 401) {
        setError("Please login to submit a rental request");
      } else {
        setError(err.response?.data?.message || "Failed to submit request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-6 pb-20 pt-24"
    >

      {/* ===== HEADER ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-full text-sm font-medium">
          🏗 Trusted Construction Equipment Rentals
        </div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight"
        >
          Rent Construction Equipment <br />
          <span className="text-indigo-600 dark:text-indigo-400">
            For Every Site, Every Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto"
        >
          Book well-maintained construction equipment with flexible rental plans.
        </motion.p>
      </section>

      <div className="text-center mb-10">
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Complete the steps below to request equipment
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      {/* ===== STEPS ===== */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-slate-700 -z-10"></div>
        {["Location & Equipment", "Duration & Date", "Contact Info"].map(
          (label, index) => (
            <div key={index} className="flex-1 text-center bg-white dark:bg-slate-950 inline-block px-2">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold transition-colors duration-300
                ${step === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400"}`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{label}</p>
            </div>
          )
        )}
      </div>

      {/* ===== FORM CARD ===== */}
      <motion.div
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-slate-900/50 p-8"
      >

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
              Select Equipment & Location
            </h2>

            {/* Equipment Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {equipmentOptions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedEquipment(item.name);
                    if (error) setError(""); // Clear error when selecting
                  }}
                  className={`border rounded-xl p-4 text-center cursor-pointer transition select-none
                    ${selectedEquipment === item.name
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500"
                      : "border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800"
                    }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
                </div>
              ))}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Project Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (error) setError(""); // Clear error when typing
                }}
                placeholder="Enter site location"
                className="mt-2 w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-slate-400"
              />
            </div>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
              Choose Rental Duration & Dates
            </h2>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Rental Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (error) setError(""); // Clear error when selecting date
                  }}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Rental End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (error) setError(""); // Clear error when selecting date
                  }}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Duration Options */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                Select Rental Duration
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Daily", "Weekly", "Monthly"].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setDuration(item);
                      if (error) setError(""); // Clear error when selecting duration
                    }}
                    className={`border rounded-xl p-4 text-center cursor-pointer transition
                      ${duration === item
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500"
                        : "border-gray-200 dark:border-slate-700 hover:border-blue-600 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-800"}`}
                  >
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{item}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {item === "Daily" && "Best for short-term work"}
                      {item === "Weekly" && "Ideal for ongoing projects"}
                      {item === "Monthly" && "Cost-effective for long-term use"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}


        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError(""); // Clear error when typing
                  }}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              {/* Phone Number */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError(""); // Clear error when typing
                  }}
                  placeholder="Enter your mobile number"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              {/* Email */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              {/* Notes */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-700 rounded-xl p-5 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or notes"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                ></textarea>
              </div>

            </div>
          </>
        )}


        {/* ===== NAVIGATION BUTTONS ===== */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              disabled={loading}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto transition-colors shadow-md"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ml-auto transition-colors shadow-md"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

