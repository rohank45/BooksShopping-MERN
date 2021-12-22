import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";
import Products from "./components/Products";

import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [user, setuser] = useState();
  const getData = async () => {
    const res = await axios.get("/auth/profile");
    setuser(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className={`font-nunito bg-gray-100 ${
        localStorage.getItem("dark") && "dark"
      }`}
    >
      <BrowserRouter>
        <nav className="bg-white shadow w-full dark:bg-gray-900 dark:text-white">
          <div className="pc:container px-6 py-3 mx-auto flex items-center justify-between mobile:px-4 mobile:mx-0">
            <div className="flex items-center gap-2">
              <Link
                className="text-3xl font-bold text-gray-800 hover:text-gray-700 mobile:text-xl dark:text-white"
                to="/"
              >
                BuyBooks
              </Link>

              <div className="flex items-center">
                <Link
                  to="/"
                  className="px-2 py-1 text-lg font-medium text-gray-700 transition-colors duration-200 
                    transform rounded hover:bg-gray-900 hover:text-gray-100 md:mx-2 mobile:text-sm
                    dark:text-white dark:hover:text-gray-900 dark:hover:bg-gray-100 mobile:hidden"
                >
                  Home
                </Link>

                <Link
                  to="/myorders"
                  className="px-2 py-1 text-lg font-medium text-gray-700 transition-colors duration-200 
                    transform rounded hover:bg-gray-900 hover:text-gray-100 md:mx-2 mobile:text-sm
                    dark:text-white dark:hover:text-gray-900 dark:hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="px-2 py-1 text-xl font-medium text-gray-700 transition-colors duration-200 
                    transform rounded hover:bg-gray-900 hover:text-gray-100 md:mx-2 mobile:text-base 
                    dark:text-white dark:hover:text-gray-900 dark:hover:bg-gray-100"
                >
                  <span className="flex justify-center items-center gap-1">
                    {} <FiShoppingCart />
                  </span>
                </Link>

                <div className="text-2xl mobile:text-xl cursor-pointer">
                  {localStorage.getItem("dark") ? (
                    <p>
                      <MdOutlineDarkMode
                        onClick={() => {
                          setDarkMode(!darkMode);
                          localStorage.setItem("light", "theme");
                          localStorage.removeItem("dark");
                        }}
                      />
                    </p>
                  ) : (
                    <p>
                      <MdDarkMode
                        onClick={() => {
                          setDarkMode(!darkMode);
                          localStorage.setItem("dark", "theme");
                          localStorage.removeItem("light");
                        }}
                      />
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className="px-2 py-1 text-xl font-medium dark:text-gray-700 transition-colors duration-200 
                    transform rounded dark:hover:bg-gray-900 dark:hover:text-gray-100 md:mx-2 mobile:text-base 
                    text-white bg-gray-900 dark:bg-white hover:text-gray-900 hover:bg-gray-100"
            >
              {user ? (
                <a href="https://buy-books.herokuapp.com/auth/logout">logout</a>
              ) : (
                <a href="https://buy-books.herokuapp.com/auth/google">login</a>
              )}
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" exact component={Products} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/myorders" exact component={MyOrders} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
