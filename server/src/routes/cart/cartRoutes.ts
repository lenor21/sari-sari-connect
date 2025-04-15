import { Router } from 'express';
import { getCart, addCartItem } from '../../controllers/cart/cartController';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCart);
router.post('/', protect, addCartItem);

export default router;
