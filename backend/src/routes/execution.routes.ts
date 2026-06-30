import { Router } from 'express';
import { executionController } from '../controllers/execution.controller';

const router = Router();

// Specific routes MUST come before dynamic :id routes

// Execute custom code
router.post('/', executionController.executeCode);

// Validate code syntax (BEFORE /status/:id route)
router.post('/validate', executionController.validateCode);

// Dynamic routes (/:id) come LAST
router.get('/status/:id', executionController.getExecutionStatus);

export default router;
