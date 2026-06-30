import { Router } from 'express';
import { algorithmController } from '../controllers/algorithm.controller';

const router = Router();

// Specific routes MUST come before dynamic :id routes

// Get all algorithms
router.get('/', algorithmController.getAllAlgorithms);

// Get algorithm by category (BEFORE /:id route)
router.get('/category/:category', algorithmController.getAlgorithmsByCategory);

// Get algorithm example code (BEFORE /:id route)
router.get('/:id/example', algorithmController.getAlgorithmExample);

// Dynamic routes (/:id) come LAST
router.get('/:id', algorithmController.getAlgorithmById);

export default router;
