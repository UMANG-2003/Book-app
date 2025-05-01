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
      const response = await fetch("https://book-app-backend-ucc5.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add book!");
    }
    setFormData({
      title: "",
      Image: "",
      author: "",
    });
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold mt-10">Add Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white w-[58%] max-md:w-[90%] h-fit text-black mx-auto my-10 p-10 max-md:px-4 max-md:py-10  rounded-4xl">
        <div className="flex justify-between items-center w-[90%] mx-auto">
        <label htmlFor="title" className="text-xl font-bold">Title : </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="add title"
          className="bg-gray-300 px-4 py-2 rounded-4xl max-md:w-[70%] w-[80%]"
          required
        />
        </div>

        <div className="flex justify-between items-center w-[90%]  mx-auto">
        <label htmlFor="Image" className="text-xl font-bold">Image : </label>
        <input
          type="text"
          name="Image"
          value={formData.Image}
          onChange={handleChange}
          placeholder="add image"
          className="bg-gray-300 px-4 py-2 rounded-4xl max-md:w-[70%] w-[80%]"
          required
        />
        </div>

        <div className="flex justify-between items-center w-[90%]  mx-auto">
        <label htmlFor="author" className="text-xl font-bold">Author : </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="add author"
          className="bg-gray-300 px-4 py-2 rounded-4xl max-md:w-[70%] w-[80%]"
          required 
        />
        </div>

        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer ">Submit</button>

      </form>
    </div>
  );
}

export default AddBook;
