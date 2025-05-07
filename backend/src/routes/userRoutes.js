import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile); // 🔐 Protected route

export default router;