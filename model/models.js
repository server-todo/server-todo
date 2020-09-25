const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

todoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
todoSchema.set("toJSON", {
  virtuals: true,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
