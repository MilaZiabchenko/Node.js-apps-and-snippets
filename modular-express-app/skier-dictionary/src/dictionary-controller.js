import skiTerms from '../data/ski-terms.json' assert { type: 'json' };
import { save } from './lib.js';

const getSkiTerms = (req, res) => {
  res.json(skiTerms);
};

const getSkiTerm = (req, res) => {
  const searchedTerm = skiTerms.find(t => t.term === req.params.term);

  if (searchedTerm) {
    req.query?.q === 'definition'
      ? res.json({ [`${searchedTerm.term} definition`]: searchedTerm.defined })
      : res.json(searchedTerm);
  } else {
    res.json({
      message: `Oops, there's no term '${req.params.term}' in the skier dictionary`
    });
  }
};

const updateSkiTerms = (req, res) => {
  const newTerm = req.body;
  const termIndex = skiTerms.findIndex(t => newTerm.term === t.term);

  if (termIndex === -1) {
    skiTerms.push(newTerm);
  } else {
    skiTerms.splice(termIndex, 1, newTerm);
  }

  save(skiTerms);

  res.json({
    status: 'success',
    term: newTerm
  });
};

const deleteSkiTerm = (req, res) => {
  const updatedSkiTerms = skiTerms.filter(t => t.term !== req.params.term);

  save(updatedSkiTerms);

  res.json({
    status: 'success',
    removed: req.params.term,
    newLength: skiTerms.length
  });
};

export { getSkiTerms, getSkiTerm, updateSkiTerms, deleteSkiTerm };
