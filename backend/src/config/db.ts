import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

pool.on("connect", () => {
  console.log("Database Connected")
})
