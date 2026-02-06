import express, {type ErrorRequestHandler} from 'express';
import dotenv from "dotenv"
import { apiRouter } from './routes/api.routes';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.get('/', (_req, res) => {
  res.send('Hello from Express + TypeScript');
});

app.use("/api", apiRouter)

app.use((_req, res) => {
  res.status(404).json({message: "Page Not found", success: false});
});

const errorRequestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack)
    res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
}
app.use(errorRequestHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
