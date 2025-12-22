import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) return "Name is required";

    if (name.length < 3)
      return "Name must be at least 3 characters long";

    if (!/^[A-Za-z ]+$/.test(name))
      return "Name can contain only letters";

    if (!email.trim()) return "Email is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address";

    if (!password) return "Password is required";

    if (password.length < 5)
      return "Password must be at least 5 characters";

    return "";
  };

  const handleSignup = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      navigate("/login");
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
            <input
              placeholder="Ex: John Doe"
              className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
            <input
              placeholder="Ex: john@example.com"
              className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all transform active:scale-95"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
