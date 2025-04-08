import { Router } from 'express';
import {
  addCategory,
  getCategories,
} from '../../controllers/product/categoryProductController';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCategories);
router.post('/', protect, addCategory);

export default router;
