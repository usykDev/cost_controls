import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

// Connection { Pool } allows to reuse existing connections instead of creating new ones for each request, resulting in faster response times and reduced overhead.

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.connect((err) => {
  if (err) {
    console.error("connection err", err.stack);
  } else {
    console.log("postgreSQL connected");
  }
});

export default pool;
