import userModel from '../models/userModel.js';
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order for frontend

const placeOrder = async (req, res) => {
    const frontend_url = "https://fashion-ecom-back.onrender.com/";

    try {
      //creating new order
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
      //saving order in database
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: [] });
  
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "INR",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));
  
      //push the delivery charges
      line_items.push({
        price_data: {
          currency: "INR",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 2 * 100 * 80,
        },
        quantity: 1,
      });
  
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
      });
      res.json({ success: true, session_url: session.url });
    } catch (err) {
      console.error(err);
      res.json({ success: false, message: "Error" });
    }
  };

//Verify payment status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      res.json({ success: true, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Order details
const orderDetails = async(req, res) =>{
  try{
    const userId = req.body.userId;
    
   //check if userID is provided
   if(!userId){
    return res.status(400).json({success: false, message: "No user found"});
   }

   //Fetch orders associated with the provided userId
   const orderData = await orderModel.find({userId: userId});

   //Check if any orders were found
   if(!orderData || orderData.length === 0) {
    return res.status(404).json({success: false, message: "No orders found"});
   }

   //If orders are found, send them in the response
   res.status(200).json({success: true, orderData});

  }catch(error){
    console.log(error);
    res.status(500).json({success: false, message: "An error occurred while fetching orders"});
  }
};

export {placeOrder, verifyOrder, orderDetails}