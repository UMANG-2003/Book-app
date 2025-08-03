import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, sidebarRef }) {
  return (
    <div
      ref={sidebarRef}
      className={`md:hidden fixed top-16 right-0 h-screen w-2/3 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ul className="flex flex-col gap-1 py-6 px-4 text-white font-medium">
        {[
          { name: "Home", path: "/" },
          { name: "Books", path: "/books" },
          { name: "Add Book", path: "/add-book" },
          { name: "Update Book", path: "/update-book" },
          { name: "Delete Book", path: "/delete-book" },
        ].map(({ name, path }) => (
          <Link key={name} to={path}>
            <li className="w-full px-4 py-3 rounded-lg hover:bg-purple-700 bg-gray-800 transition duration-200">
              {name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
