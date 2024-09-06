import express from "express";
import multer from "multer";
import {addBanner, getBanners, deleteBanner,sliderBanner} from "../controllers/addBanner.js";


const bannerRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "banners",

    //This function define how the uploaded file should be named
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer ({storage: storage}); //Accept up to 10 images




bannerRouter.post("/add", upload.single('image'), addBanner); //addBanner is a controller function
bannerRouter.get("/all", getBanners);
bannerRouter.delete('/delete/:id', deleteBanner); //Route for deleting a banner
// ---------------
bannerRouter.post('/slider-add', upload.single('image'), sliderBanner); //Route for addSlider a banner


export default bannerRouter;