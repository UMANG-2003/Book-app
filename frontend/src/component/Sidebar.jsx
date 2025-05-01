import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, sidebarRef }) {
  return (
    <div
      ref={sidebarRef}
      className={`md:hidden bg-gray-800 w-[60%] h-screen py-5 fixed top-16 right-0 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ul className="flex flex-col gap-2 font-bold text-white">
        <Link to="/"><li className="w-full hover:bg-gray-600 bg-gray-700 p-3">Home</li></Link>
        <Link to="/books"><li className="w-full hover:bg-gray-600 bg-gray-700 p-3">Books</li></Link>
        <Link to="/add-book"><li className="w-full hover:bg-gray-600 bg-gray-700 p-3">Add Books</li></Link>
        <Link to="/update-book"><li className="w-full hover:bg-gray-600 bg-gray-700 p-3">Update Book</li></Link>
        <Link to="/delete-book"><li className="w-full hover:bg-gray-600 bg-gray-700 p-3">Delete Book</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
