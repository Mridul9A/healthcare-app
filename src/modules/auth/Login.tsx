import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);

      setUser(res.user);
      toast.success("Login successful");

      navigate("/dashboard");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to your healthcare dashboard
        </p>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full px-4 py-2 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full px-4 py-2 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition 
          ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          Secure Healthcare Platform
        </p>
      </div>
    </div>
  );
}