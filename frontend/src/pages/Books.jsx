import React, { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const books = await fetch("http://localhost:3000/book");
      const { data } = await books.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      {books.map((book) => (
        <div className="book" key={book?.book_id} style={styles.card}>
          <img src={book?.image} alt="Book Cover" style={styles.image} />
          <div style={styles.details}>
            <p style={styles.title}>{book?.title}</p>
            <p style={styles.author}>{book?.author}</p>
            <p style={styles.price}>{book?.price}</p>
            <div>
              <button style={styles.button}>Update</button>
            </div>
            <div>
              <button style={styles.button}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "250px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "400px",
  },
  image: {
    width: "100px",
  },
  details: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  author: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Books;
