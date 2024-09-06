import userModel from "../models/userModel.js";

//add items to user cart

const addToCart = async (req, res) => {
    try {

        const { itemId, size } = req.body;
      const userId = req.body.userId; // Extract userId from req.user

  
      if (!itemId || !size ) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Find the user by ID
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the item already exists in the cart
      const existingItemIndex = user.cartData.findIndex(
        item => item.itemId === itemId && item.size === size
      );
  
      if (existingItemIndex > -1) {
        // If item exists, update the quantity
        user.cartData[existingItemIndex].quantity += 1;
      } else {
        // If item does not exist, add it to the cart
        user.cartData.push({ itemId, size, quantity: 1 });
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Item added to cart successfully', cartData: user.cartData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.body.userId; // Extract userId from req.user or similar method
  
        if (!itemId || !size) {
            return res.status(400).json({ message: 'Item ID and size are required' });
        }
  
        const user = await userModel.findById(userId);
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        const itemIndex = user.cartData.findIndex(
          (item) => item.itemId === itemId && item.size === size
        );
      
        if (itemIndex > -1) {
            // Remove the item completely
            user.cartData.splice(itemIndex, 1);
  
            //save the updated user document
            await user.save();
  
            res.status(200).json({success:true, message: 'Item removed from cart successfully' });
        } else {
            return res.status(404).json({ message: 'Item or size not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



//fetchUser cart data

//res.json(req.headers); //{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDVlYzM4ZTA3OTRhZjVkYmU5ZmMxMyIsImlhdCI6MTcyNTM3NTQwNn0.6qpCfzWa-0ygsWIP9MyoTX9pFUi9A4M1UgGISDTYeXA","user-agent":"PostmanRuntime/7.41.2","accept":"*/*","postman-token":"648b4ed0-9de6-4531-9314-d375336f9a34","host":"localhost:5000","accept-encoding":"gzip, deflate, br","connection":"keep-alive"}

//res.json(req.body); //{"userId":"66d5ec38e0794af5dbe9fc13"}

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId; // Extract userId from req.user or similar method
  
        const user = await userModel.findById(userId);
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        const cartData = user.cartData || [];
  
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCart = async(req, res) => {
    try{
      const userId = req.body.userId;
      
      const{ itemId, size, quantity } = req.body;

      if(!itemId || !size || quantity === undefined){
        return res.status(400).json({message: 'Item ID, size, and quantity are required'});
      }

      const user = await userModel.findById(userId);

      if(!user){
        return res.status(404).json({message: 'User not found'});
      }

      //ya itemId and size match karega jiska match huwa us item ka index la kar aayga
      const itemIndex = user.cartData.findIndex( //user main jo cart data hai uska index find karna hai
        (item) => item.itemId === itemId && item.size === size
      );

      if(itemIndex > -1){
        //agar item hai tho aab ham update karenge

        user.cartData[itemIndex].quantity = quantity;

        //Save the updated user document
        await user.save();

        res.status(200).json({success:true, message: 'Item quantity update successfully'});
      }else{
        return res.status(404).json({message: 'Item or size not found in cart'});

      }
    }catch(error){
      console.log(error);
      res.json({success:false, message:"There is no item in the cart"})
    }
}


export {addToCart, removeFromCart, getCart, updateCart}