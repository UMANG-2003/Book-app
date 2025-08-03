import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
function UpdateBooks() {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedBook, setEditedBook] = useState({ title: '', author: '', Image: '' });
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

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      await axios.put(`https://book-app-backend-ucc5.onrender.com/api/books/${id}`, editedBook);
      setEditMode(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">✏️ Update Books</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {data &&
            data.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-lg rounded-2xl p-5 text-center flex flex-col items-center"
              >
                {editMode === book._id ? (
                  <div className="w-full flex flex-col gap-3">
                    <input
                      type="text"
                      value={editedBook.title}
                      onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                      placeholder="Title"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={editedBook.author}
                      onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                      placeholder="Author"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={editedBook.Image}
                      onChange={(e) => setEditedBook({ ...editedBook, Image: e.target.value })}
                      placeholder="Image URL"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      onClick={() => handleUpdate(book._id)}
                      className="bg-green-500 text-white rounded-lg py-2 mt-2 hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="text-sm text-red-500 mt-1 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={book.Image}
                      alt={book.title}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                      className="w-32 h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-700 mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <button
                      onClick={() => {
                        setEditMode(book._id);
                        setEditedBook({
                          title: book.title,
                          author: book.author,
                          Image: book.Image,
                        });
                      }}
                      className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UpdateBooks;
