const mongoose = require("mongoose");
const Question = require("../models/questionModel");

const examSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      text: String,
      choices: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Exam", examSchema, "Exam_Data");
