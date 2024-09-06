import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:[
        {
            itemId:{
                type:String, //or ObjectId, if referencing another model
                required: true,
            },
            size:{
                type:String,
                require:true,
            },
            quantity:{
                type:Number,
                required: true,
                default:1,
            }
        }
    ],
    },{minimize:false}) //this minimize is for cartData


    //if the model is already the user user model or create new one
const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;