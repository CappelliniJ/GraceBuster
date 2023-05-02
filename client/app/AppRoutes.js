import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { me } from "./store";
import Account from "../features/account/Account";
import Movies from "../features/movies/Movies";
import Home from "../features/home/Home";
import Contact from "../features/contact/Contact";
import Shop from "../features/shop/Shop";
import SingleMovie from "../features/singleMovie/SingleMovie";
import Cart from "../features/cart/Cart";
import OrderPlaced from "../features/order-placed/OrderPlaced";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/shop" element={<Shop />} />
          <Route path={`/movies/:id`} element={<SingleMovie />} />
          <Route path="/" element={<Account />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route path="/signup" element={<Account />} />
          <Route path="/login" element={<Account />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/shop" element={<Shop />} />
          <Route path={`/movies/:id`} element={<SingleMovie />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
