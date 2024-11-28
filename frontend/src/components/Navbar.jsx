import { Link, Navigate, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  //to change navbar buttons if user is logged in
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-24 sm:w-32 lg:w-36" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-400">
              <img src={assets.credit_star} alt="star" className="w-5" />
              <p className="text-sm font-medium text-gray-600">
                Credits Left: 10
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, User!</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="user icon"
                className="w-10 drop-shadow"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10 hover:scale-105">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buycredit")}
              className="cursor-pointer"
            >
              Pricing
            </p>
            <button className="bg-zinc-800 text-white rounded-full px-7 py-2 sm:px-10 text-sm">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
