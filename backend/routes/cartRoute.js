import express from "express";
import { addToCart, removeFromCart,getCart, updateCart} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)  //buy the help of middleware we are decoding useId and sending it
cartRouter.get("/get",authMiddleware, getCart)
cartRouter.delete("/remove", authMiddleware, removeFromCart)
cartRouter.put("/update", authMiddleware, updateCart)

export default cartRouter;