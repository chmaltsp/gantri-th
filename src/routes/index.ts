import { Router } from 'express';
import artRoutes from './art';
import userRoutes from './users';

const router = Router();

artRoutes.use('/art', artRoutes);
userRoutes.use('/users', userRoutes);


router.use('/api', [artRoutes, userRoutes])

export default router;


