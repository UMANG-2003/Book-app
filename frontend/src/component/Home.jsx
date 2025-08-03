import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import Footer from "./Footer";
import { gsap } from "gsap";

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const booksRef = useRef(null);

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

  useEffect(() => {
    if (!loading) {
      gsap.from(imageRef.current, { opacity: 0, y: -30, duration: 1 });
      gsap.from(headingRef.current, { opacity: 0, y: 20, duration: 1, delay: 0.3 });
      gsap.from(booksRef.current, { opacity: 0, y: 40, duration: 1, delay: 0.6 });
    }
  }, [loading]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-x-hidden">
        {/* Header Image and Search */}
        <div className="relative w-full overflow-hidden" ref={imageRef}>
          <img
            src="/bookbg.png"
            alt="Book background"
            className="w-full h-[300px] sm:h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <form
              className="w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-xl shadow-md flex flex-col sm:flex-row items-stretch overflow-hidden"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="Search your book..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-700 outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 transition-all text-sm sm:text-base"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-center text-3xl md:text-4xl font-bold text-gray-800 mt-12 mb-8 px-4"
        >
          📚 Explore Your Next Read
        </h1>

        {/* Books Section */}
        {loading ? (
          <Loader />
        ) : (
          <div
            ref={booksRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-20"
          >
            {filteredBooks.length > 0 ? (
              filteredBooks
                .slice(0, searchQuery ? filteredBooks.length : 6)
                .map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 p-6 flex flex-col items-center text-center"
                  >
                    <img
                      src={book.Image}
                      alt={book.title}
                      className="w-28 h-28 object-cover rounded-lg mb-4 shadow-sm"
                    />
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {book.title}
                    </h2>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500 col-span-full text-lg">No books found.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
