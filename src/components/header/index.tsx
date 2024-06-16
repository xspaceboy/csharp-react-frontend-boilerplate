import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#333] px-8 py-3">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="ml-6 text-xl text-white">
            Pokemon List
          </Link>
        </div>
        <nav>
          <ul className="flex">
            <li>
              <Link to="/" className="ml-6 text-lg text-white">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
