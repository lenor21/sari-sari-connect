import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
} from '../../controllers/product/categoryProductController';
import { authorize, protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCategories);
router.post('/', protect, authorize(['store']), addCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
