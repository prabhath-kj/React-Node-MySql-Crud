import express from "express";
import mysql from "mysql";
import cors from "cors"

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your password",
  database: "books",
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to Database', err);
    return;
  }
  console.log('Connection established');
});

// GET all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: data });
  });
});

// GET a specific book by ID
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM books WHERE book_id=?";
  db.query(q, [id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: data });
  });
});

// POST a new book
app.post("/books", (req, res) => {
  const { values } = req.body;
  const q =
    "INSERT INTO books (title, author, price, image) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
});

// PUT (Update) a book by ID
app.put("/books/:id", (req, res) => {
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
});

// PATCH (Partial Update) a book by ID
app.patch("/books/:id", (req, res) => {
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
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM books WHERE book_id=?";

  db.query(q, [id], (err, data) => {
    if (err) {
      res.json({ error: err });
      return;
    }
    res.json({ data: "success" });
  });
});

// Handle database connection closing on application shutdown
process.on('SIGINT', () => {
  db.end((err) => {
    console.log('Database connection closed.');
    process.exit(err ? 1 : 0);
  });
});

app.listen(PORT, () => {
  console.log("Backend started");
});
