import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  description: { type: String },
  amount: { type: Number },
  createdby:{type:String}
});

export default mongoose.model("Expense", expenseSchema);
