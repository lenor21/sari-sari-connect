import { Router } from 'express';
import {
  addProduct,
  getProducts,
} from '../../controllers/product/productController';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getProducts);
router.post('/', protect, addProduct);

export default router;
