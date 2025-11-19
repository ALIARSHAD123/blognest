import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  // Delete Blog
  const deleteBlog = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle Published
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/publish-toggle", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="p-4">{index + 1}</th>

      <td className="p-4">{title}</td>

      <td className="p-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      <td className="p-4 max-sm:hidden">
        <span
          className={
            blog.isPublished
              ? "text-green-600 font-medium"
              : "text-orange-700 font-medium"
          }
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={togglePublish}
            className="border px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          <img
            src={assets.cross_icon}
            className="w-6 hover:scale-110 transition-all cursor-pointer"
            alt="delete"
            onClick={deleteBlog}
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
