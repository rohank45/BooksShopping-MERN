import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { removeFromCart, emptyCart } from "../actions/CartActions";
import empty_cart from "../images/undraw_empty_cart.png";

const Cart = () => {
  const cartItems = useSelector((state) => state.CartReducer.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  if (cartItems?.length === 0) {
    return (
      <div className="flex justify-center items-center my-20 dark:bg-gray-700 py-10">
        <div>
          <div className="w-1/2 mobile:w-full tablet:w-full">
            <img src={empty_cart} alt="empty_cart" />
          </div>
          <div>
            <p className="text-4xl font-semibold font-nunito uppercase px-5 py-2 mobile:text-2xl dark:text-white">
              Your Cart is empty!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="dark:bg-gray-700 h-1/2 w-9/12 tablet:w-full tablet:rounded-none mobile:w-full my-5 rounded-lg shadow-2xl bg-gray-400 mobile:rounded-none">
        <button
          onClick={() => dispatch(emptyCart())}
          className="dark:bg-white dark:text-black bg-gray-800 text-white text-2xl font-bold px-4 py-2 mb-5 mt-2"
        >
          EMPTY
        </button>

        <div className="px-5 flex flex-wrap gap-10 mb-10 mobile:px-2">
          {cartItems?.map((val) => {
            const { rank, title, price, author, description, book_image } = val;

            return (
              <div
                key={rank}
                className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl border dark:bg-gray-800 dark:text-white"
              >
                <img
                  className="object-cover w-full h-40 mt-1"
                  src={book_image}
                  alt="books"
                />

                <div className="px-4 py-2 h-72">
                  <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">
                    {title}
                  </h1>
                  <h1 className="text-lg font-bold py-2">${price}</h1>
                  <h1 className="text-lg font-bold py-2">Author: {author}</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-white">
                    {description}
                  </p>
                </div>

                <div className="flex justify-between mx-5 my-4">
                  <button
                    onClick={() => dispatch(removeFromCart(rank))}
                    className="bg-red-800 text-white text-xl font-semibold px-4 py-2 rounded-md"
                  >
                    remove
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const newOrderData = {
                          rank: val.rank,
                          book_image: val.book_image,
                          title: val.title,
                          price: val.price,
                          author: val.author,
                        };

                        await axios.post(
                          "https://buy-books.herokuapp.com/buy/book",
                          newOrderData
                        );

                        history.push("/myorders");

                        return toast.success("Book order placed!", {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 3000,
                        });
                      } catch (error) {
                        return toast.warning("Login first to order a book!", {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 3000,
                        });
                      }
                    }}
                    className="bg-green-800 text-white text-xl font-semibold px-4 py-2 rounded-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
