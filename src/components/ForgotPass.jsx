import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setMessage("");

      const res = await api.post("/forgot-password", { email });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid w-full max-w-6xl gap-10 lg:items-center">
      <div className="w-full max-w-md justify-self-center px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 text-white shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold">Forgot Password</h2>
            <p className="text-sm text-slate-400">
              Enter your email and we will send a reset link.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </div>
          )}
          {message && (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          )}

          <button
            disabled={loading}
            className="h-12 w-full rounded-2xl bg-emerald-500 text-base font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Remember your password?{" "}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
