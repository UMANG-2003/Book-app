import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateBooks() {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedBook, setEditedBook] = useState({ title: '', author: '', Image: '' });

  const books = async () => {
    try {
      const response = await axios.get("https://book-app-backend-ucc5.onrender.com/api/books");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://book-app-backend-ucc5.onrender.com/api/books/${id}`, editedBook);
      setEditMode(null);
      books();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  useEffect(() => {
    books();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10">Update Books</h1>
      <div className='flex justify-center items-center flex-wrap gap-10 mt-10 bg-gray-800 w-[90%] mx-auto p-10 rounded-4xl'>
        {data && data.map((book, index) => (
          <div key={index} className='bg-gray-600 w-[220px] min-h-[300px] flex flex-col justify-center items-center gap-2 rounded-4xl p-3 text-white'>
            {editMode === index ? (
              <div className='flex flex-col gap-2 items-center'>
                <input
                  type="text"
                  value={editedBook.title}
                  onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                  placeholder="Title"
                  className="px-2 py-1 rounded text-black"
                />
                <input
                  type="text"
                  value={editedBook.author}
                  onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                  placeholder="Author"
                  className="px-2 py-1 rounded text-black"
                />
                <input
                  type="text"
                  value={editedBook.Image}
                  onChange={(e) => setEditedBook({ ...editedBook, Image: e.target.value })}
                  placeholder="Image URL"
                  className="px-2 py-1 rounded text-black"
                />
                <button
                  onClick={() => handleUpdate(book._id)}
                  className="bg-green-500 px-3 py-1 rounded text-white mt-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="text-red-400 mt-1 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <img src={book.Image} alt={book.title} className="w-32 h-32 rounded-xl" />
                <h3 className='font-bold text-center'>Title : {book.title}</h3>
                <p className='font-bold text-center'>Author : {book.author}</p>
                <button
                  onClick={() => {
                    setEditMode(index);
                    setEditedBook({ title: book.title, author: book.author, Image: book.Image });
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded mt-2 text-black"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateBooks;
