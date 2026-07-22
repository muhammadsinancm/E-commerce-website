import express from "express";
import {
  addProduct,
  listProduct,
  removingProduct,
  singleProduct,
} from "../Controllers/productController.js";
import upload from "../MiddleWare/multer.js";
import adminAuth from "../MiddleWare/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removingProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
