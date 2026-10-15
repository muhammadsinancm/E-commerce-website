import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Prodect from "./pages/Prodect";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navebar from "./components/Navebar";
import Footer from "./components/Footer";
import SerchBar from "./components/SerchBar";
import { ToastContainer } from 'react-toastify';
import Verify from "./pages/Verify";
import { ShopeContext } from "./context/ShopeContext";

function App() {
  const {token} = useContext(ShopeContext)

  useEffect(()=> {
 localStorage.setItem('token', token)
  }, [token])
  
  return (
    <div className="px-4 sm:px-[Svw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navebar />
      <SerchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productID" element={<Prodect />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-rder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verifyStripe" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
