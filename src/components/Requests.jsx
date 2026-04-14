import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, removeRequest } from "../feature/requestSlice";
import { api, clearAuthToken, getAuthConfig } from "../utils/api";

const Request = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useSelector((store) => store.request);

  const fetchRequest = useCallback(async () => {
    try {
      const authConfig = getAuthConfig();

      if (!authConfig) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await api.get("/pending/connections", authConfig);

      dispatch(getRequest(response.data.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        clearAuthToken();
        navigate("/login", { replace: true });
      }
    }
  }, [dispatch, navigate]);

  const handleRequest = async (status, requestId) => {
    try {
      const authConfig = getAuthConfig();

      if (!authConfig) {
        navigate("/login", { replace: true });
        return;
      }

      await api.post(`/request/review/${status}/${requestId}`, {}, authConfig);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        clearAuthToken();
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-500">
        Your Requests
      </h1>

      {request.length === 0 ? (
        <p className="text-center text-slate-400">
          No pending requests right now.
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {request.map((conn) => {
          const user = conn.fromUserId;

          if (!user) {
            return null;
          }

          return (
            <div
              key={conn._id}
              className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center"
            >
              <img
                src={user.profilePicture}
                alt="profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />

              <h2 className="text-lg font-semibold text-gray-800">
                {user.firstname} {user.lastname}
              </h2>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {user.about || "No bio available"}
              </p>

              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">Age:</span> {user.age || "N/A"}
              </div>

              <button className="mt-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow hover:scale-105 transition">
                View Profile
              </button>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleRequest("accepted", conn._id)}
                  className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-full shadow hover:scale-105 transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleRequest("rejected", conn._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full shadow hover:scale-105 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
