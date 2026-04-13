import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgotPass`,
        {
          email,
          password,
        },
      );

      setMessage(res.data.message);
      navigate("/login");
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
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Reset Password</h2>
            <p className="text-sm text-slate-400">
              Enter your email and new password
            </p>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}
          {message && <p className="text-green-400 text-sm">{message}</p>}

          <button
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-emerald-500 text-black font-semibold"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
