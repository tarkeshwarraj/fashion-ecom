// models/Address.js
import mongoose from "mongoose";


const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
  pincode: {
    type: String,
    
  },
  locality:{
    type: String,
  },
  streetAddress: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  state: {
    type: String,
  
  },
  country: {
    type: String,
    default: "India", // Example default value
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model("Address", AddressSchema);
export default Address;