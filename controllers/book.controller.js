import { books } from "../models/book.model.js";


export const getAllBooks = (req, res) => {
  res.json(books);
};

export const getBookById = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};


export const createBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

export const deleteBookById = (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook);
};
