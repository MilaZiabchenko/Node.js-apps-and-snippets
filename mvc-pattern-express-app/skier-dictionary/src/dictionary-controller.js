import skiTerms from '../data/ski-terms.json' assert { type: 'json' };
import { save } from './lib.js';

const getSkiTerms = (req, res) => {
  res.json(skiTerms);
};

const updateSkiTerms = (req, res) => {
  const updatedSkiTerms = [...skiTerms, req.body];

  save(updatedSkiTerms);

  res.json({
    status: 'success',
    term: req.body
  });
};

const deleteSkiTerm = (req, res) => {
  const updatedSkiTerms = skiTerms.filter(t => t.term !== req.params.term);

  save(updatedSkiTerms);

  res.json({
    status: 'success',
    removed: req.term,
    newLength: skiTerms.length
  });
};

export { getSkiTerms, updateSkiTerms, deleteSkiTerm };
