import incomeModel from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;
    if (!title || !amount || !date || !category || !description) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const userDate = new Date(date);
    const now = new Date();
    userDate.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    const income = new incomeModel({
      user: req.user.id,
      title,
      amount,
      date: userDate,
      category,
      description,
      type: "income",
    });
    await income.save();
    res.json({ success: true, message: "Income added successfully" });
  } catch (error) {
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
