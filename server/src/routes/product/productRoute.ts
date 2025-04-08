import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
} from '../../controllers/product/productController';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getProducts);
router.post('/', protect, addProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
