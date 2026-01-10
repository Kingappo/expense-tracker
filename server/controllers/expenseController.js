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

    // Parse the date string into a Date object
    const expenseDate = new Date(date);

    // Get the date-only parts (local timezone)
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth();
    const day = expenseDate.getDate();

    // Create a date with current time in local timezone
    const now = new Date();
    const finalDate = new Date(
      year,
      month,
      day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    // Convert to UTC for storage
    const utcDate = new Date(
      Date.UTC(
        finalDate.getFullYear(),
        finalDate.getMonth(),
        finalDate.getDate(),
        finalDate.getHours(),
        finalDate.getMinutes(),
        finalDate.getSeconds()
      )
    );

    const monthName = utcDate.toLocaleString("default", { month: "long" });
    const yearStr = utcDate.getUTCFullYear().toString();

    const newExpense = new expenseModel({
      user: userId,
      title,
      amount,
      date: utcDate, // Store as UTC
      category,
      description,
      month: monthName.toLowerCase(), // Store as lowercase for consistency
      year: yearStr,
      periodType: "monthly",
      type: "expense",
    });

    await newExpense.save();

    const user = await userModel.findById(userId).select("email firstName");

    const categoryBudget = await Budget.findOne({
      user: userId,
      periodType: "monthly",
      month: monthName.toLowerCase(), // Use lowercase here too
      category: category.toLowerCase(),
    });

    if (categoryBudget) {
      const categoryExpenses = await expenseModel.aggregate([
        {
          $match: {
            user: userId,
            month: monthName.toLowerCase(), // Use lowercase here
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
          message: `You have exceeded your ${category} budget for ${monthName}. Total spent: ₦${totalSpent} of ₦${categoryBudget.amount} budget.`,
          type: "warning",
        });

        if (user && user.email) {
          await sendTemplatedEmail("budgetAlert", user.email, {
            firstName: user.firstName || "User",
            category,
            month: monthName,
            remaining,
            totalSpent,
            budgetAmount: categoryBudget.amount,
            type: "exceeded",
          });
        }
      } else if (remaining <= categoryBudget.amount * 0.2) {
        await Notification.create({
          userId,
          title: "Budget Alert",
          message: `Only ₦${remaining} remaining for your ${category} budget in ${monthName}.`,
          type: "info",
        });

        if (user && user.email) {
          await sendTemplatedEmail("budgetAlert", user.email, {
            firstName: user.firstName || "User",
            category,
            month: monthName,
            remaining,
            totalSpent,
            budgetAmount: categoryBudget.amount,
            type: "warning",
          });
        }
      }
    }

    res.json({
      success: true,
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Add Expense Error:", error.message);
    console.error("Error stack:", error.stack);
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

    // Sort by date in descending order (most recent first)
    const expenses = await expenseModel
      .find({ user: userId })
      .sort({ date: -1, createdAt: -1 }); // First by date, then by creation time

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
    const { title, amount, date, category, description } = req.body;

    // If date is being updated, we need to recalculate month/year
    let updateData = { title, amount, category, description };

    if (date) {
      const expenseDate = new Date(date);
      const now = new Date();
      expenseDate.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );

      const month = expenseDate.toLocaleString("default", { month: "long" });
      const year = expenseDate.getFullYear().toString();

      updateData.date = expenseDate;
      updateData.month = month;
      updateData.year = year;
    }

    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
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
