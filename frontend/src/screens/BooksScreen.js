import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveBook,
  listBooks,
  deleteBook,
} from '../actions/bookActions';


function BooksScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [genre, setGenre] = useState('');
  const [uploading, setUploading] = useState(false);
  const bookList = useSelector((state) => state.bookList);
  const { loading, books, error } = bookList;


  const bookSave = useSelector((state) => state.bookSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = bookSave;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = bookDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listBooks());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (book) => {
    setModalVisible(true);
    setId(book._id);
    setTitle(book.title);
    setPrice(book.price);
    setGenre(book.genre);
    setImage(book.image);
    setAuthor(book.author);
    setCategory(book.category);
    setCountInStock(book.countInStock);
    setPublished(book.published);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveBook({
        _id: id,
        title,
        price,
        image,
        author,
        category,
        countInStock,
        genre,
        published,
      })
    );
  };
  const deleteHandler = (book) => {
    dispatch(deleteBook(book._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className="content content-margined">
      <div className="book-header">
        <h3>Books</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create a book
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create book</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  id="author"
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">Count in Stock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="genre">Genre</label>
                <input
                  name="genre"
                  value={genre}
                  id="genre"
                  onChange={(e) => setGenre(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="published">Published</label>
                <input
                  name="published"
                  value={published}
                  id="published"
                  onChange={(e) => setPublished(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="book-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.price}</td>
                <td>{book.category}</td>
                <td>{book.author}</td>
                <td>
                  <button className="button primary" onClick={() => openModal(book)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button secondary"
                    onClick={() => deleteHandler(book)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BooksScreen;
