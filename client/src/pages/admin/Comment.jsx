// import { comments_data } from "../../assets/assets";
// import { useState, useEffect } from "react";
// import CommentTableItem from "../../components/admin/CommentTableItem";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Comment = () => {
//   const [comments, setComments] = useState([]);
//   const [filter, setFilter] = useState("Not approved");

//   const { axios } = useAppContext();

//   const fetchComments = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/comments");
//       data.success ? setComments(data.comments) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   return (
//     <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
//       <div className="flex justify-between items-center max-w-3xl">
//         <h1>Comments</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => setFilter("Approved")}
//             className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
//               filter === "Approved" ? "text-primary" : "text-gray-800"
//             }`}
//           >
//             Approved
//           </button>

//           <button
//             onClick={() => setFilter("Not Approved")}
//             className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
//               filter === "Not Approved" ? "text-primary" : "text-gray-800"
//             }`}
//           >
//             Not Approved
//           </button>
//         </div>
//       </div>

//       <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
//         <table className="w-full text-sm text-gray-500">
//           <thead className="text-xs text-gray-600 text-left uppercase">
//             <tr>
//               <th scope="col" className="px-6 py-4">
//                 Blog Title & Comment
//               </th>
//               <th scope="col" className="px-6 py-4 max-sm:hidden">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {comments
//               .filter((comment) => {
//                 if (filter === "Approved") return comment.isApproved === true;
//                 return comment.isApproved === false;
//               })
//               .map((comment, index) => (
//                 <CommentTableItem
//                   key={comment._id}
//                   comment={comment}
//                   index={index + 1}
//                   fetchComments={fetchComments}
//                 />
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Comment;

import { useState, useEffect } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);

      // if (data.success) {
      //   setComments(data.comments);
      // } else {
      //   toast.error(data.message || "Failed to load comments");
      // }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-2xl font-semibold">Comments</h1>
        <div className="flex gap-5">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === "Approved"
                ? "bg-primary text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === "Not Approved"
                ? "bg-primary text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-8 bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Blog Title & Comment</th>
              <th className="px-6 py-4 max-sm:hidden text-left">Date</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No {filter === "Approved" ? "approved" : "pending"} comments
                </td>
              </tr>
            ) : (
              comments
                .filter((comment) => {
                  if (filter === "Approved") return comment.isApproved === true;
                  return (
                    comment.isApproved === false ||
                    comment.isApproved === undefined
                  );
                })
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
