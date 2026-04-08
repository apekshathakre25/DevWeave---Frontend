const UserCard = ({ formData, onInterested, onIgnore }) => {
  const fullName =
    `${formData?.firstname ?? ""} ${formData?.lastname ?? ""}`.trim();
  const hasActions = onInterested || onIgnore;

  const skillsArray = Array.isArray(formData?.skills)
    ? formData?.skills
    : formData?.skills
        ?.split(",")
      

  return (
    <div className="relative h-[580px] w-[380px] select-none overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
      <img
        src={formData?.profilePicture}
        alt={fullName || "profile"}
        className="absolute inset-0 w-120 h-80 object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6">
        <div>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold text-white">
              {formData?.firstname} {formData?.lastname}
            </h2>
            {formData?.age ? (
              <span className="mb-0.5 text-xl text-white/80">
                {formData.age}
              </span>
            ) : null}
          </div>

          {formData?.gender ? (
            <p className="mt-1 text-sm capitalize text-white/60">
              {formData.gender}
            </p>
          ) : null}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-white/70">
          {formData?.about || "No bio available"}
        </p>

        {skillsArray?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {skillsArray.slice(0, 5).map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        {hasActions ? (
          <div className="mt-1 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={onIgnore}
              className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-400/40 bg-black/30 backdrop-blur-md transition-all hover:scale-110 hover:border-rose-400 hover:bg-rose-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-rose-400 transition group-hover:text-rose-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onInterested}
              className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400/40 bg-black/30 backdrop-blur-md transition-all hover:scale-110 hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-emerald-400 transition group-hover:text-emerald-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserCard;
