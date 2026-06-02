import express from "express";
import { register, login, forgotPassword, resetPassword, getUserProfile, updateUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
