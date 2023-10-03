import express from "express";
import booksRoutes from "./routes/booksRoutes.js";
import db from "./config/db.config.js";
import cors from "cors";
import morgan from "morgan"

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(morgan("short"))
app.use(cors());

app.use("/book", booksRoutes);

// Handle database connection closing on application shutdown
process.on("SIGINT", () => {
  db.end((err) => {
    console.log("Database connection closed.");
    process.exit(err ? 1 : 0);
  });
});

app.listen(PORT, () => {
  console.log("Backend started");
});
