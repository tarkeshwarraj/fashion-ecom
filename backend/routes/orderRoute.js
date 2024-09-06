import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder,verifyOrder,orderDetails} from "../controllers/orderController.js";


const orderRouter = express.Router();


orderRouter.post("/place", authMiddleware,placeOrder);
orderRouter.post("/verify", authMiddleware,verifyOrder);
orderRouter.get("/details",authMiddleware,orderDetails);


export default orderRouter;