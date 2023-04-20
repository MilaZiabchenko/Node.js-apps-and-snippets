const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();

app.use(express.json());

let db;

app.get('/books', (req, res) => {
  const page = req.query.page || 1;
  const booksPerPage = 3;

  const books = [];

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip((page - 1) * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the docs' });
    });
});

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: ObjectId(req.params.id) })
      .then(book => {
        res.status(200).json(book);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not fetch a doc' });
      });
  } else {
    res.status(500).json({ error: 'Doc id is not valid' });
  }
});

app.delete('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not delete the doc' });
      });
  } else {
    res.status(500).json({ error: 'Doc id is not valid' });
  }
});

app.patch('/books/:id', (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not update the doc' });
      });
  } else {
    res.status(500).json({ error: 'Doc id is not valid' });
  }
});

app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res
        .status(201)
        .json(result)
        .catch(() => {
          res.status(500).json({ error: 'Could not create a new doc' });
        });
    });
});

connectToDb(err => {
  if (!err) {
    app.listen(3000, () => {
      console.log('App listening on port 3000');
    });

    db = getDb();
  }
});
