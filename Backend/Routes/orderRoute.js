import express from 'express'
import adminAut from '../MiddleWare/adminAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazopay, verifyStripe } from '../Controllers/orderController.js';
import authUser from '../MiddleWare/auth.js'

const orderRouter = express.Router();

//admin Features
orderRouter.post('/list', adminAut, allOrders);
orderRouter.post('/status', adminAut, updateStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//User Feature

orderRouter.post('/userorders', authUser, userOrders)

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazopay)


export default orderRouter