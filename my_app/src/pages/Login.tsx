import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../lib/fakeApi";
import { useAuth } from "../stores/auth";

export default function Login() {
  const [email, setEmail] = useState("demo@acme.io");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const login = useAuth((s) => s.login);
  const token = useAuth((s) => s.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { token } = await loginApi(email, password);
      login(token);
      navigate("/");
    } catch (e: any) {
      setErr(e.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>

        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {err && <p className="text-sm text-red-500">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md bg-brand text-white font-medium hover:bg-brand/90 transition disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Tip: use password <b>demo123</b>
        </p>
      </form>
    </div>
  );
}
