import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

// Login a user
router.post('/login', loginUser)

// Register/Signup a new user
router.post('/', registerUser)

// Logout User
router.post('/logout', logoutUser)

export default router;