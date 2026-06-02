import express from "express";
import { getMyAddresses, addAddress } from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMyAddresses).post(protect, addAddress);

export default router;
