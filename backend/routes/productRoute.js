import express from "express";
import multer from "multer";
import {addProduct, getProduct} from "../controllers/productController.js"


const productRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    //This function defines how the uploaded file should be named
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage}).array("images", 10); // Accept up to 10 images

productRouter.post("/add", upload, addProduct); //addProduct is a controller
productRouter.get("/all", getProduct); //getProduct is a controller function

export default productRouter;