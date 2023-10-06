import express from "express";
import booksController from "../controller/booksController.js";

const router = express.Router();

// GET all books
router.get("/", booksController.getAllBooks);

// GET a specific book by ID
router.get("/:id", booksController.getBookById);

// POST a new book
router.post("/", booksController.createBook);

// PUT (Update) a book by ID
router.put("/:id", booksController.updateBook);

// PATCH (Partial Update) a book by ID
router.patch("/:id", booksController.partialUpdateBook);

// DELETE a book by ID
router.delete("/", booksController.deleteBook);

export default router;
