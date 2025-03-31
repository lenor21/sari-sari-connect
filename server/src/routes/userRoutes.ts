import { Router } from 'express';
import { addUser, getUsers, signInUser } from '../controllers/userControllers';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.post('/sign-in', signInUser);

export default router;
