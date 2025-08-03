import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://book-app-backend-ucc5.onrender.com/api/books");
      setData(response.data);
      setFilteredBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        📚 Welcome to the Book Store
      </h1>

      <form className="max-w-xl mx-auto mb-10 flex shadow-md rounded-xl overflow-hidden bg-white">
        <input
          type="search"
          placeholder="Search your book..."
          className="flex-grow px-5 py-3 text-gray-700 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold transition-all duration-300"
        >
          Search
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredBooks.length > 0 ? (
            filteredBooks
              .slice(0, searchQuery ? filteredBooks.length : 6)
              .map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center"
                >
                  <img
                    src={book.Image}
                    alt={book.title}
                    className="w-32 h-32 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h2>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No books found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
