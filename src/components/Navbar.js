import React from "react";
import Logo from "../assets/Finder.webp";

const Navbar = () => {
  return (
    <div className="p-4 md:px-8 flex w-full">
      <img
        src={Logo}
        alt="logo"
        className="w-12 h-12 md:w-16 md:h-14 lg:w-24 lg:h-20"
      />
    </div>
  );
};

export default Navbar;
