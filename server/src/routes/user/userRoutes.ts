import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getStores,
  getUserProfile,
  getUsers,
  signInUser,
  signOutUser,
  updateUserProfile,
} from '../../controllers/user/userControllers';
import { authorize, protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, authorize(['store']), getUsers);
router.post('/', addUser);
router.post('/sign-in', signInUser);
router.post('/sign-out', signOutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/delete', protect, deleteUser);
router.get('/stores', getStores);

export default router;
