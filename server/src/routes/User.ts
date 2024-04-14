import express, { Express, Router } from "express";
import { getMyProfile, login, logout, register } from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//user routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);
export default router;
