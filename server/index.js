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
    const result = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(result.rows[0]); // Return the newly inserted row
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while inserting the todo." });
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
