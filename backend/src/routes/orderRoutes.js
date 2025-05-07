import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/ordersController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getAllOrders); 
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
