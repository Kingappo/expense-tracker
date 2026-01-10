// import incomeModel from "../models/incomeModel.js";

// export const addIncome = async (req, res) => {
//   try {
//     const { title, amount, date, category, description } = req.body;
//     if (!title || !amount || !date || !category || !description) {
//       return res.json({ success: false, message: "All fields are required" });
//     }

//     // Parse the date
//     const incomeDate = new Date(date);

//     // Get date parts (local timezone)
//     const year = incomeDate.getFullYear();
//     const month = incomeDate.getMonth();
//     const day = incomeDate.getDate();

//     // Create with current time
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

//     // Convert to UTC
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

//     const income = new incomeModel({
//       user: req.user.id,
//       title,
//       amount,
//       date: utcDate,
//       category,
//       description,
//       type: "income",
//     });

//     await income.save();
//     res.json({ success: true, message: "Income added successfully", income });
//   } catch (error) {
//     console.error("Add Income Error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getIncomes = async (req, res) => {
//   try {
//     const incomes = await incomeModel
//       .find({ user: req.user.id })
//       .sort({ date: -1 });
//     res.json({ success: true, incomes });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// export const updateIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, amount, date, category, description } = req.body;

//     const income = await incomeModel.findOneAndUpdate(
//       { _id: id, user: req.user.id },
//       { title, amount, date, category, description },
//       { new: true }
//     );
//     if (!income) {
//       return res.json({
//         success: false,
//         message: "Income not found or not authorized",
//       });
//     }
//     res.json({ success: true, message: "Income updated successfully", income });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// export const deleteIncome = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const income = await incomeModel.findOneAndDelete({
//       _id: id,
//       user: req.user.id,
//     });

//     if (!income) {
//       return res.json({
//         success: false,
//         message: "Income not found or not authorized",
//       });
//     }
//     res.json({ success: true, message: "Income deleted successfully" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

import incomeModel from "../models/incomeModel.js";

// // Helper function to convert date to UTC
const processDateForStorage = (dateString) => {
  const date = new Date(dateString);

  // Use the date as-is but ensure it's treated as local time
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Create date at midnight in local time, then convert to UTC
  const localMidnight = new Date(year, month, day, 0, 0, 0, 0);
  const utcDate = new Date(localMidnight.toISOString());

  return utcDate;
};

// // Helper function to format response dates
const formatIncomeResponse = (income) => {
  if (!income) return income;

  const incomeObj = income.toObject ? income.toObject() : income;

  // Convert UTC date back to local date string
  const utcDate = new Date(incomeObj.date);
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
    ...incomeObj,
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

//     return utcDate;
//   } catch (error) {
//     console.error("processDateForStorage error:", error);
//     // Fallback: use current date at midnight UTC
//     const now = new Date();
//     return new Date(
//       Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
//     );
//   }
// };

// // Update the formatIncomeResponse function:
// const formatIncomeResponse = (income) => {
//   if (!income) return income;

//   const incomeObj = income.toObject ? income.toObject() : income;

//   // Convert UTC date back to YYYY-MM-DD format
//   const utcDate = new Date(incomeObj.date);

//   // Get UTC date components
//   const year = utcDate.getUTCFullYear();
//   const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
//   const day = String(utcDate.getUTCDate()).padStart(2, "0");

//   // Format as YYYY-MM-DD for frontend
//   const dateString = `${year}-${month}-${day}`;

//   // Also create a Date object for local display
//   const localDate = new Date(year, utcDate.getUTCMonth(), day);

//   return {
//     ...incomeObj,
//     date: dateString, // Send as YYYY-MM-DD string
//     displayDate: localDate.toLocaleDateString("en-GB"), // DD/MM/YYYY format
//   };
// };

export const addIncome = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;
    if (!title || !amount || !date || !category || !description) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const utcDate = processDateForStorage(date);

    const income = new incomeModel({
      user: req.user.id,
      title,
      amount,
      date: utcDate,
      category,
      description,
      type: "income",
    });

    await income.save();

    res.json({
      success: true,
      message: "Income added successfully",
      income: formatIncomeResponse(income),
    });
  } catch (error) {
    console.error("Add Income Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await incomeModel
      .find({ user: req.user.id })
      .sort({ date: -1 });

    // Format all incomes for response
    const formattedIncomes = incomes.map((income) =>
      formatIncomeResponse(income)
    );

    res.json({
      success: true,
      incomes: formattedIncomes,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;

    let updateData = { title, amount, category, description };

    if (date) {
      updateData.date = processDateForStorage(date);
    }

    const income = await incomeModel.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updateData,
      { new: true }
    );

    if (!income) {
      return res.json({
        success: false,
        message: "Income not found or not authorized",
      });
    }

    res.json({
      success: true,
      message: "Income updated successfully",
      income: formatIncomeResponse(income),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await incomeModel.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!income) {
      return res.json({
        success: false,
        message: "Income not found or not authorized",
      });
    }

    res.json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
