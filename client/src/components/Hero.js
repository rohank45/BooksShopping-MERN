import React from "react";
import bookHero from "../images/bookHero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex mobile:flex-col" style={{ height: "80vh" }}>
        <div className="bg-gray-800 w-full flex justify-center items-center tablet:p-16 mobile:py-5 dark:bg-gray-600">
          <img
            src={bookHero}
            alt="books"
            style={{ height: "70%" }}
            className="rounded-lg rotateImg"
          />
        </div>

        <div
          className="bg-gray-400 w-full flex justify-start items-center mobile:py-4 
            dark:bg-gray-800 dark:text-white"
        >
          <div>
            <p className="font-bold text-4xl mx-4 mobile:text-2xl tablet:text-3xl">
              BEST PLACE TO CHOOSE YOUR BOOKS
            </p>
            <p className="font-semibold text-xl ml-4 mr-40 my-3 mobile:hidden tablet:text-lg tablet:mr-10">
              “The more that you read, the more things you will know. The more
              that you learn, the more places youll go.”
            </p>
            <p className="font-semibold text-xl mx-4 my-2">
              Find and Buy your Favourite Books easily.
            </p>
            <button
              className="bg-gray-800 text-white text-xl rounded-md shadow-xl px-4 py-2 my-4 mx-8 mobile:mx-4
                border border-white dark:bg-white dark:text-black"
            >
              <Link to="/books">Shop Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
