import bannerModel from "../models/bannerModel.js";
import fs from "fs";
import path from "path";

//add banner
const addBanner = async (req, res) => {
  //let image_filenames = req.files.map(file=>file.filename);  //array of filenames
  const image_filename = req.file.filename; //Get the single filename

  const banner = new bannerModel({
    image: image_filename, //save array of files names
  });

  //Now moving to the save process
  try {
    await banner.save();
    res.json({ success: true, message: "Banner saved successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

//getBanners
const getBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find({});
    res.json({ success: true, banners });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error retrieving banners" });
  }
};

//Delete Banners
const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    //Find the banner to be deleted
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    //Delete the banner file from the server
    const filePath = path.join("banners", banner.image);
    fs.unlinkSync(filePath);

    //Remove the banner from the databse
    await bannerModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting banner" });
  }
};

//Slider-Banner
const sliderBanner = async (req, res) => {
  const image_filename = req.file.filename;
  const main = req.body.main;
  const category = req.body.category;

  // Create a new slider object
  const slider = new bannerModel({
    image: image_filename,
    main: main,
    category: category,
  });


  try {
    // Ensure the file and fields are present
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    console.log("File received:", image_filename);
    console.log("Type received:", main);
    console.log("Category received:", category);

    // Check if type and category are properly sent
    if (!main || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Type and category are required" });
    }

    
    // Save the slider object
    await slider.save();
    res.status(201).json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("Error saving banner:", err);
    res.status(500).json({ success: false, message: "Error saving banner" });
  }
};

export { addBanner, getBanners, deleteBanner, sliderBanner };
