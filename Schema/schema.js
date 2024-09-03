import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
 
  todoName: {
    type: String,
    trim: true,
    require: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const todoModel = mongoose.model("todo", mySchema);

export default todoModel;
