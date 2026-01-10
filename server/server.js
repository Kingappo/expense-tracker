import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
connectDB();

const allowedorigins = ["http://localhost:5173"];
// const allowedorigins = ["https://expense-tracker-uupm.onrender.com"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedorigins, credentials: true }));
app.get("/", (req, res) => {
  res.send("Expense Management API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/alert", notificationRoutes);
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
