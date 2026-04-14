import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../feature/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { api, clearAuthToken, getAuthConfig } from "../utils/api";

const STACK_SIZE = 5;

const getStackStyle = (depth) => {
  if (depth === 0) return { transform: "none", zIndex: 10, opacity: 1 };

  const direction = depth % 2 === 1 ? -1 : 1;
  const xShift = direction * (8 + depth * 6);
  const rotation = direction * (1.5 + depth * 1.2);
  const yShift = depth * 6;
  const scale = 1 - depth * 0.03;
  const opacity = 1 - depth * 0.14;

  return {
    transform: `translateX(${xShift}px) translateY(${yShift}px) rotate(${rotation}deg) scale(${scale})`,
    zIndex: 10 - depth,
    opacity: Math.max(opacity, 0.15),
  };
};

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchingFeed, setIsFetchingFeed] = useState(false);

  const fetchFeedData = useCallback(async () => {
    try {
      const authConfig = getAuthConfig();

      if (!authConfig) {
        navigate("/login", { replace: true });
        return;
      }

      setIsFetchingFeed(true);

      const response = await api.get("/feed", {
        params: {
          limit: 10,
        },
        ...authConfig,
      });

      setErrorMessage("");
      setActiveIndex(0);
      dispatch(getFeed(response.data.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setErrorMessage("Could not load developers. Please try again.");
    } finally {
      setIsFetchingFeed(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!feed) {
      fetchFeedData();
    }
  }, [feed, fetchFeedData]);

  if (errorMessage) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-medium text-white">{errorMessage}</p>
      </section>
    );
  }

  if (!feed) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-20">
        <span className="loading loading-spinner loading-lg text-emerald-400"></span>
        <p className="text-lg font-medium text-white">Finding developers...</p>
      </section>
    );
  }

  const remainingUsers = feed.slice(activeIndex);

  const showNextCard = () => {
    setActiveIndex((prev) => (prev < feed.length ? prev + 1 : prev));
  };

  const handleSendRequest = async (status, toUserId) => {
    try {
      const authConfig = getAuthConfig();

      if (!authConfig) {
        navigate("/login", { replace: true });
        return;
      }

      await api.post(`/request/send/${status}/${toUserId}`, {}, authConfig);

      setErrorMessage("");
      if (activeIndex >= feed.length - 1) {
        await fetchFeedData();
      } else {
        showNextCard();
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setErrorMessage("Could not update this request. Please try again.");
    }
  };

  if (isFetchingFeed) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-20">
        <span className="loading loading-spinner loading-lg text-emerald-400"></span>
        <p className="text-lg font-medium text-white">Finding developers...</p>
      </section>
    );
  }

  if (remainingUsers.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 py-20">
        <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          All done
        </span>
        <h1 className="text-3xl font-bold text-white">
          You&apos;ve seen everyone
        </h1>
        <p className="max-w-sm text-center text-slate-400">
          No more profiles in the stack.
        </p>
      </section>
    );
  }

  const visibleUsers = remainingUsers.slice(0, STACK_SIZE + 1);

  return (
    <section className="flex w-full flex-col items-center gap-10 py-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Discover Developers
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          {remainingUsers.length} profile
          {remainingUsers.length !== 1 ? "s" : ""} remaining
        </p>
      </div>

      <div className="relative flex h-[620px] w-[400px] items-center justify-center">
        {visibleUsers
          .map((user, i) => ({ user, depth: i }))
          .reverse()
          .map(({ user, depth }) => {
            const style = getStackStyle(depth);

            if (depth === 0) {
              return (
                <div
                  key={user._id}
                  className="absolute transition-all duration-300 ease-out"
                  style={style}
                >
                  <UserCard
                    formData={user}
                    onInterested={() =>
                      handleSendRequest("interested", user._id)
                    }
                    onIgnore={() => handleSendRequest("ignored", user._id)}
                  />
                </div>
              );
            }

            return (
              <div
                key={user._id}
                className="absolute h-[580px] w-[380px] overflow-hidden rounded-[2rem] border border-white/8 bg-slate-900 shadow-xl shadow-black/30 transition-all duration-300 ease-out"
                style={style}
              >
                <img
                  src={user.profilePicture}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-lg font-bold text-white">
                    {user.firstname} {user.lastname}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Feed;
