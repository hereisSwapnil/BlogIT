import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { UserContext } from "../context/userContext";

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-xl font-extrabold">
          <Link to="/">BlogIT.</Link>
        </h1>

        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3>
              <Link to="/create">Create Post</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}

          {user ? (
            <h3>Profile</h3>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong !</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
