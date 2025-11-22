import React from "react";
import assets, { imagesDummyData } from "../assets/assets";

const RightSidebar = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <div className="bg-[#818582]/10 text-white w-full relative overflow-y-auto max-md:hidden">
      {/* header */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt={`${selectedUser.fullName} avatar`}
          className="w-20 aspect-[1/1] rounded-full object-cover"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden />
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto text-center">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* media */}
      <div className="px-5 text-xs">
        <p className="font-medium mb-2">Media</p>

        <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-4 opacity-80">
          {imagesDummyData.map((url, index) => (
            <button
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded overflow-hidden p-0"
              aria-label={`Open media ${index + 1}`}
              type="button"
            >
              <img
                src={url}
                alt={`media-${index + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>

      {/* logout (flows below media) */}
      <div className="px-5 pb-6">
        <button
          className="mt-6 mx-auto block bg-gradient-to-r from-purple-400 to-violet-600 hover:from-purple-500 hover:to-violet-700 transition-all text-white text-sm font-light py-2 px-8 rounded-full cursor-pointer"
          onClick={() => {
            /* handle logout here (e.g. auth signout + navigate) */
          }}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
