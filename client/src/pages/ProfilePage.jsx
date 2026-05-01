import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Pic;
    if (selectedImg) {
      base64Pic = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = () => resolve(reader.result);
      });
    }

    await updateProfile({
      fullName: name,
      bio,
      profilePic: base64Pic ?? undefined,
    });
    navigate("/");
  };

  return (
    <div className="min-h-[100dvh] w-full px-4 py-8 box-border bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-full max-w-2xl min-w-0 overflow-hidden backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-stretch justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 flex-1 min-w-0 w-full"
        >
          <h3 className="text-lg">Profile details</h3>

          <label
            htmlFor="avatar"
            className="flex flex-wrap items-center gap-3 cursor-pointer min-w-0"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
            />
            upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your Name"
            className="w-full min-w-0 box-border p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="w-full min-w-0 box-border p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y max-h-48"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        <img
          className="w-36 sm:w-44 shrink-0 aspect-square rounded-full mx-6 sm:mx-10 max-sm:mt-6"
          src={
            selectedImg
              ? URL.createObjectURL(selectedImg)
              : authUser?.profilePic || assets.logo_icon
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;