import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      const meRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/me.php`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const me = await meRes.json();
      if (me.ok) setUser(me.user);

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-zinc-900/10 p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="mt-4 text-sm">
          No account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

