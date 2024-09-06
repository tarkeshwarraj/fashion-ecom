import { createContext, useEffect, useState } from "react"; // Context API
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const currency = "$";
  const url = "https://fashion-ecom-back.onrender.com/";
  const [token, setToken] = useState("");
  const [fetchItems, setFetchItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  //FetchItems

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}api/product/all`);
        if (response.data.success) {
          const allProducts = response.data.products;
          setFetchItems(allProducts);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };
    fetchData();
  }, [url]); // Dependency array includes `url` to re-fetch if it changes

  //CART Items setup

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems); //clone cartItems

    if (cartData[itemId]) {
      //user sa bheja huwa item phele sa hai tho...
      if (cartData[itemId][size]) {
        //wo bheja huwa item ka size same ho tho
        cartData[itemId][size] += 1;
      } else {
        //item ka size same na ho tho...
        cartData[itemId][size] = 1;
      }
    } else {
      //user sa bheja huwa item phe sa na ho tho
      cartData[itemId] = {}; //item id mein koi changes nhi hoga
      cartData[itemId][size] = 1; //item 1 hojyga
    }

    setCartItems(cartData);
    // console.log(cartData);

    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('token found');
    } else {
      console.log("token not found");
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "api/cart/get", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(response.data.cartData);
  };

  const totalSum = Object.values(cartItems).reduce((outerSum, innerObject) => {
    const innerSum = Object.values(innerObject).reduce(
      (acc, value) => acc + value,
      0
    );
    return outerSum + innerSum;
  }, 0);

  // Define the context value
  const contextValue = {
    url,
    totalSum,
    token,
    setToken, // Also export setToken to allow updates to the token
    cartItems,
    addToCart,
    fetchItems,
    currency,
    loadCartData,
    search,
    showSearch,
    setSearch,
    setShowSearch,
  };

  //%% IMPORTANT FOR LOGIN
  //When you login the token will store in Your browser and also save in token state But when you refresh the page the token will be vanish from token state.so we save token again into it from localStorage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Correct exports
export { StoreContext, StoreContextProvider };
