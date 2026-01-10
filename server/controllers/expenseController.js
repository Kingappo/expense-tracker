import expenseModel from "../models/expenseModel.js";
import Budget from "../models/budgetModel.js";
import Notification from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
import { sendTemplatedEmail } from "../config/nodemail.js";

const processDateForStorage = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const localMidnight = new Date(year, month, day, 0, 0, 0, 0);
  const utcDate = new Date(localMidnight.toISOString());

  const monthName = date.toLocaleString("default", { month: "long" });
  const yearStr = date.getFullYear().toString();

  return {
    date: utcDate,
    month: monthName.toLowerCase(),
    year: yearStr,
    monthName: monthName,
  };
};

const formatExpenseResponse = (expense) => {
  if (!expense) return expense;

  const expenseObj = expense.toObject ? expense.toObject() : expense;

  const utcDate = new Date(expenseObj.date);
  const localDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    0,
    0,
    0,
    0
  );

  return {
    ...expenseObj,
    date: localDate.toISOString().split("T")[0],
    displayDate: localDate.toLocaleDateString("en-GB"),
  };
};

export const addExpense = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    const userId = req.user.id;

    if (!title || !amount || !date || !category) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const {
      date: utcDate,
      month,
      year,
      monthName,
    } = processDateForStorage(date);

    const newExpense = new expenseModel({
      user: userId,
      title,
      amount,
      date: utcDate,
      category,
      month: month,
      year: year,
      periodType: "monthly",
      type: "expense",
    });

    await newExpense.save();

    const user = await userModel.findById(userId).select("email firstName");

    const categoryBudget = await Budget.findOne({
      user: userId,
      periodType: "monthly",
      month: month,
      category: category.toLowerCase(),
    });

    if (categoryBudget) {
      const categoryExpenses = await expenseModel.aggregate([
        {
          $match: {
            user: userId,
            month: month,
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
      expense: formatExpenseResponse(newExpense),
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
      .sort({ date: -1, createdAt: -1 });

    const formattedExpenses = expenses.map((expense) =>
      formatExpenseResponse(expense)
    );

    res.json({
      success: true,
      expenses: formattedExpenses,
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

    let updateData = { title, amount, category, description };

    if (date) {
      const { date: utcDate, month, year } = processDateForStorage(date);
      updateData.date = utcDate;
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
      expense: formatExpenseResponse(updatedExpense),
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
