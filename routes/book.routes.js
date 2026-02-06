import express from "express";

import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById
} from "../controllers/book.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", authMiddleware, createBook);
router.delete("/:id", authMiddleware, deleteBookById);

export default router;
