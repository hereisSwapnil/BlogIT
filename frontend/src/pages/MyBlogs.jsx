import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { Loader } from "../components/Loader";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { HomePosts } from "../components/HomePosts";

export const MyBlogs = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  const postId = useParams().id;

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/posts/user/" + postId,
        { withCredentials: true }
      );
      setPosts(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [postId]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <h1 className="text-xl font-bold mt-2">Your posts:</h1>
        <div className="flex flex-col justify-center items-center">
          {posts &&
            posts.map((post) => <HomePosts post={post} key={post._id} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};
