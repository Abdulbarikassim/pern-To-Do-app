import express, { json } from "express";
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
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]); // Return the newly inserted row
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while inserting the todo." });
  }
});

// GET A TODO ALL TODOS.

app.get("/todo", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occured while adding the todo." });
  }
});

// GET A TODO.

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [
      id,
    ]);
    res.json(getTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    json({ error: "An error occured while getting the item." });
  }
});
// UPDATE A TODO.

// DELETE A TODO.

// give  a get request.
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("The server has started on port: ", port);
});
