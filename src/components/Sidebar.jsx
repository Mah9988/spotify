import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-10 ">
      {links.map((item) => (
        <NavLink
          className={
            "flex flex-row justify-start items-center font-medium text-gray-400 text-sm mb-8 hover:text-cyan-400"
          }
          to={item.to}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOben, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="font-bold text-xl text-white text-center">A3'aneek</h2>

        <NavLinks />
      </div>

      {/* mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOben ? (
          <RiCloseLine
            className="w-8 h-8 text-white mr-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-8 h-8 text-white mr-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl z-50 from-white/10 to-[#483d8b] backdrop-blur-lg p-6 md:hidden smooth-transition ${
          mobileMenuOben ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="font-bold text-xl text-white text-center">A3'aneek</h2>

        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
