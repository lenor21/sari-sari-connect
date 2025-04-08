import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
} from '../../controllers/product/productController';
import { authorize, protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getProducts);
router.post('/', protect, authorize(['store']), addProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
