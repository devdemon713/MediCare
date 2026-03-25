import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password
    });

    const backendRole = res.data.role;

    // 🔴 ROLE MISMATCH CHECK
    if (backendRole !== role) {
      setError(
        `Login failed. You are registered as ${backendRole}, not ${role}.`
      );
      return;
    }

    // ✅ Correct role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", backendRole);

    navigate(`/${backendRole}`);
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
  <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl animate-fadeIn">
    <h2 className="text-2xl font-bold text-center mb-6">
      Hospital Management System
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select
        className="w-full border rounded-lg p-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>

    {error && (
      <p className="text-red-500 text-center mt-4">{error}</p>
    )}
  </div>
</div>

  );
}

export default Login;
