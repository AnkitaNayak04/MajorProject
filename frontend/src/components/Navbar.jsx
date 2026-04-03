import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-red-700"
        >
          GIET <span className="text-gray-800">DeptConnect</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="navLink">Home</Link>
          <Link to="/about" className="navLink">About Us</Link>
          <Link to="/faculty" className="navLink">Faculty</Link>

          <Link
            to="/activities"
            className="relative text-gray-800 hover:text-red-700 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all hover:after:w-full"
          >
            Activities
          </Link>

          <Link to="/achievements" className="navLink">Achievements</Link>
          <Link to="/placement" className="navLink">Placements</Link>

          {!isAdmin ? (
            <Link
              to="/login"
              className="bg-red-700 text-white px-5 py-2 rounded-full hover:bg-red-800"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-black"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/faculty" onClick={() => setMenuOpen(false)}>Faculty</Link>
          <Link to="/activities" onClick={() => setMenuOpen(false)}>Activities</Link>
          <Link to="/achievements" onClick={() => setMenuOpen(false)}>Achievements</Link>
          <Link to="/placement" onClick={() => setMenuOpen(false)}>Placements</Link>

          {!isAdmin ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-red-700 text-white px-4 py-2 rounded text-center"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;