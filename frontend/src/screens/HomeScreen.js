import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listBooks } from '../actions/bookActions';


const HomeScreen = (props) => {

  const bookList = useSelector((state) => state.bookList);
  const { books, loading, error } = bookList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBooks());
  
    return () => {
      //
    };
  }, []);

    return  loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
            
    <ul className="books">
    {
      books.map(book => <li key={book._id}>
        <div className="book">
            
            <img className="book-image" src={book.image} alt="book" />
            <div className="book-title">
                <Link to={`/book/${book._id}`}>{book.title}</Link>
            </div>
            <div className="book-author">by {book.author}</div>
            <div className="book-genre">{book.genre} </div>
            <div className="book-published">{book.published}</div>
            <div className="book-price">${book.price}</div>
            <div className="book-rating">{book.rating} Stars ({book.reviews} reviews)</div>
        </div>
    </li>)
    } 
  </ul>
}

export default HomeScreen;