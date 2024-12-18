// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-300 p-5 flex justify-center gap-5 text-2xl sticky top-0 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-black underline" : "text-black no-underline"
        }
      >
        Ingredient List
      </NavLink>
      <NavLink
        to="/suggestions"
        className={({ isActive }) =>
          isActive ? "text-black underline" : "text-black no-underline"
        }
      >
        Meal Ideas
      </NavLink>
    </div>
  );
};

export default Navbar;
