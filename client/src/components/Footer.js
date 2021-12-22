import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="flex flex-col items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 sm:flex-row">
        <Link
          to="#"
          className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          BuyBooks
        </Link>

        <p className="py-2 text-gray-800 dark:text-white sm:py-0">
          all rights reserved @https://github.com/rohank45/
        </p>

        <div className="flex -mx-2">
          <Link
            to="#"
            className="mx-2 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FaFacebookF />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <BsGithub />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <BsTwitter />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
