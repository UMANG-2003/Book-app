import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📚 BookVerse</h2>
          <p className="text-sm text-gray-400">Your one-stop destination for books, knowledge, and updates.</p>
        </div>

        {/* Center: Email Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded w-full text-gray-300 bg-gray-800"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/books" className="hover:text-white">Books</a></li>
            <li><a href="/add-book" className="hover:text-white">Add Book</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookVerse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
