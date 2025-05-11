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
      <div className="w-full bg-gray-900 h-16 shadow-lg shadow-gray-700 px-3 flex justify-between items-center">
        <div className="flex items-center p-1.5 w-fit">
          <img src="/logo.png" alt="Logo" className="w-10 rounded-lg m-1" />
          <p className="text-xl font-bold mx-2 text-white">Book Store</p>
        </div>

        <ul className="flex gap-8 font-bold cursor-pointer mr-10 max-md:hidden text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/add-book">Add Books</Link></li>
          <li><Link to="/update-book">Update Book</Link></li>
          <li><Link to="/delete-book">Delete Book</Link></li>
        </ul>

        <div className="max-md:hidden text-white">Admin</div>
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            ☰
          </button>
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} sidebarRef={sidebarRef} />
    </>
  );
}

export default Navbar;
