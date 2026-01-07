import expenseModel from "../models/expenseModel.js";
import Budget from "../models/budgetModel.js";
import Notification from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
import { sendTemplatedEmail } from "../config/nodemail.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;
    const userId = req.user.id;

    if (!title || !amount || !date || !category || !description) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const expenseDate = new Date(date);
    const month = expenseDate.toLocaleString("default", { month: "long" });
    const year = expenseDate.getFullYear().toString();

    const newExpense = new expenseModel({
      user: userId,
      title,
      amount,
      date,
      category,
      description,
      month,
      year,
      periodType: "monthly",
      type: "expense",
    });
    await newExpense.save();
    const user = await userModel.findById(userId).select("email firstName");

    const categoryBudget = await Budget.findOne({
      user: userId,
      periodType: "monthly",
      month: month.toLowerCase(),
      category: category.toLowerCase(),
    });

    if (categoryBudget) {
      const categoryExpenses = await expenseModel.aggregate([
        {
          $match: {
            user: userId,
            month: month.toLowerCase(),
            category: category.toLowerCase(),
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const totalSpent = categoryExpenses[0]?.total || 0;
      const remaining = categoryBudget.amount - totalSpent;

      if (remaining <= 0) {
        await Notification.create({
          userId,
          title: "Budget Exceeded!",
          message: `You have exceeded your ${category} budget for ${month}. Total spent: ₦${totalSpent} of ₦${categoryBudget.amount} budget.`,
          type: "warning",
        });

        await sendTemplatedEmail("budgetAlert", user.email, {
          firstName: user.firstName || "User",
          category,
          month,
          remaining,
          totalSpent,
          budgetAmount: categoryBudget.amount,
          type: "exceeded",
        });
      } else if (remaining <= categoryBudget.amount * 0.2) {
        await Notification.create({
          userId,
          title: "Budget Alert",
          message: `Only ₦${remaining} remaining for your ${category} budget in ${month}.`,
          type: "info",
        });

        await sendTemplatedEmail("budgetAlert", user.email, {
          firstName: user.firstName || "User",
          category,
          month,
          remaining,
          totalSpent,
          budgetAmount: categoryBudget.amount,
          type: "warning",
        });
      }
    }

    res.json({
      success: true,
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Add Expense Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while adding expense",
      error: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await expenseModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching expenses",
      error: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, user: userId },
      updatedData,
      { new: true }
    );

    if (!updatedExpense) {
      return res.json({
        success: false,
        message: "Expense not found or unauthorized",
      });
    }

    res.json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating expense",
      error: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedExpense = await expenseModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedExpense) {
      return res.json({
        success: false,
        message: "Expense not found or unauthorized",
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting expense",
      error: error.message,
    });
  }
};
