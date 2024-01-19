import React, { useContext, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/userContext";
import axios from "axios";

export const Comment = ({ comment, edited, setEdited }) => {
  const { user } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.comment);
  const [delete_, setDelete_] = useState(false);

  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/comments/${comment._id}`,
        { withCredentials: true }
      );
      setDelete_(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async () => {
    try {
      const comment_ = {
        comment: editComment,
        postId: comment.postId,
        author: comment.author,
        userId: comment.userId,
      };
      await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/comments/${comment._id}`,
        comment_,
        { withCredentials: true }
      );
      setIsEdit(false);
      setEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!delete_ ? (
        <div className="px-2 py-2 bg-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">@{comment.author}</h3>
            <div className="flex justify-center items-center space-x-4">
              <p className="text-gray-500 text-sm">
                {new Date(comment.updatedAt)
                  .toString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(comment.updatedAt)
                  .toString()
                  .split(" ")
                  .slice(4, 5)
                  .join(" ")}
              </p>
              <div className="flex items-center space-x-2 justify-center">
                {user && user?.id === comment.userId ? (
                  <>
                    <p>
                      {isEdit ? (
                        <TiTick onClick={handleEditComment} />
                      ) : (
                        <BiEdit onClick={() => setIsEdit(!isEdit)} />
                      )}
                    </p>
                    <p>
                      <MdDelete onClick={handleDeleteComment} />
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {isEdit ? (
            <input
              className="px-4 mt-2"
              type="text"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          ) : (
            <p className="px-4 mt-2">{comment.comment}</p>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
