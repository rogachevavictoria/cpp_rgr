import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsBook,  } from '../actions/bookActions';

const BookScreen = (props) => {
    const [qty, setQty] = useState(1);
    const bookDetails = useSelector(state => state.bookDetails);
    const { book, loading, error } = bookDetails;
    const dispatch = useDispatch();

useEffect(() => {
       
        dispatch(detailsBook(props.match.params.id));
        return () => {
          //
        };
      }, []);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
      };

    return  <div>
        <div className="back-to-result">
        <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
            (
                <div className="details">
                            <div className="details-image">
                            <img src={book.image} alt="book"></img>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                    <h4>{book.title}</h4>
                                    </li>
                                    <li>
                                   
                                    {book.rating} stars ({book.numReviews} reviews)
                                    </li>
                                    <li>
                                    Price: <b>${book.price}</b>
                                    </li>
                                    <li>
                                    Description:
                                    <div>{book.description}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>Price: ${book.price}</li>
                                    <li>
                                    Status:{' '}
                                    {book.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                                    </li>
                                    <li>
                                    Qty:{' '}
                                    <select
                                        value={qty}
                                        onChange={(e) => {
                                        setQty(e.target.value);
                                        }}
                                    >
                                        {[...Array(book.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                    </select>
                                    </li>
                                    <li>
                                    {book.countInStock > 0 && (
                                        <button 
                                        onClick={handleAddToCart}
                                        className="button primary"
                                        >
                                        Add to Cart
                                        </button>
                                    )}
                                    </li>
                                </ul>
                            </div>
                        </div>
            )    
        }
        
    </div>
    
}

export default BookScreen;