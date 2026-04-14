import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../feature/userSlice";

const Navbar = () => {
  const data = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = data?.user;

  const logout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 shadow-lg shadow-emerald-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="M16.5 3C14.76 3 13.09 3.81 12 5.09 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
                  fill="#34d399"
                />
                <path
                  d="M8 8.5 10.5 12 16 7"
                  stroke="#020617"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-white">
                DevWeave
              </p>
              <p className="text-xs text-slate-400">
                Meet developers worth building with
              </p>
            </div>
          </Link>
        </div>

        {loggedInUser ? (
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 md:block">
              Welcome back,{" "}
              <span className="font-semibold text-white">
                {loggedInUser.firstname}
              </span>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar rounded-full border border-white/10 bg-white/5 p-1 shadow-lg shadow-black/20 transition hover:border-emerald-400/40"
              >
                <div className="w-11 rounded-full">
                  <img alt="profile" src={loggedInUser.profilePicture} />
                </div>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl border border-white/10 bg-slate-900/95 p-2 text-slate-200 shadow-2xl shadow-black/40"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Pending Requests</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn rounded-full border-0 bg-emerald-500 px-6 text-slate-950 hover:bg-emerald-400"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
