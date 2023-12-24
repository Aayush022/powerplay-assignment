// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Login from "./modules/login";
import ProductsList from "./modules/products-list";
import ProductDetails from "./modules/products-details";
import Cart from "./modules/cart";

const App = () => {
  const history = useHistory()

  const validateLogin = () => {
    const token = localStorage.getItem("hasLoggedIn");
    return token;
  };

  const handleLogout = () => {
    localStorage.removeItem("hasLoggedIn");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <div>
        {validateLogin() && <div className="top-bar">
          <div className="top-bar-content">
            <Link to="/">Home</Link>
            <div>
              <Link to="/cart">Cart</Link>
              {validateLogin() ? (
                <Link to="/login" onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>}

        <Switch>
          <Route path="/" exact render={() =>
              validateLogin() ? <ProductsList /> : <Redirect to="/login" />
            } />
          <Route
            path="/login"
            render={() =>
              validateLogin() ? <Redirect to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/products-list"
            render={() =>
              validateLogin() ? <ProductsList /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/product-details/:productId"
            render={() =>
              validateLogin() ? <ProductDetails /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/products-list"
            render={() =>
              validateLogin() ? <ProductsList /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/cart"
            render={() =>
              validateLogin() ? <Cart /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
