import express from "express";
import { registerUser, loginUser,logoutUser,getMe,updateUserProfile } from "../controllers/auth.controller.js";
import {protect}  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout',logoutUser)
router.get('/me',protect,getMe)
router.put("/update-profile", protect, updateUserProfile);

export default router;
