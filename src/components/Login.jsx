import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../feature/userSlice";
import { api, setAuthToken } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      setErrorMessage("");
      setLoading(true);

      const url = isSignIn ? "/signup" : "/login";

      const payload = isSignIn
        ? { firstname, lastname, email, password }
        : { email, password };

      const response = await api.post(url, payload);

      setAuthToken(response.data.token);

      dispatch(addUser(response.data));

      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          (isSignIn ? "Signup failed" : "Login failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="grid w-full max-w-6xl gap-10 lg:items-center">
      <div className="w-full max-w-md justify-self-center px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 text-white shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              {isSignIn ? "Create Account" : "Welcome back"}
            </h2>
            <p className="text-sm text-slate-400">
              {isSignIn
                ? "Sign up to start your journey."
                : "Sign in to discover developers and grow your network."}
            </p>
          </div>

          {isSignIn && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Firstname
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Lastname
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60"
                  placeholder="Doe"
                />
              </div>
            </>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>

              {!isSignIn && (
                <button
                  type="button"
                  className="text-xs text-emerald-400 transition hover:text-emerald-300 hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              )}
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400/60"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-2xl bg-emerald-500 text-base font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignIn ? "Create Account" : "Login"}
          </button>

          <p className="text-sm text-center text-slate-400">
            {isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-emerald-400 hover:underline ml-1 cursor-pointer"
            >
              {isSignIn ? "Login" : "Create Account"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
