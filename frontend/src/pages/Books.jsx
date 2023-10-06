import React, { useState, useEffect, useContext } from "react";
import cartContext from "../utils/cartContext";
import { useNavigate, Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { cart, setProduct } = useContext(cartContext);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBook = async () => {
      try {
        const books = await fetch("http://localhost:3000/book", {
          signal: controller.signal,
        });
        const { data } = await books.json();
        setBooks(data);
      } catch (error) {
        if (error.name == "AbortError") {
          console.log("Request canceld");
          return;
        }
        console.log(error);
      }
    };

    fetchBook();
    return () => {
      controller.abort();
    };
  }, []);

  function handleDelete(id) {
    console.log(id);
    fetch("http://localhost:3000/book", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data?.data);
        const updatedBooks = books.filter((book) => book.book_id !== id);
        setBooks(updatedBooks);
      })
      .catch((err) => alert(err?.message));
  }
  return (
    <>
      <div
        style={{
          textAlign: "end",
          width: "full",
          height: "40px",
          backgroundColor: "lightgray",
          boxShadow: "20px",
          top: "none",
        }}
      >
        {" "}
        <button
          style={{
            margin: "10px",
            paddingRight: "10px",
            paddingTop: "5px",
            backgroundColor: "red",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Cart {cart.length}
        </button>
        <Link to="/add">
          <button
            style={{
              margin: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              color: "white",
            }}
          >
            Add Books
          </button>
        </Link>
      </div>
      <div style={styles.container}>
        {books.map((book) => (
          <div className="book" key={book?.book_id} style={styles.card}>
            <img
              src={book?.image}
              alt="Book Cover"
              style={{
                paddingTop: "10px",
                objectFit: "contain",
                width: "200px",
                height: "150px",
              }}
            />
            <div style={styles.details}>
              <p style={styles.title}>{book?.title}</p>
              <p style={styles.author}>{book?.author}</p>
              <p style={styles.price}>Price:{book?.price}</p>
              <span>
                <button
                  style={{
                    height: "20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const updated = [...cart, book?.book_id];
                    setProduct(updated);
                  }}
                >
                  Add To Cart
                </button>
                <button
                  style={{
                    height: "20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    margin: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(book?.book_id)}
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
};

export default Books;
