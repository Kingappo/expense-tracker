import express from "express";
import {
  setBudget,
  getBudget,
  getAllBudgets,
  deleteBudget,
} from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set/:month", authMiddleware, setBudget);
router.get("/monthly/:month", authMiddleware, getBudget);
router.get("/", authMiddleware, getAllBudgets);
router.delete("/:id", authMiddleware, deleteBudget);

export default router;
