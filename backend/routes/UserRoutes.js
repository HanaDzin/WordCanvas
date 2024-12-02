import express from "express";
import { registerUser, loginUser } from "../controllers/UserController.js";

//create the router
const userRouter = express.Router();

//create endpoints connected to controller function
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
