import { Router } from 'express';
import {
  addCategory,
  getCategories,
} from '../../controllers/product/categoryProductController';

const router = Router();

router.get('/', getCategories);
router.post('/', addCategory);

export default router;
