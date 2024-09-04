import { Pool } from "pg";

const pool = new Pool({
  user: "abdulbari",
  password: "Abdulbarikassim123",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

export default pool;
