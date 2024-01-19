import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 lg:px-[400px] py-8 flex justify-between text-sm gap-10 md:text-md">
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-4 text-center text-white bg-black">
        All rights reserved @BlogIT 2023
      </p>
    </>
  );
};
