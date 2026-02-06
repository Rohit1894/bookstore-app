import { db } from "../src/db/connection.js";
import { booksTable , authorsTable } from "../src/db/index.js";


import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";




export const getAllBooks = async (req, res) => {
  const { search } = req.query;

  if (search) {
    const books = await db.execute(sql`
      SELECT *
      FROM books
      WHERE to_tsvector('english', title)
      @@ plainto_tsquery('english', ${search})
    `);

    return res.json(books.rows);
  }

  const books = await db.select().from(booksTable);
  return res.json(books);
};



export const getBookById = async (req, res) => {
  const { id } = req.params;

  const [book] = await db
    .select({
      bookId: booksTable.id,
      title: booksTable.title,
      description: booksTable.description,
      authorId: authorsTable.id,
      authorFirstName: authorsTable.firstName,
      authorLastName: authorsTable.lastName,
      authorEmail: authorsTable.email,
    })
    .from(booksTable)
    .leftJoin(
      authorsTable,
      eq(booksTable.authorId, authorsTable.id)
    )
    .where(eq(booksTable.id, id))
    .limit(1);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
};




export const createBook = async (req, res) => {
  const { title, authorId, description } = req.body;

if (!title?.trim() || !authorId) {
  return res.status(400).json({
    message: "Title and authorId are required"
  });
}


  const [result] = await db
    .insert(booksTable)
    .values({ title, authorId, description })
    .returning({ id: booksTable.id });

  return res.status(201).json({
    message: "Book created successfully",
    id: result.id,
  });
};

export const deleteBookById = async (req, res) => {
  const { id } = req.params;

  const deleted = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning({ id: booksTable.id });

  if (deleted.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json({ message: "Book deleted successfully" });
};
