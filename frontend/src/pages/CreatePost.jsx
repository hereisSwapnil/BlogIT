import React, { useContext, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const addCategory = () => {
    let updatedCategories = [...categories];
    updatedCategories.push(category);
    setCategory("");
    setCategories(updatedCategories);
  };

  const deleteCategory = (index) => {
    let updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (categories.length == 0) {
      alert("Add atleast one category");
      return;
    }
    const post = {
      title,
      description,
      photo,
      username: user.username,
      userId: user.id,
      categories,
    };

    try {
      console.log(post);
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/posts/create",
        post,
        { withCredentials: true }
      );
      alert("post created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-8">
          <input
            className="px-4 py-2 outline-none bg-gray-100 rounded-lg"
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {/* <input
            className="px-4 py-2 outline-none bg-gray-100 rounded-lg"
            type="file"
            placeholder="Enter post image"
            required
          /> */}
          <input
            className="px-4 py-2 outline-none bg-gray-100 rounded-lg"
            type="text"
            placeholder="Enter post image url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                className="px-4 py-2 outline-none bg-gray-100 rounded-lg"
                type="text"
                placeholder="Enter post category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>
            {categories.length == 0 ? (
              <p className="text-sm text-red-600 mt-2 px-2">
                Add atleast one category
              </p>
            ) : null}

            <div className="flex mt-4">
              {categories.map((cat, index) => (
                <div
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                  key={index}
                >
                  <p>{cat}</p>
                  <p
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    onClick={() => deleteCategory(index)}
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="15"
              className="px-4 py-2 mt-4 bg-gray-100 outline-none rounded-lg"
              placeholder="Enter post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <button
              className="mt-4 w-full bg-black text-white md:w-[20%] mx-auto font-semibold px-4 py-2 md:text-xl text-lg"
              onClick={handleCreatePost}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
