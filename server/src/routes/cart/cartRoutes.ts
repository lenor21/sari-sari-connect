import { Router } from 'express';
import {
  getCart,
  addCartItem,
  updateQuantity,
  removeItem,
} from '../../controllers/cart/cartController';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCart);
router.post('/', protect, addCartItem);
router.put('/update-quantity', protect, updateQuantity);
router.put('/remove-item', protect, removeItem);

export default router;
