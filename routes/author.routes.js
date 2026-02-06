import express from "express";
const router = express.Router();
import { authorsTable, booksTable } from "../src/db/index.js";

import { db } from "../src/db/connection.js";
import { eq } from "drizzle-orm";


router.get("/", async (req, res) => {
  const authors = await db.select().from(authorsTable);
  res.json(authors);
});


router.get("/:id", async (req, res) => {
  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, req.params.id));

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json(author);
});



router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });

  res.status(201).json({
    message: "Author created",
    id: result.id,
  });
});

router.get("/:id/books", async (req, res) => {
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, req.params.id));

  res.json(books);
});


export default router;