import express from "express";
import { loginUser, logoutUser, me, registerUser } from "./controller.js";
import { authenticate } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authenticate, me);

export default router;
