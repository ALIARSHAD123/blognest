import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// Login route
adminRouter.post("/login", adminLogin);

// Protected admin routes
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);

// Use POST for approving and deleting comments
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.post("/delete-comment", auth, deleteCommentById);

export default adminRouter;
