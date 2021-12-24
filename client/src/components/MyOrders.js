import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import empty_cart from "../images/undraw_empty_cart.png";
import logo from "../images/bookHero.jpg";

import StripeCheckout from "react-stripe-checkout";

const MyOrders = () => {
  const [amount, setAmount] = useState(300);
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const history = useHistory();

  const getMyOrders = async () => {
    try {
      const res = await axios.get("https://buy-books.herokuapp.com/myorders");

      setOrderData(res.data.data.myOrders);
      setUserData(res.data.data);
    } catch (error) {
      history.push("/");

      return toast.warning("Login first to access this page!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  if (orderData.length === 0) {
    return (
      <div>
        <div className="my-2 flex justify-center items-center shadow-md bg-gray-100 dark:text-white dark:bg-gray-900">
          <div
            className="flex justify-evenly items-center w-1/2 tablet:w-full mobile:w-full"
            key={userData.rank}
          >
            <img
              src={userData.photo}
              alt="profile"
              className="rounded-full shadow-lg m-2"
            />
            <p className="text-2xl mobile:text-lg font-semibold">
              Welcome, {userData.email}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center dark:bg-gray-700 py-10">
          <div>
            <div className="w-1/2 mobile:w-full tablet:w-full">
              <img src={empty_cart} alt="empty_cart" />
            </div>
            <div>
              <p className="text-4xl text-center font-semibold font-nunito uppercase px-5 py-2 mobile:text-lg tablet:text-2xl dark:text-white">
                You haven't placed any orders yet!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-2 flex justify-center items-center shadow-md w-full bg-gray-100 dark:text-white dark:bg-gray-900">
        <div
          className="flex justify-evenly items-center w-1/2 tablet:w-full mobile:w-full"
          key={userData.rank}
        >
          <img
            src={userData.photo}
            alt="profile"
            className="rounded-full shadow-lg m-2"
          />
          <p className="text-2xl mobile:text-lg font-semibold">
            Welcome, {userData.email}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="dark:bg-gray-700 h-1/2 w-9/12 mobile:w-full my-5 rounded-lg shadow-2xl bg-gray-400 mobile:rounded-none">
          <div className="px-5 flex flex-wrap gap-10 mb-10 my-5 mobile:px-2">
            {orderData?.map((val) => {
              const { rank, title, price, author, book_image } = val;

              return (
                <div
                  key={rank}
                  className="max-w-xs mx-auto bg-white rounded-lg shadow-xl border dark:bg-gray-800 dark:text-white"
                >
                  <img
                    className="object-cover w-full h-52 mt-1"
                    src={book_image}
                    alt="books"
                  />

                  <div className="px-4 py-2">
                    <h1 className="text-2xl font-bold text-gray-800 uppercase dark:text-white h-20">
                      {title}
                    </h1>

                    <div className="h-48">
                      <h1 className="text-lg font-bold py-1">${price}</h1>
                      <h1 className="text-lg font-bold py-2">
                        Author: {author}
                      </h1>

                      <div>
                        <p className="bg-green-100 py-1 w-full text-lg text-center rounded-lg text-black">
                          order status: {val.orderStatus}
                        </p>
                      </div>

                      {/* <div>
                      <input
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="enter a amount"
                        className="bg-indigo-100 rounded-lg text-xl py-1 px-5 w-full mt-2"
                      />
                    </div> */}

                      <div className="flex justify-between text-xl text-white font-semibold mt-4">
                        {val.orderStatus === "delivered" ? (
                          <button className="bg-blue-500 p-2 rounded-md shadow-lg w-full">
                            Order again
                          </button>
                        ) : (
                          <button
                            className="bg-red-800 p-2 rounded-md"
                            onClick={async () => {
                              try {
                                await axios.post(
                                  "https://buy-books.herokuapp.com/cancel/book",
                                  {
                                    rank: val.rank,
                                  }
                                );
                                history.push("/");

                                return toast.error(
                                  "Book order canceled, if already paid refund will get in 2 working days!",
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 4000,
                                  }
                                );
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Cancel Order
                          </button>
                        )}

                        {val.orderStatus === "delivered" ? (
                          ""
                        ) : val.paymentToken === "cod" ? (
                          <button className="bg-indigo-500 p-2 rounded-md shadow-lg">
                            <StripeCheckout
                              name="Buy Book!"
                              currency="INR"
                              image={logo}
                              amount={amount * 100}
                              stripeKey="pk_test_51Jy87DSG9ovprffCwJIBJu3VNYsqunVH6RxuTtt9oOgWZu2G8lf115LNmiHz4TJtzXAHVv3WuKVZxUnly1brCxX300ELhJuiad"
                              token={async (token) => {
                                try {
                                  await axios.post(
                                    "https://buy-books.herokuapp.com/capture/payment",
                                    {
                                      amount: amount,
                                      token: token,
                                      rank: val.rank,
                                    }
                                  );

                                  history.push("/");

                                  return toast.success("Payment Successful!", {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 4000,
                                  });
                                } catch (error) {
                                  console.log(error);
                                  return toast.error(
                                    "server issues try later!!",
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                      autoClose: 3000,
                                    }
                                  );
                                }
                              }}
                            >
                              Make Payment
                            </StripeCheckout>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-indigo-500 p-2 rounded-md shadow-lg opacity-50"
                          >
                            Already paid
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
