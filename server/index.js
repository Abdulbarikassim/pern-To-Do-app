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
    res.status(201).json(newTodo.rows[0]); // Return the newly inserted row
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while inserting the todo." });
  }
});

// GET   ALL TODOS.

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
    if (getTodo.rows.length === 0) {
      return res.status(400).json({ error: "Todo item not found" });
    }
    res.json(getTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    json({ error: "An error occured while getting the item." });
  }
});
// UPDATE A TODO.

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateToDo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    if (updateToDo.rowCount === 0) {
      return res.status(400).json({ error: "Item to  update  not found." });
    }
    res.json("update the todo item.");
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE A TODO.
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToDo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 ",
      [id]
    );
    if (deleteToDo.rowCount === 0) {
      return res.status(400).json({ error: "Todo item to delete not found." });
    }
    res.json("Deleted the Todo item successfully.");
  } catch (err) {
    console.error(err.message);
  }
});
// Start the server

app.listen(port, () => {
  console.log("The server has started on port: ", port);
});
