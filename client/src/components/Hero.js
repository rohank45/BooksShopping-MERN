import React from "react";
import bookHero from "../images/bookHero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div
        className="flex mobile:flex-col tablet:flex-col"
        style={{ height: "80vh" }}
      >
        <div className="bg-gray-900 w-full flex justify-center items-center laptop:p-20 tablet:p-4 mobile:py-5 dark:bg-gray-400">
          <img
            src={bookHero}
            alt="books"
            style={{ height: "70%" }}
            className="rounded-lg rotateImg"
          />
        </div>

        <div
          className="bg-gray-400 w-full flex justify-start items-center mobile:py-4 tablet:pt-10 tablet:pb-2
            dark:bg-gray-800 dark:text-white"
        >
          <div>
            <p className="overflow-hidden font-bold text-4xl mx-4 mobile:text-lg tablet:text-3xl line-to-animate animation-typewriter mobile:mt-4 laptop:text-3xl">
              BEST PLACE TO CHOOSE YOUR BOOKS
            </p>
            <p className="font-semibold text-xl ml-4 mr-40 my-3 mobile:hidden tablet:text-lg tablet:mr-10">
              “The more that you read, the more things you will know. The more
              that you learn, the more places youll go.”
            </p>
            <p className="font-semibold text-xl mx-4 my-2 mobile:text-base mobile:my-0">
              Find and Buy your Favourite Books easily.
            </p>
            <button
              className="bg-gray-800 text-white text-xl rounded-md shadow-xl px-4 py-2 my-4 mx-8 mobile:mx-4
                border border-white dark:bg-white dark:text-black mobile:text-lg"
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
