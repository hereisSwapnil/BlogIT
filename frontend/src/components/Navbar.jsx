import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { UserContext } from "../context/userContext";
import axios from "axios";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const path = useLocation().pathname;

  const handleLogout = async () => {
    try {
      await axios.get(import.meta.env.VITE_BASE_URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (!prompt == "") {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl font-extrabold">
        <Link to="/">BlogIT.</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 bg-gray-100 px-3 py-1 rounded-xl">
          <p className="cursor-pointer" onClick={handleSearch}>
            <BsSearch />
          </p>
          <input
            type="text"
            className="outline-none px-3 py-1 bg-gray-100"
            placeholder="Search a post"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      )}
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link to="/create">Create Post</Link>
            </h3>
            <h3>
              <Link to={"/myblogs/" + user?.id}>My Blogs</Link>
            </h3>
          </>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}

        {user ? (
          <h3>
            <Link to="">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
        {user ? (
          <h3 className="cursor-pointer" onClick={handleLogout}>
            Logout
          </h3>
        ) : null}
      </div>
    </div>
  );
};
