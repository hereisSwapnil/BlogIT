import React, { useContext, useEffect, useState } from "react";
import { HomePosts } from "../components/HomePosts";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { UserContext } from "../context/userContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { user } = useContext(UserContext);
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(true);
  const [loader, setLoader] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/posts" + search
      );
      if (res.data.length > 0) {
        setNoResults(false);
      } else {
        setNoResults(true);
      }
      setPosts(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {search && (
          <p className="font-bold text-md mt-6">
            Here are your search results...
          </p>
        )}
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link to={user ? `posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} key={post._id} />
            </Link>
          ))
        ) : (
          <h1 className="text-2xl text-center mt-[30vh]">No Results Found !</h1>
        )}
      </div>
      <Footer />
    </>
  );
};
