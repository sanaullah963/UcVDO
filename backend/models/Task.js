const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  link: { type: String},
  details: { type: String },
  extraFields: [
    {
      what: String,
      value: String,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Recorded", "Edited", "Completed"],
    default: "Pending",
  },
  completedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
