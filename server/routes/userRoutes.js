import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  changePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes for logged-in users
router.get("/get-user", authMiddleware, getProfile); // Get own profile
router.put("/update-user", authMiddleware, updateProfile); // Update own profile
router.delete("/delete-account", authMiddleware, deleteAccount); // Delete own account
router.put("/update-password", authMiddleware, changePassword);

export default router;
