import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader'; 
import Footer from "./Footer";

function Books() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://book-app-backend-ucc5.onrender.com/api/books");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return <>
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">📚 Book Collection</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {data && data.length > 0 ? (
            data.map((book, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-3xl p-5 flex flex-col items-center hover:shadow-xl transition duration-300"
              >
                <img
                  src={book.Image}
                  alt={book.title}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  className="w-32 h-32 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-bold text-center text-gray-700">{book.title}</h3>
                <p className="text-sm text-gray-600 text-center mt-1">by {book.author}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No books available.</p>
          )}
        </div>
      )}
    </div>
    <Footer />
  </>
}

export default Books;
