import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { UserContext } from "../context/userContext";

export const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/auth/register",
        { username, email, password }
      );
      console.log(res.data);
      setUser(res.data);
      navigate("/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  console.log(error);

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
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong !</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
