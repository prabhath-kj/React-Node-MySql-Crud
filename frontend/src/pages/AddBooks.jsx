import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const titleRef = useRef();
  const authorRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const price = priceRef.current.value;
    const image = imageRef.current.value;
    const values = [title, author, price, true, image];

    fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify({ values }), // Wrap the array in an object if needed
    })
      .then((data) => data.json())
      .then((result) => {
        alert(result?.data);
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));

    // Clear the form
    e.target.reset();
  };

  return (
    <div style={divStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
          width: "500px",
          height: "500px",
        }}
      >
        <form style={{textAlign:'center'}} onSubmit={handleSubmit}>
          <input
            type="text"
            ref={titleRef}
            style={inputStyle}
            placeholder="Title..."
          />
          <input
            type="text"
            ref={authorRef}
            style={inputStyle}
            placeholder="Author..."
          />
          <input
            type="number"
            min={0}
            ref={priceRef}
            style={inputStyle}
            placeholder="Price..."
          />
          <input
            type="text"
            ref={imageRef}
            style={inputStyle}
            placeholder="image url ..."
          />

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const divStyle = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const inputStyle = { width: "90%", height: "20px", margin: "2px" };
const buttonStyle = {
  width: "90%",
  height: "30px",
  margin: "2px",
  backgroundColor: "green",
  color: "white",
  cursor:'pointer'
};

export default AddBooks;
