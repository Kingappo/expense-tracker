import incomeModel from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;
    if (!title || !amount || !date || !category || !description) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Parse the date
    const incomeDate = new Date(date);

    // Get date parts (local timezone)
    const year = incomeDate.getFullYear();
    const month = incomeDate.getMonth();
    const day = incomeDate.getDate();

    // Create with current time
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

    // Convert to UTC
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
    res.json({ success: true, message: "Income added successfully", income });
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
    res.json({ success: true, incomes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;

    const income = await incomeModel.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, amount, date, category, description },
      { new: true }
    );
    if (!income) {
      return res.json({
        success: false,
        message: "Income not found or not authorized",
      });
    }
    res.json({ success: true, message: "Income updated successfully", income });
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
    res.json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
