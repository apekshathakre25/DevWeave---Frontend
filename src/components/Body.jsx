import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "../feature/userSlice";
import { api, clearAuthToken, getAuthConfig } from "../utils/api";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const publicRoutes = ["/login", "/forgot-password"];
  const isPublicPage = publicRoutes.includes(location.pathname);
  const [isCheckingAuth, setIsCheckingAuth] = useState(
    !isPublicPage && !user,
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authConfig = getAuthConfig();

        if (!authConfig) {
          navigate("/login", { replace: true });
          return;
        }

        setIsCheckingAuth(true);

        const response = await api.get("/profile", authConfig);

        dispatch(addUser(response.data));
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          clearAuthToken();
          navigate("/login", { replace: true });
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    if (isPublicPage || user) {
      setIsCheckingAuth(false);
      return;
    }

    if (!user) {
      fetchUserProfile();
    }
  }, [dispatch, isPublicPage, navigate, user]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        {isCheckingAuth ? (
          <section className="flex flex-col items-center justify-center gap-4 py-20">
            <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            <p className="text-lg font-medium text-white">
              Checking your session...
            </p>
          </section>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
