import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Comment } from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Loader } from "../components/Loader";

export const PostDetails = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [loader, setLoader] = useState(true);
  const postId = useParams().id;
  const navigate = useNavigate();
  const [edited, setEdited] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/posts/" + postId
      );
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/posts/${postId}`,
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit/${postId}`);
    s;
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + `/api/comments/post/${postId}`
      );
      console.log(res.data);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const comment_ = {
        comment: comment,
        postId: postId,
        author: user?.username,
        userId: user?.id,
      };
      await axios.post(
        import.meta.env.VITE_BASE_URL + `/api/comments/create`,
        comment_,
        { withCredentials: true }
      );
      setComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    fetchComments();
    setEdited(false);
  }, [postId, edited]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-black md:text-3xl">
                {post.title}
              </h1>
              <div className="flex items-center space-x-2 justify-center">
                {user?.id === post?.userId && (
                  <>
                    <p>
                      <BiEdit
                        className="cursor-pointer"
                        onClick={() => handleEditPost(post?._id)}
                      />
                    </p>
                    <p>
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => handleDeletePost(post?._id)}
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
              <p>@{post.username}</p>
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
            <img src={post.photo} className="w-full mx-auto mt-8" alt="" />
            <p className="mx-auto mt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              impedit dolores in corporis? Molestias veniam quos quidem nobis
              temporibus dolore, dignissimos placeat mollitia obcaecati at, rem
              recusandae debitis consequuntur in nemo repudiandae. Blanditiis,
              ipsa nam!
            </p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post &&
                  post.categories.map((cat, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 rounded-lg px-3 py-1"
                    >
                      {cat}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-6">
              <h3 className="mt-6 mb-4 font-semibold">Comments: </h3>
              {/* Comments */}
              {comments &&
                comments.map((comm, index) => (
                  <Comment
                    comment={comm}
                    key={index}
                    edited={edited}
                    setEdited={setEdited}
                  />
                ))}
              {/*  */}
            </div>
            {/* Write a comment */}
            <div className="flex flex-col mt-4 md:flex-row rounded-lg gap-4">
              <input
                className="md:w-[90%] outline-none px-4 mt-4 md:mt-0 bg-gray-100 rounded-lg"
                placeholder="Write a comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0 rounded-lg hover:bg-gray-600 hover:text-black"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
