import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/add", addToCart);
router.put("/update", updateQuantity);
router.post("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router;
