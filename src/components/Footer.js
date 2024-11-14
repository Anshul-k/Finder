import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center p-2 bg-gray-50 rounded-md items-center text-orange-400 font-bold">
      <p className="text-center">
        <a href="mailto:anshul.kasana98@gmail.com" className="cursor-pointer">
          anshul.kasana98@gmail.com
        </a>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
