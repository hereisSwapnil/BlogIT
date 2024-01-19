import React from "react";
import { Link } from "react-router-dom";

export const HomePosts = ({ post }) => {
  return (
    <div className="w-auto bg-gray-100 mx-auto flex flex-col mt-8 justify-center rounded-lg py-2 md:flex-row">
      {/* <div className="bg-gray-100 flex"> */}
      {/* left */}
      <div className="h-[250px] lg:w-[400px] md:w-[400px] flex justify-center items-center py-4">
        <img
          src={post.photo}
          alt=""
          className="lg:w-full md:w-full w-full rounded-md"
          style={{ objectFit: "cover", width: "90%", height: "100%" }}
        />
      </div>
      {/* right */}
      <div className="flex flex-col lg:w-[65%] w-full px-8 ml-0 py-4">
        <h1 className="text-xl font-bold mb-1"> {post.title}</h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 gap-1 justify-between flex-col lg:flex-row">
          <p className="cursor-pointer">
            <Link to="">@{post.username}</Link>
          </p>
          <div className="flex lg:space-x-6 flex-col lg:flex-row">
            <p>
              {new Date(post.updatedAt)
                .toString()
                .split(" ")
                .slice(0, 4)
                .join(" ")}
            </p>
            <p>
              {new Date(post.updatedAt)
                .toString()
                .split(" ")
                .slice(4, 5)
                .join(" ")}
            </p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.description.slice(0, 700)}...{" "}
          <span className="font-bold">Read more</span>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
};
