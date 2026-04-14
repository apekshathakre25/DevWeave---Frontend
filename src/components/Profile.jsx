import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import EditProfile from "./EditProfile";
import { useState } from "react";

const ProfileEditor = ({ profile }) => {
  const [formData, setFormData] = useState(profile);

  return (
    <section className="min-h-screen px-6 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex rounded-full border border-blue-400/20 px-4 py-1 text-sm font-medium text-blue-300">
          Your profile
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          This is how others see you
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Make a great first impression on the stack.
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-10 flex flex-col lg:flex-row items-start justify-center gap-10">
        {/* Edit Form */}
        <div className="w-full max-w-lg">
          <EditProfile formData={formData} setFormData={setFormData} />
        </div>

        {/* Preview Card */}
        <div className="w-full max-w-sm">
          <UserCard formData={formData} />
        </div>
      </div>
    </section>
  );
};

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user?.user) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-20">
        <span className="loading loading-spinner loading-lg text-emerald-400"></span>
        <p className="text-lg font-medium text-white">
          Loading your profile...
        </p>
      </section>
    );
  }

  return <ProfileEditor key={user.user._id} profile={user.user} />;
};

export default Profile;
