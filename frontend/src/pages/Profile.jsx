import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
// import { ProfilePost } from "../components/ProfilePost";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="px-8 mt-8 flex md:flex-row sm:flex-row">
        <div className="flex flex-col w-full md:w-[70%]">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {/* <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost /> */}
        </div>
        <div className="md:w-[30%] w-full md:items-start">
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              className="outline-none px-4 py-2 text-gray-500"
              type="text"
              placeholder="Your username"
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              type="email"
              placeholder="Your email"
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              type="password"
              placeholder="Your password"
            />
            <div className="flex items-center space-x-4 mt-8 ">
              <button className="text-white font-semibold px-4 py-2 bg-black hover:bg-gray-400 hover:text-white">
                Update
              </button>
              <button className="text-white font-semibold px-4 py-2 bg-black hover:bg-gray-400 hover:text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
