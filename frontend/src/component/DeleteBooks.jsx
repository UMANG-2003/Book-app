import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Footer from "./Footer";
function DeleteBooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
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

  const deleteBook = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://book-app-backend-ucc5.onrender.com/api/books/${id}`);
      setData((prevData) => prevData.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  return <>
    <div className="min-h-screen bg-gray-100 text-white px-4 py-10">
      <h1 className="text-3xl text-center font-bold mb-10 text-gray-900">🗑️ Delete Books</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-10 bg-gray-200 w-[90%] mx-auto p-10 rounded-4xl">
          {data.length > 0 ? (
            data.map((book) => (
              <div key={book._id} className="bg-gray-700 w-[200px] h-[280px] flex flex-col justify-center items-center gap-2 rounded-4xl p-3">
                <img
                  src={book.Image}
                  alt={book.title}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <h3 className="font-bold text-center">Title: {book.title}</h3>
                <p className="text-sm text-center">Author: {book.author}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                      deleteBook(book._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-900">No books found.</p>
          )}
        </div>
      )}
    </div>
    <Footer></Footer>
  </>
}

export default DeleteBooks;
