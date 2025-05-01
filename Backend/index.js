import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Book from "./model/book.model.js";
const app = express();
dotenv.config();

app.use(cors({
    origin: "https://book-app-tazf.onrender.com"
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Mongo URI not found in environment variables");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/api/books", (req, res) => {
  const { title, Image, author } = req.body;

  const book = new Book({ title, Image, author });

  book
    .save()
    .then(() => res.status(201).json({ message: "Book created successfully" }))
    .catch((error) => {
      console.error("Error saving book:", error);
      res.status(500).json({ error: "Failed to create book" });
    });
});

app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});



app.delete('/api/books/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id); 
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, Image } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, Image },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
