import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; // Import NavLink

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white border-b flex py-4 justify-between items-center px-32">
      <NavLink to={"/"} className="flex items-center space-x-2">
        <img
          src="/assets/img/Logo.png"
          alt="LOGO SIMS PPOB"
          className="w-6"
        />
        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
      </NavLink>
      <div className="flex items-center space-x-12 font-semibold text-lg">
        <NavLink 
          to="/topup" 
          className={({ isActive }) => isActive ? "text-red-500" : ""} // Apply class when active
        >
          Top Up
        </NavLink>
        <NavLink 
          to="/transactions" 
          className={({ isActive }) => isActive ? "text-red-500" : ""}
        >
          Transaction
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => isActive ? "text-red-500" : ""}
        >
          Akun
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
