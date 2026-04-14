import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setMessage("");

      const res = await api.post(`/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      setMessage(res.data.message);
      setPassword("");
      setConfirmPassword("");
      setPasswordChanged(true);
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
            <h2 className="text-3xl font-semibold">Reset Password</h2>
            <p className="text-sm text-slate-400">
              Choose a new password for your account.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={passwordChanged}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60 disabled:opacity-60"
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={passwordChanged}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60 disabled:opacity-60"
              placeholder="Confirm your new password"
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

          {passwordChanged ? (
            <Link
              to="/login"
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-500 text-base font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Login
            </Link>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-emerald-500 text-base font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
