import userModel from "../models/userModel.js";
import Address from "../models/Address.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "No user exist Please Register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id); //this is function calling look down line number 37

    res.json({ success: true, token }); //response true with token will sent to userBrowser to store
  } catch (error) {
    console.error("verify details again", error);
    res.json({ success: false, message: "Error" });
  }
};

//Create token to sent it to userBrowser
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); //Jwt to create token with object ID
};

//register user

const registerUser = async (req, res) => {
  //destructure name,email and password from req body
  const { name, password, email } = req.body;
  try {
    //Checking user
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validating email and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    //check Strong password

    if (password.length < 4) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    //After creating the user, create a default address for the user
    const defaultAddress = new Address({
      userId: user._id, // Use the ID of the newly created user
      name: name, // Use user's name or provide a default
      phone: "", // Set default phone number or leave blank
      pincode: "", // Set default pincode or leave blank
      streetAddress: "", // Set default street address or leave blank
      city: "", // Set default city or leave blank
      state: "", // Set default state or leave blank
      country: "India", // Default country (already set in your schema)
    });

    await defaultAddress.save(); //Save the default address to the database

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//User Address Update
const UpdateAddress = async (req, res) => {
  try {
    const userId = req.body.userId; // Extract userId from req.user or similar method
    const { name, phone, pincode, streetAddress, city, state, country } =
      req.body;

    //Find the address associated with the user and update it
    const updatedAddress = await Address.findOneAndUpdate(
      { userId: userId },
      {
        name: name,
        phone: phone,
        pincode: pincode,
        streetAddress: streetAddress,
        city: city,
        state: state,
        country: country,
      },
      { new: true } //Return the updated document
    );

    //Check if the address was found and updated
    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found for this user." });
    }

    //Send success response with the updated address
    res
      .status(200)
      .json({
        message: "Address Updated successfully.",
        address: updatedAddress,
      });
  } catch (error) {
    //Handle errors and send error response
    res
      .status(500)
      .json({ message: "Error updating address.", error: error.message });
  }
};

//User Address Get

const getAddress = async (req, res) => {
    try{
    
  const userId = req.body.userId; //// Extract userId from req.user or similar method

  const data = await Address.findOne({ userId: userId });

  //Check if the address was found
  if(!data) {
    return res.status(404).json({message: "Address not Found."});
  }

  //Send success response with the address data
  res.status(200).json({success:true, data});
}catch(error){
    res.status(500).json({message: "Error fetching address.", error: error.message});
}
};

export { loginUser, registerUser, UpdateAddress, getAddress };
