import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
