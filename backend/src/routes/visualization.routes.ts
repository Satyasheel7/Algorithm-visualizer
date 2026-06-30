import { Router } from 'express';
import { visualizationController } from '../controllers/visualization.controller';

const router = Router();

// Specific routes MUST come before dynamic :id routes

// Get all visualizations
router.get('/', visualizationController.getAllVisualizations);

// Save visualization (BEFORE /:id route)
router.post('/save', visualizationController.saveVisualization);

// Generate visualization data
router.post('/', visualizationController.generateVisualization);

// Dynamic routes (/:id) come LAST
router.get('/:id', visualizationController.getVisualization);

export default router;
