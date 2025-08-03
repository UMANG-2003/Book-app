import React, { useState } from "react";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    Image: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://book-app-backend-ucc5.onrender.com/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add book!");
    }

    setFormData({ title: "", Image: "", author: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Add a New Book</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-6"
      >
        {["title", "Image", "author"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-gray-700 font-semibold capitalize">
              {field}:
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required
              className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
