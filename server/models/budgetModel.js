import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    periodType: {
      type: String,
      enum: ["monthly"],
      default: "monthly",
      required: true,
    },
    month: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
