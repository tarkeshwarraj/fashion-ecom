import express from "express";
import authMiddleware from "../middleware/auth.js";

import { loginUser, registerUser, UpdateAddress, getAddress} from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update",authMiddleware, UpdateAddress);
userRouter.get("/get-address",authMiddleware, getAddress);
export default userRouter;