import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import { json } from "stream/consumers";
import { response } from "express";

// ✅ Add a new blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = json.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // ✅ check if required fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // ✅ Read image buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // ✅ Upload image to ImageKit
    const uploaded = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // ✅ Generate optimized image URL (optional)
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1200" },
      ],
    });

    const image = optimizedImageUrl;

    // ✅ Save blog in MongoDB
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl, // store the optimized URL
    });
    res.json({ success: true, message: "Blog Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get single blog .
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params; // ✅ corrected: req.params, not req.parse
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog Not Found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Delete blog
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Toggle publish status
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
