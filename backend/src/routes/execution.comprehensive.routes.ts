import { Router, Request, Response } from 'express';
import { comprehensiveExecutionService } from '../services/execution.comprehensive.service';

const router = Router();

// Specific routes MUST come before dynamic :id routes

// Execute an algorithm with given input
router.post('/algorithm', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { algorithmId, input, options } = _req.body;

    if (!algorithmId) {
      res.status(400).json({ error: 'Algorithm ID is required' });
      return;
    }

    // Validate input
    const validation = comprehensiveExecutionService.validateInput(algorithmId, input);
    if (!validation.valid) {
      res.status(400).json({ 
        error: 'Invalid input', 
        details: validation.errors 
      });
      return;
    }

    const result = await comprehensiveExecutionService.executeAlgorithm({
      algorithmId,
      input,
      options
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Validate input for an algorithm (BEFORE /status/:id and /sample-input/:algorithmId)
router.post('/validate', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { algorithmId, input } = _req.body;

    if (!algorithmId) {
      res.status(400).json({ error: 'Algorithm ID is required' });
      return;
    }

    const validation = comprehensiveExecutionService.validateInput(algorithmId, input);
    res.json(validation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate sample input for an algorithm (BEFORE /:id dynamic routes)
router.get('/sample-input/:algorithmId', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { algorithmId } = _req.params;
    const sampleInput = comprehensiveExecutionService.generateSampleInput(algorithmId);
    
    res.json({ algorithmId, input: sampleInput });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Dynamic param routes come LAST

// Get execution status
router.get('/status/:id', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { id } = _req.params;
    const result = await comprehensiveExecutionService.getExecutionStatus(id);

    if (!result) {
      res.status(404).json({ error: 'Execution not found' });
      return;
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel execution
router.delete('/cancel/:id', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { id } = _req.params;
    const success = await comprehensiveExecutionService.cancelExecution(id);

    if (!success) {
      res.status(404).json({ error: 'Execution not found' });
      return;
    }

    res.json({ message: 'Execution cancelled' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
