import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/CartActions";
import { useHistory } from "react-router-dom";

const Products = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const getData = async () => {
    try {
      const res = await axios.get(process.env.API_URL);
      setBooks(res.data.results.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dark:bg-gray-700">
      <div className="pc:container flex mx-auto mb-10 mobile:m-2 pt-20">
        <FiSearch className="text-4xl m-auto relative left-10 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400
                    rounded-md focus:border-gray-600 focus:outline-none"
        />
      </div>

      <div className="pc:container mx-auto flex flex-wrap gap-10 pt-5 pb-20">
        {books
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((curElem) => {
            const { title, price, author, description, book_image } = curElem;

            return (
              <div
                key={curElem.rank}
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
                          rank: Math.random().toString(16).slice(2),
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

                        return toast.success(
                          "Book order placed successfully!",
                          {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                          }
                        );
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
    </div>
  );
};

export default Products;
