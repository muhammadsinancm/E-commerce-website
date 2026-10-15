import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopeContext = createContext();
export { ShopeContext };

const ShopeContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [products, setProducts] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  const currency = "$";
  const deleveryFee = 10;
  const [serch, setSerch] = useState("");
  const [showSerch, setShowSerch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  const productListAll = async() => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      setProducts(response.data.products)
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=> {
   productListAll()
  }, [])

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Sellect product size");
    }
    console.log(itemId);
    console.log(size);

    if (cartData[itemId]) {
      console.log(cartData[itemId] + "one");
      console.log("one");

      if (cartData[itemId][size]) {
        console.log(cartData[itemId][size] + "two");
        cartData[itemId][size] += 1;

        console.log(cartData[size]);
        console.log(cartData[itemId]);
        console.log("two");
      } else {
        cartData[itemId][size] = 1;
        console.log("ok");
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;

      console.log(cartData[itemId][size] + "three");
    }
    setCartItems(cartData);
  };

  const getCartCout = () => {
    let totalCout = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCout += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCout;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmout = () => {
    let totalAmout = 0;

    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmout += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalAmout;
  };

  const value = {
    products,
    currency,
    deleveryFee,
    serch,
    setSerch,
    showSerch,
    setShowSerch,
    cartItems,
    addToCart,
    getCartCout,
    updateQuantity,
    getCartAmout,
    navigate,
    backendUrl,
    token,
    setToken,
    cartItems,
    setCartItems
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <ShopeContext.Provider value={value}>
      {props.children}
    </ShopeContext.Provider>
  );
};

export default ShopeContextProvider;
