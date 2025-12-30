import Budget from "../models/budgetModel.js";
import expenseModel from "../models/expenseModel.js";
import Notification from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
import { sendTemplatedEmail } from "../config/nodemail.js";

export const setBudget = async (req, res) => {
  try {
    const { month } = req.params;
    const { amount, title, category } = req.body;
    const userId = req.user.id;

    if (!amount || !month || !title || !category) {
      return res.json({
        success: false,
        message: "Please provide title, category, month and budget amount",
      });
    }

    const user = await userModel.findById(userId).select("email firstName");

    const existingBudget = await Budget.findOne({
      user: userId,
      periodType: "monthly",
      month: month.toLowerCase(),
      category: category.toLowerCase(),
    });

    if (existingBudget) {
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

      existingBudget.amount = amount;
      existingBudget.title = title;
      existingBudget.updatedAt = Date.now();

      await existingBudget.save();

      if (amount < totalSpent) {
        await Notification.create({
          userId,
          title: "Budget Set Below Current Spending!",
          message: `You set your ${category} budget to ₦${amount}, but you've already spent ₦${totalSpent} this month.`,
          type: "warning",
        });

        await sendTemplatedEmail("budgetAlert", user.email, {
          firstName: user.firstName || "User",
          category,
          month,
          remaining: amount - totalSpent,
          totalSpent,
          budgetAmount: amount,
          type: "exceeded",
        });
      } else {
        await Notification.create({
          userId,
          title: "Budget Updated",
          message: `Your ${category} budget for ${month} has been updated to ₦${amount}.`,
          type: "info",
        });
      }

      return res.json({
        success: true,
        message: `${category} budget updated successfully`,
        budget: existingBudget,
      });
    }

    const newBudget = new Budget({
      user: userId,
      periodType: "monthly",
      month: month.toLowerCase(),
      category: category.toLowerCase(),
      title,
      amount,
    });

    await newBudget.save();

    await Notification.create({
      userId,
      title: "Budget Created",
      message: `You created a ₦${amount} budget for ${category} in ${month}.`,
      type: "success",
    });

    await sendTemplatedEmail("budgetCreated", user.email, {
      firstName: user.firstName || "User",
      category,
      month,
      amount,
      action: "created",
    });

    return res.json({
      success: true,
      message: `${category} budget created successfully`,
      budget: newBudget,
    });
  } catch (error) {
    console.error("Budget error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while setting category budget",
      error: error.message,
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const { month, category } = req.params;
    const userId = req.user.id;

    const budget = await Budget.findOne({
      user: userId,
      periodType: "monthly",
      month: month.toLowerCase(),
      category: category.toLowerCase(),
    });

    if (!budget) {
      return res.json({
        success: false,
        message: `No budget found for ${category} in ${month}`,
      });
    }

    return res.json({
      success: true,
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching budget",
      error: error.message,
    });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user.id;

    const budgets = await Budget.find({
      user: userId,
      periodType: "monthly",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching budgets",
      error: error.message,
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedBudget = await Budget.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedBudget) {
      return res.json({
        success: false,
        message: "Budget not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting budget",
      error: error.message,
    });
  }
};
