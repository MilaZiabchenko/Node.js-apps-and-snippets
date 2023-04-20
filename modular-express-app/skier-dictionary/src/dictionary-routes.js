import { Router } from 'express';
import { logger } from './lib.js';
import {
  getSkiTerms,
  getSkiTerm,
  updateSkiTerms,
  deleteSkiTerm
} from './dictionary-controller.js';

const router = new Router();

router.get('/', logger, getSkiTerms);
router.get('/:term', logger, getSkiTerm);
router.post('/', logger, updateSkiTerms);
router.delete('/:term', logger, deleteSkiTerm);

export default router;
