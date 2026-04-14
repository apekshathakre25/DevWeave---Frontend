import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../feature/connectionSlice";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearAuthToken, getAuthConfig } from "../utils/api";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connection = useSelector((store) => store.connection);
  const loggedInUser = useSelector((store) => store.user?.user);

  const fetchConnections = useCallback(async () => {
    try {
      const authConfig = getAuthConfig();

      if (!authConfig) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await api.get("/accepted/connections", authConfig);

      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        clearAuthToken();
        navigate("/login", { replace: true });
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const getConnectedUser = (conn) => {
    if (!loggedInUser?._id) {
      return conn.fromUserId;
    }

    return conn.fromUserId?._id === loggedInUser._id
      ? conn.toUserId
      : conn.fromUserId;
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-500">
        Your Connections
      </h1>

      {connection.length === 0 ? (
        <p className="text-center text-slate-400">
          Accepted connections will appear here.
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {connection.map((conn) => {
          const user = getConnectedUser(conn);

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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
