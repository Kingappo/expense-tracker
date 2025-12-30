import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  isAuthenticated,
  login,
  logOut,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/send-verify-otp", authMiddleware, sendVerifyOtp);
router.post("/verify-email", authMiddleware, verifyEmail);
router.get("/is-auth", authMiddleware, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   isAuthenticated,
//   login,
//   logOut,
//   register,
//   resetPassword,
//   sendResetOtp,
//   sendVerifyOtp,
//   verifyEmail,
//   checkAdmin, // Add this import
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logOut);
// router.post("/send-verify-otp", authMiddleware, sendVerifyOtp);
// router.post("/verify-email", authMiddleware, verifyEmail);
// router.get("/is-auth", authMiddleware, isAuthenticated);
// router.get("/check-admin", authMiddleware, checkAdmin); // Add this route
// router.post("/send-reset-otp", sendResetOtp);
// router.post("/reset-password", resetPassword);

// export default router;
