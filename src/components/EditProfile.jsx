import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from "../feature/userSlice";
import { api, getAuthConfig } from "../utils/api";

const EditProfile = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setErrorMessage("");

      const authConfig = getAuthConfig();

      if (!authConfig) {
        setErrorMessage("Please login again to update your profile.");
        return;
      }

      const skillsValue = Array.isArray(formData.skills)
        ? formData.skills.join(",")
        : formData.skills || "";

      const skillsArray = skillsValue
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const updatedData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        age: formData.age ? Number(formData.age) : 0,
        about: formData.about,
        profilePicture: formData.profilePicture,
        gender: formData.gender,
        skills: skillsArray,
      };

      const response = await api.patch("/profile", updatedData, authConfig);

      dispatch(addUser(response.data));
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Could not update profile.",
      );
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!formData) return null;

  const skillsValue = Array.isArray(formData.skills)
    ? formData.skills.join(", ")
    : formData.skills || "";

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Edit Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            className="input input-bordered w-full"
            value={formData.firstname || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            className="input input-bordered w-full"
            value={formData.lastname || ""}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            className="input input-bordered w-full"
            value={formData.age ?? ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="profilePicture"
            className="input input-bordered w-full"
            value={formData.profilePicture || ""}
            onChange={handleChange}
          />

          <textarea
            name="about"
            className="textarea textarea-bordered w-full"
            value={formData.about || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            className="input input-bordered w-full"
            value={skillsValue}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="select select-bordered w-full"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {errorMessage ? (
            <p className="text-sm text-red-400">{errorMessage}</p>
          ) : null}
          {message ? <p className="text-sm text-green-500">{message}</p> : null}

          <button type="submit" className="btn btn-primary w-full mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
