// import { transformWithEsbuild } from "vite"
import orderModel from "../Models/orderModel.js"
import userModel from "../Models/userModel.js"
import Stripe from 'stripe'
import Razorpay from 'razorpay'

// global variables
const currency = 'inr'
const deliveryCharges = 10


// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
    
})

// Placing orders using COD Method
const placeOrder = async (req, res)=> {

    try {

        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items, 
            amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        
        const newOrder = new orderModel(orderData)
        await newOrder.save();              

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true, message:'Order Placed'})
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error.message})
        
        
    }

}
// Placing orders using Stripe Method
const placeOrderStripe = async (req, res)=> {

    try {

         const {userId, items, amount, address} = req.body
         const {origin} = req.headers;

         const orderData = {
            userId,
            items, 
            amount,
            address,
            paymentMethod:'stripe',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
       
        const line_items = items.map((items)=> ({
            price_data :{
                currency:currency,
                product_data :{
                    name:items.name
                },
                unit_amount : items.price * 100
            },
            quantity: items.quantity
        }))

        line_items.push({
            price_data :{
                currency:currency,
                product_data :{
                    name:'Delivery Charges'
                },
                unit_amount : deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true, session_url:session.url})
        
    } catch (error) {
         console.log(error);
        res.json({success:false, message:error.message})
    }
    
}


//  Verify Stripe
const verifyStripe = async (req, res)=> {
    const {orderId, success, userId} = req.body;

     try {

       if (success === 'true') {
        await orderModel.findByIdAndUpdate(orderId, {payment:true})
        await userModel.findByIdAndUpdate(userId, {})
        res.json({success:true})
       } else {
        await orderModel.findByIdAndUpdate(orderId)
        res.json({success:false})
       }
        
     } catch (error) {
         console.log(error);
        res.json({success:false, message:error.message})
     }
     
} 


// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res)=> {

    try {

        const {userId, items, amount, address} = req.body        

         const orderData = {
            userId,
            items, 
            amount,
            address,
            paymentMethod:'razorpay',
            payment:false,
            date:Date.now()
        }
         
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const option = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(option, (error, order)=> {
            
            if (error) {
                return res.json({success:false, message: error})       
            }
            
            res.json({success:true, order})
        })
        
    } catch (error) {
        console.log(error);
         res.json({success:false, message:error.message})
    }
    
}

const verifyRazopay = async (req, res)=> {
    try {

        const {userId, razorpay_order_id} = req.body;    
        
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true, message:'Payment Successful'})
        } else {
            res.json({success:false, message:'Payment Faild'})
        }
        
        
    } catch (error) {
        console.log(error);
         res.json({success:false, message:error.message})
    }
}

//All Orders data for Admin Panel
const allOrders = async (req, res)=> {

    try {

        const orders = await orderModel.find({})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
         res.json({success:false, message:error.message})    
    }
    
}

//All Order data for Frontend
const userOrders = async (req, res)=> {
     console.log('heres');
     
    try {
        
      const {userId} = req.body;
      const orders = await orderModel.find({userId})
      res.json({success:true, orders}) 
      console.log(orders);
      

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    
}

//update order status for Admin Panel
const updateStatus = async (req, res)=> {

    try {

        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
        
    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    
}

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazopay
};
