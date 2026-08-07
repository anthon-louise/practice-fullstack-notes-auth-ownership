import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoute from "./modules/auth/route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
