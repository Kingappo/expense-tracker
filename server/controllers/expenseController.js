// import expenseModel from "../models/expenseModel.js";
// import Budget from "../models/budgetModel.js";
// import Notification from "../models/notificationModel.js";
// import userModel from "../models/userModel.js";
// import { sendTemplatedEmail } from "../config/nodemail.js";

// export const addExpense = async (req, res) => {
//   try {
//     const { title, amount, date, category, description } = req.body;
//     const userId = req.user.id;

//     if (!title || !amount || !date || !category || !description) {
//       return res.json({
//         success: false,
//         message: "Please provide all required fields",
//       });
//     }

//     // Parse the date string into a Date object
//     const expenseDate = new Date(date);

//     // Get the date-only parts (local timezone)
//     const year = expenseDate.getFullYear();
//     const month = expenseDate.getMonth();
//     const day = expenseDate.getDate();

//     // Create a date with current time in local timezone
//     const now = new Date();
//     const finalDate = new Date(
//       year,
//       month,
//       day,
//       now.getHours(),
//       now.getMinutes(),
//       now.getSeconds(),
//       now.getMilliseconds()
//     );

//     // Convert to UTC for storage
//     const utcDate = new Date(
//       Date.UTC(
//         finalDate.getFullYear(),
//         finalDate.getMonth(),
//         finalDate.getDate(),
//         finalDate.getHours(),
//         finalDate.getMinutes(),
//         finalDate.getSeconds()
//       )
//     );

//     const monthName = utcDate.toLocaleString("default", { month: "long" });
//     const yearStr = utcDate.getUTCFullYear().toString();

//     const newExpense = new expenseModel({
//       user: userId,
//       title,
//       amount,
//       date: utcDate, // Store as UTC
//       category,
//       description,
//       month: monthName.toLowerCase(), // Store as lowercase for consistency
//       year: yearStr,
//       periodType: "monthly",
//       type: "expense",
//     });

//     await newExpense.save();

//     const user = await userModel.findById(userId).select("email firstName");

//     const categoryBudget = await Budget.findOne({
//       user: userId,
//       periodType: "monthly",
//       month: monthName.toLowerCase(), // Use lowercase here too
//       category: category.toLowerCase(),
//     });

//     if (categoryBudget) {
//       const categoryExpenses = await expenseModel.aggregate([
//         {
//           $match: {
//             user: userId,
//             month: monthName.toLowerCase(), // Use lowercase here
//             category: category.toLowerCase(),
//           },
//         },
//         { $group: { _id: null, total: { $sum: "$amount" } } },
//       ]);

//       const totalSpent = categoryExpenses[0]?.total || 0;
//       const remaining = categoryBudget.amount - totalSpent;

//       if (remaining <= 0) {
//         await Notification.create({
//           userId,
//           title: "Budget Exceeded!",
//           message: `You have exceeded your ${category} budget for ${monthName}. Total spent: ₦${totalSpent} of ₦${categoryBudget.amount} budget.`,
//           type: "warning",
//         });

//         if (user && user.email) {
//           await sendTemplatedEmail("budgetAlert", user.email, {
//             firstName: user.firstName || "User",
//             category,
//             month: monthName,
//             remaining,
//             totalSpent,
//             budgetAmount: categoryBudget.amount,
//             type: "exceeded",
//           });
//         }
//       } else if (remaining <= categoryBudget.amount * 0.2) {
//         await Notification.create({
//           userId,
//           title: "Budget Alert",
//           message: `Only ₦${remaining} remaining for your ${category} budget in ${monthName}.`,
//           type: "info",
//         });

//         if (user && user.email) {
//           await sendTemplatedEmail("budgetAlert", user.email, {
//             firstName: user.firstName || "User",
//             category,
//             month: monthName,
//             remaining,
//             totalSpent,
//             budgetAmount: categoryBudget.amount,
//             type: "warning",
//           });
//         }
//       }
//     }

//     res.json({
//       success: true,
//       message: "Expense added successfully",
//       expense: newExpense,
//     });
//   } catch (error) {
//     console.error("Add Expense Error:", error.message);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({
//       success: false,
//       message: "Server error while adding expense",
//       error: error.message,
//     });
//   }
// };

// export const getExpenses = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Sort by date in descending order (most recent first)
//     const expenses = await expenseModel
//       .find({ user: userId })
//       .sort({ date: -1, createdAt: -1 }); // First by date, then by creation time

//     res.json({
//       success: true,
//       expenses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching expenses",
//       error: error.message,
//     });
//   }
// };

// export const updateExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const { title, amount, date, category, description } = req.body;

//     // If date is being updated, we need to recalculate month/year
//     let updateData = { title, amount, category, description };

//     if (date) {
//       const expenseDate = new Date(date);
//       const now = new Date();
//       expenseDate.setHours(
//         now.getHours(),
//         now.getMinutes(),
//         now.getSeconds(),
//         now.getMilliseconds()
//       );

//       const month = expenseDate.toLocaleString("default", { month: "long" });
//       const year = expenseDate.getFullYear().toString();

//       updateData.date = expenseDate;
//       updateData.month = month;
//       updateData.year = year;
//     }

//     const updatedExpense = await expenseModel.findOneAndUpdate(
//       { _id: id, user: userId },
//       updateData,
//       { new: true }
//     );

//     if (!updatedExpense) {
//       return res.json({
//         success: false,
//         message: "Expense not found or unauthorized",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Expense updated successfully",
//       expense: updatedExpense,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating expense",
//       error: error.message,
//     });
//   }
// };

// export const deleteExpense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const deletedExpense = await expenseModel.findOneAndDelete({
//       _id: id,
//       user: userId,
//     });

//     if (!deletedExpense) {
//       return res.json({
//         success: false,
//         message: "Expense not found or unauthorized",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Expense deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting expense",
//       error: error.message,
//     });
//   }
// };

import expenseModel from "../models/expenseModel.js";
import Budget from "../models/budgetModel.js";
import Notification from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
import { sendTemplatedEmail } from "../config/nodemail.js";

// Helper function to convert date to UTC and format month/year
const processDateForStorage = (dateString) => {
  const date = new Date(dateString);

  // Use the date as-is but ensure it's treated as local time
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Create date at midnight in local time, then convert to UTC
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

// Helper function to format response dates
const formatExpenseResponse = (expense) => {
  if (!expense) return expense;

  const expenseObj = expense.toObject ? expense.toObject() : expense;

  // Convert UTC date back to local date string
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
    date: localDate.toISOString().split("T")[0], // Send as YYYY-MM-DD
    displayDate: localDate.toLocaleDateString("en-GB"), // DD/MM/YYYY format
  };
};

// Update the processDateForStorage function:
// const processDateForStorage = (dateString) => {
//   try {
//     // Parse the date string (should be YYYY-MM-DD from frontend)
//     const date = new Date(dateString);

//     // Ensure we're using the date as local time
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const day = date.getDate();

//     // Create UTC date at midnight (00:00:00 UTC)
//     const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

//     const monthName = date.toLocaleString("default", { month: "long" });
//     const yearStr = date.getFullYear().toString();

//     return {
//       date: utcDate,
//       month: monthName.toLowerCase(),
//       year: yearStr,
//       monthName: monthName,
//     };
//   } catch (error) {
//     console.error("processDateForStorage error:", error);
//     // Fallback: use current date
//     const now = new Date();
//     const utcDate = new Date(
//       Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
//     );
//     const monthName = now.toLocaleString("default", { month: "long" });

//     return {
//       date: utcDate,
//       month: monthName.toLowerCase(),
//       year: now.getFullYear().toString(),
//       monthName: monthName,
//     };
//   }
// };

// // Update the formatExpenseResponse function:
// const formatExpenseResponse = (expense) => {
//   if (!expense) return expense;

//   const expenseObj = expense.toObject ? expense.toObject() : expense;

//   // Convert UTC date back to YYYY-MM-DD format
//   const utcDate = new Date(expenseObj.date);

//   // Get UTC date components
//   const year = utcDate.getUTCFullYear();
//   const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
//   const day = String(utcDate.getUTCDate()).padStart(2, "0");

//   // Format as YYYY-MM-DD for frontend
//   const dateString = `${year}-${month}-${day}`;

//   // Also create a Date object for local display
//   const localDate = new Date(year, utcDate.getUTCMonth(), day);

//   return {
//     ...expenseObj,
//     date: dateString, // Send as YYYY-MM-DD string
//     displayDate: localDate.toLocaleDateString("en-GB"), // DD/MM/YYYY format
//   };
// };

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
      date: utcDate, // Store as UTC
      category,
      description,
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

    const expenses = await expenseModel
      .find({ user: userId })
      .sort({ date: -1, createdAt: -1 });

    // Format all expenses for response
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
