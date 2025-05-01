import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteBooks() {
  const [data, setData] = useState([]);

 
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/books");
      console.log("Fetched books:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const deleteBook = async (id) => {
    console.log("Attempting to delete book with ID:", id); 
    try {
      const response = await axios.delete(`http://localhost:3000/api/books/${id}`);
      console.log("Deleted:", response.data);
      setData(data.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-8 text-white">Delete Books</h1>
      <div className="flex justify-center items-center flex-wrap gap-10 mt-10 bg-gray-800 w-[90%] mx-auto p-10 rounded-4xl">
        {data && data.map((book) => (
          <div key={book._id} className="bg-gray-600 w-[200px] h-[280px] flex flex-col justify-center items-center gap-2 rounded-4xl p-3">
            <img
              src={book.Image}
              alt={book.title}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <h3 className="font-bold text-white">Title: {book.title}</h3>
            <p className="font-bold text-center text-white">Author: {book.author}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                  deleteBook(book._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeleteBooks;
