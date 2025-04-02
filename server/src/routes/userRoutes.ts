import { Router } from 'express';
import {
  addUser,
  getUserProfile,
  getUsers,
  signInUser,
  signOutUser,
} from '../controllers/userControllers';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.post('/sign-in', signInUser);
router.post('/sign-out', signOutUser);
router.get('/profile', protect, getUserProfile);

export default router;
