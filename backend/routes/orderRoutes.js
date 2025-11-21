import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//User routes
router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

//Admin routes
router.get('/', protect, admin, getOrders);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;