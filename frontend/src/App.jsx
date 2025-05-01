import React from "react";
import AddBook from "./component/AddBook";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import DeleteBooks from "./component/DeleteBooks";
import UpdateBooks from "./component/UpdateBooks";
import Books from "./component/Books";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book" element={<UpdateBooks />} />
        <Route path="/delete-book" element={<DeleteBooks />} />
        <Route path="*" element={<h1 className="text-center mt-10 text-red-600 text-2xl">404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
