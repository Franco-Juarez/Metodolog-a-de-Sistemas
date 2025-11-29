import { Router } from 'express';
import { UserController } from '../controllers/User.Controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

//endpoints
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', authenticateToken, UserController.logout);
router.put('/profile', authenticateToken, UserController.updateProfile);
router.get('/profile', authenticateToken, UserController.getProfile);
//obtiene las publicaciones d un usuario
router.get(
  '/me/publications',
  authenticateToken,
  UserController.getMyPublications
);

export default router;
