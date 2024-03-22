import express from "express";
const router = express.Router();
import { signup, login } from "../Controllers/authController.js";
import { getAllUsers } from "../Controllers/UsersController.js";
router.post("/signup", signup);
router.get("/signup", getAllUsers);
router.post("/login", login);
export default router;
