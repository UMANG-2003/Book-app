import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';

function Books() {
  const [data, setData] = useState(null);
  const books = async () => {
      try {
        const response = await axios.get("https://book-app-backend-ucc5.onrender.com");
        console.log(response.data);
        setData(response.data)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    useEffect(() => {
      books();
    }, []);

  return <>

    <h1 className="text-center text-3xl font-bold mt-10">Books</h1>
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10 bg-gray-800 w-[90%] mx-auto p-10 rounded-4xl'>
    {data && data.map((book,index) => (
      <div key={index} className='bg-gray-600 w-[200px] h-[280px] flex flex-col justify-center items-center gap-2 rounded-4xl p-3'>
        <img src={book.Image} alt={book.title} className="w-32 h-32 rounded-xl" />
        <h3 className='font-bold'>Title : {book.title}</h3>
        <p className='font-bold text-center'>Author : {book.author}</p>
      </div>
    ))}
    </div>
  </>
  
}

export default Books
