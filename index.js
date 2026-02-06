import express from "express";
import bookRouter from "./routes/book.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(loggerMiddleware);


app.use("/books", bookRouter);


app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
