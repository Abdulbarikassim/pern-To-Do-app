import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = 8000;
//  use the middlewear.
app.use(cors());
app.use(express.json());
// ROUTES //

// CREATE A TODO.
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newToDo = await pool.query(
      "INSERT INTO todo (description) VALUE($1)",
      [description]
    );
    res.json(newToDo);
  } catch (err) {
    console.error(err.message);
  }
});

// GET A TODO.

// UPDATE A TODO.

// DELETE A TODO.

// give  a get request.
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("The server has started on port: ", port);
});
