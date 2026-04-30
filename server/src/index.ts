import express from "express";
import { todosRouter } from "./routes/todos.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { responseTimer } from "./middlewares/timer.middleware";
import { timeoutGuard } from "./middlewares/timeoutGuard.middleware";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB";
import { usersRouter } from "./routes/users.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

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
