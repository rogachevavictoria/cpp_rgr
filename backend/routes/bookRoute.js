import express from 'express';
import Book from '../models/bookModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find({});
  res.send(books);
});

router.get('/:id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: 'book Not Found.' });
    }
  });

  router.post('/:id/reviews', isAuth, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    book.reviews.push(review);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.reduce((a, c) => c.rating + a, 0) /
      book.reviews.length;
    const updatedbook = await book.save();
    res.status(201).send({
      data: updatedbook.reviews[updatedbook.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'book Not Found' });
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (book) {
      book.title = req.body.title;
      book.image = req.body.image;
      book.category = req.body.category;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.author = req.body.author;
      book.published = req.body.published;
      book.price = req.body.price;
      const updatedbook = await book.save();
      if (updatedbook) {
        return res
          .status(200)
          .send({ message: 'book Updated', data: updatedbook });
      }
    }
    return res.status(500).send({ message: ' Error in Updating book.' });
  });

  router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedBook = await Book.findById(req.params.id);
    if (deletedBook) {
      await deletedBook.remove();
      res.send({ message: 'Book Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });
  
router.post('/', isAuth, isAdmin, async (req, res) => {
    const book = new Book({
        title: req.body.title,
        image: req.body.image,
        category: req.body.category,
        genre: req.body.genre,
        author: req.body.author,
        published: req.body.published,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
        reviews: req.body.reviews,
    });
    const newBook = await book.save();
    if (newBook) {
      return res
        .status(201)
        .send({ message: 'New book Created', data: newBook });
    }
    return res.status(500).send({ message: ' Error in Creating book.' });
  });



export default router;
