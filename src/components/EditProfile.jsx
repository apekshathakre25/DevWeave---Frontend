import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../feature/userSlice";

const EditProfile = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const skillsArray = formData.skills.split(",");

      const updatedData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        age: formData.age,
        about: formData.about,
        profilePicture: formData.profilePicture,
        gender: formData.gender,
        skills: skillsArray,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(addUser(response.data));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!formData) return null;

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
            value={formData.firstname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            className="input input-bordered w-full"
            value={formData.lastname}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            className="input input-bordered w-full"
            value={formData.age}
            onChange={handleChange}
          />

          <input
            type="text"
            name="profilePicture"
            className="input input-bordered w-full"
            value={formData.profilePicture}
            onChange={handleChange}
          />

          <textarea
            name="about"
            className="textarea textarea-bordered w-full"
            value={formData.about}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            className="input input-bordered w-full"
            value={formData.skills}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="select select-bordered w-full"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
