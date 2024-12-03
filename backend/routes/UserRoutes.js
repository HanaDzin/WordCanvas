import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
} from "../controllers/UserController.js";
import userAuth from "../middleware/auth.js";

//create the router
const userRouter = express.Router();

//create endpoints connected to controller function
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//userId for checking the balance is retrieved from the middleware
userRouter.get("/credits", userAuth, userCredits);

export default userRouter;
