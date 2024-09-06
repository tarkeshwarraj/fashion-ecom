import productModel from "../models/productScheme.js";
import fs from "fs";

//add product item

const addProduct = async (req, res) => {
    let image_filenames = req.files.map(file => file.filename); //Array of filenames

    const product = new productModel ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        images: image_filenames, //Save array of filenames in the database
        sizes:req.body.sizes
    });
    try{
        await product.save();
        res.json({success: true, message: "food saved successfully"});

    }catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const getProduct = async(req, res) => {
    try{
        const products = await productModel.find({});
        res.json({success: true, products});
    }catch(error){
        console.error(error);
        res.json({success: false, message: "Error Retrieving banners"});

    }
}

export {addProduct, getProduct};