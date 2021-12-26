import axios from "axios";
import React, { useEffect, useState } from "react";
import aos from "aos";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../actions/CartActions";

const LimProducts = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=bvvivAeO3fEKT66GAXKZU6DRfHSdNksv"
      );
      setBooks(res.data.results.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dark:bg-gray-700 pt-20 tablet:pt-40 mobile:pt-10 laptop:pt-0">
      <div className="pc:container mx-auto flex flex-wrap gap-10 py-10">
        {books.slice(0, 8).map((curElem) => {
          const { title, price, author, description, book_image } = curElem;

          return (
            <div
              key={curElem.rank}
              data-aos="flip-up"
              data-aos-delay="50"
              className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl border dark:bg-gray-800 dark:text-white"
            >
              <img
                className="object-cover w-full h-48 mt-1"
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

              <div className="flex items-center justify-between px-4 py-5 bg-gray-900">
                <button
                  onClick={async () => {
                    try {
                      const newOrderData = {
                        rank: curElem.rank,
                        book_image: curElem.book_image,
                        title: curElem.title,
                        price: curElem.price,
                        author: curElem.author,
                      };

                      await axios.post(
                        "https://buy-books.herokuapp.com/buy/book",
                        newOrderData
                      );

                      history.push("/myorders");

                      return toast.success("Book order placed successfully!", {
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
                  className="px-2 py-2 text-sm font-semibold text-gray-900 uppercase transition-colors duration-200
                        transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => dispatch(addToCart(curElem))}
                  className="px-2 py-2 text-sm font-semibold text-gray-900 uppercase transition-colors duration-200
                        transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-700 font-light pt-4 pb-10 font-nunito dark:bg-gray-700 dark:text-white">
        <Link to="/books" className="cursor-pointer">
          view more Books ...
        </Link>
      </p>
    </div>
  );
};

export default LimProducts;
