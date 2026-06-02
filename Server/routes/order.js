import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/all").get(protect, admin, getAllOrders);
router.route("/:id").get(protect, getOrderById);

export default router;

