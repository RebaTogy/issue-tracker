import dotenv from "dotenv";
dotenv.config();

import express, { type ErrorRequestHandler } from "express";
import { apiRouter } from "./routes/api.routes";
import { sequelize } from "./config/database";
import "./models";

const app = express();
const PORT = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch(console.error);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Express + TypeScript");
});

app.use("/api", apiRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Page not found", success: false });
});

const errorRequestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

app.use(errorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
