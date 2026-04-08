import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../feature/userSlice";

const Login = () => {
  const [email, setEmail] = useState("apeksha@gmail.com");
  const [password, setPassword] = useState("Apeksha@123");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
      );
      localStorage.setItem("token", response.data.token);
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="grid w-full max-w-6xl gap-10 lg:items-center">
      

      <div className="w-full max-w-md justify-self-center px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 text-white shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-slate-400">
              Sign in to discover developers and grow your network.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60"
              placeholder="you@example.com"
          />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60"
              placeholder="Enter your password"
          />
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            className="btn h-12 w-full rounded-2xl border-0 bg-emerald-500 text-base font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
