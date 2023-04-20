import { Router } from 'express';
import {
  getSkiTerms,
  updateSkiTerms,
  deleteSkiTerm
} from './dictionary-controller.js';

const router = new Router();

router.get('/', getSkiTerms);
router.post('/', updateSkiTerms);
router.delete('/:term', deleteSkiTerm);

export default router;
