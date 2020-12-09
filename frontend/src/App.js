import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//routes imports
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import BooksScreen from './screens/BooksScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#128366;
                </button>
                <Link to="/">book shop</Link>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                {userInfo ? (<Link to="/profile">{userInfo.name}</Link>) : 
                    (<Link to="/signin">Sign In</Link>
                )}
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="index.html">Nonfiction</a>
                </li>
                <li>
                    <a href="index.html">Fiction</a>
                </li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/" exact={true} component={HomeScreen} />
              <Route path="/book/:id" component={BookScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/books" component={BooksScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />

            </div>
        </main>
        <footer className="footer">
            all rights reserved
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
