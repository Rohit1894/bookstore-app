import express from "express";
const router = express.Router();

import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById
} from "../controllers/book.controller.js";

// import { authMiddleware } from "../middlewares/auth.middleware.js";




router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", createBook);
router.delete("/:id", deleteBookById);

export default router;
