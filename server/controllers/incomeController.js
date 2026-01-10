import incomeModel from "../models/incomeModel.js";

const processDateForStorage = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const localMidnight = new Date(year, month, day, 0, 0, 0, 0);
  const utcDate = new Date(localMidnight.toISOString());

  return utcDate;
};

const formatIncomeResponse = (income) => {
  if (!income) return income;

  const incomeObj = income.toObject ? income.toObject() : income;

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
    date: localDate.toISOString().split("T")[0],
    displayDate: localDate.toLocaleDateString("en-GB"),
  };
};

export const addIncome = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    if (!title || !amount || !date || !category) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const utcDate = processDateForStorage(date);

    const income = new incomeModel({
      user: req.user.id,
      title,
      amount,
      date: utcDate,
      category,
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
