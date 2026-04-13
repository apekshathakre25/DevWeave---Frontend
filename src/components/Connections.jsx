import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../feature/connectionSlice";
import { useEffect } from "react";
import axios from "axios";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/accepted/connections`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!connection) {
      fetchConnections();
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-500">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {connection.map((conn) => {
          const user = conn.fromUserId;

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
