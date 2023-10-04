import db from "../config/db.config.js";

const getAllBooks = (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: data });
  });
};

const getBookById = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM books WHERE book_id=?";
  db.query(q, [id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: data });
  });
};

const createBook = (req, res) => {
  const { values } = req.body;
  console.log(values);
  const q =
    "INSERT INTO books (title, author, price, in_stock, image) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { values } = req.body;
  const q =
    "UPDATE books SET title=?, author=?, price=?, in_stock=?, image=? WHERE book_id=?";

  db.query(q, [...values, id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
};

const partialUpdateBook = (req, res) => {
  const { id } = req.params;
  const { values } = req.body;
  const q = "UPDATE books SET ? WHERE book_id=?";

  db.query(q, [values, id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM books WHERE book_id=?";

  db.query(q, [id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  partialUpdateBook,
  deleteBook,
};
