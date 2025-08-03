import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 h-16 shadow-md px-4 flex justify-between items-center sticky top-0 z-50">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-lg"
          />
          <h1 className="text-white font-bold text-xl">Book Store</h1>
        </div>

       
        <nav className="hidden md:flex gap-6 text-white font-medium">
          <Link
            to="/"
            className="hover:text-purple-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="hover:text-purple-300 transition duration-200"
          >
            Books
          </Link>
          <Link
            to="/add-book"
            className="hover:text-purple-300 transition duration-200"
          >
            Add Book
          </Link>
          <Link
            to="/update-book"
            className="hover:text-purple-300 transition duration-200"
          >
            Update Book
          </Link>
          <Link
            to="/delete-book"
            className="hover:text-purple-300 transition duration-200"
          >
            Delete Book
          </Link>
        </nav>

      
        <div className="hidden md:block text-white font-semibold">Admin</div>

        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-2xl focus:outline-none hover:text-purple-300 transition"
          >
            ☰
          </button>
        </div>
      </header>

     
      <Sidebar isOpen={sidebarOpen} sidebarRef={sidebarRef} />
    </>
  );
}

export default Navbar;
