import { Router } from 'express';
import { PublicationController } from '../controllers/publication.Controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const router = Router();

//endpoints
//para crear publicacion
router.post('/', authenticateToken, PublicationController.create);

//para obtener las publicaciones activas
router.get('/', PublicationController.getAll);

//para obtener publicacion por id
router.get('/:id', PublicationController.getById);

//para desactivar una publicacion
router.delete('/:id', authenticateToken, PublicationController.disable);

//editar publicacion
router.put('/:id', authenticateToken, PublicationController.update);

export default router;