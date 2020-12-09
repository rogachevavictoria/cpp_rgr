import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
  
    const bookId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    
    const dispatch = useDispatch();
    const removeFromCartHandler = (bookId) => {
      dispatch(removeFromCart(bookId));
    }

    useEffect(() => {
      if (bookId) {
        dispatch(addToCart(bookId, qty));
      }
    }, []);
  
    const checkoutHandler = () => {
      props.history.push("/signin?redirect=shipping");
    }
  
    return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="book" />
                </div>
                <div className="cart-name">
                  <div >
                    <Link to={"/book/" + item.book}>
                      <h3>{item.title}</h3>
                    </Link>

                  </div>
                  <div> 
                  <p>Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.book, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select></p>
                    <button type="button" className="button secondary" onClick={() => removeFromCartHandler(item.book)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div> 

  </div>
  }
  
  export default CartScreen;