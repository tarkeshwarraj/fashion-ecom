import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    description:{
        type:String,
        require: true,
    },
    category:{
        type:String,
        require: true,
    },
    subcategory:{
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    images: {
        type:[String],
        require:true,
    },
    sizes: {
        type:[String],
        require:true,
    }
})

//product Model Product name sa database mai ik document banega
const productModel = mongoose.model("Product", productSchema);

export default productModel;