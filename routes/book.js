var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

/* GET ALL BOOKS */
router.get('/', async function (req, res, next) {
  try {
    const books = await Book.find().lean();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', async function (req, res, next) {
  try {
    const book = await Book.findById(req.params.id).lean();
    res.json(book);
  } catch (err) {
    next(err);
  }
});

/* SAVE BOOK */
router.post('/', async function (req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
});

/* UPDATE BOOK */
router.put('/:id', async function (req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(book);
  } catch (err) {
    next(err);
  }
});

/* DELETE BOOK */
router.delete('/:id', async function (req, res, next) {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
