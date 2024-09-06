import mongoose from "mongoose";


const bannerSchema  = new mongoose.Schema({
    image:{
        type:String,
        required :true,
    },
    main:{
        type:String,
    },
    category:{
        type:String,
    }

})

const bannerModel = mongoose.model('banner', bannerSchema);
export default bannerModel;