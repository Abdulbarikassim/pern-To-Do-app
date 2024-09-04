import express from "express";
import cors from "cors";
import pool from "./db";

const app = express();
const port = 8000;
//  use the middlewear.
app.use(cors());
app.use(express.json());
// give  a get request.
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("The server has started on port: ", port);
});
