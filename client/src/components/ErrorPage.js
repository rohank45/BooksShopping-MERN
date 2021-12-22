import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen text-4xl text-center pt-40 font-bold mobile:text-2xl dark:text-white dark:bg-gray-800">
      ErrorPage
      <button
        className="bg-gray-800 text-white text-xl rounded-md shadow-xl px-4 py-2 my-4 mx-8 mobile:mx-4
                border border-white dark:bg-white dark:text-black"
      >
        <Link to="/">Back to Home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
