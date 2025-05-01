import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/books");
      console.log("Fetched books:", response.data);
      setData(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = data.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, data]);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10">
        Welcome to the Book Store
      </h1>
      <div className="w-[90%] mx-auto mt-10 flex justify-center items-center flex-col">
        <form
          action=""
          className="w-[50%] max-md:w-[90%] mx-auto border-1 border-white rounded-4xl shadow-2xl shadow-gray-500"
        >
          <div className="flex items-center">
            <input
              type="search"
              className="rounded-bl-4xl rounded-tl-4xl px-5 py-2 w-full"
              placeholder="Search your book"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="bg-orange-400 p-2 rounded-tr-4xl rounded-br-4xl w-20 cursor-pointer text-black font-bold"
            >
              Search
            </button>
          </div>
        </form>
        <div className="mt-5 flex justify-center items-center flex-wrap gap-10 w-[90%] mx-auto p-10 rounded-4xl">
          {filteredBooks.length > 0 ? (
            filteredBooks
              .slice(0, searchQuery ? filteredBooks.length : 6)
              .map((book) => (
                <div key={book._id} className="p-2 border-b border-gray-300 ">
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <img
                    src={book.Image}
                    alt={book.title}
                    className="w-32 h-32 rounded-xl"
                  />
                  <p>{book.author}</p>
                </div>
              ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
