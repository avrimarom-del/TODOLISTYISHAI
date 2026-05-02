import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { todosRouter } from "./routes/todos.routes";
import { usersRouter } from "./routes/users.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { responseTimer } from "./middlewares/timer.middleware";
import { timeoutGuard } from "./middlewares/timeoutGuard.middleware";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import { connectDB } from "./db/connectDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(responseTimer);
app.use(requestLogger);
app.use(timeoutGuard);

app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
