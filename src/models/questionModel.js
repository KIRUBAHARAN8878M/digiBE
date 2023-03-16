//Require
const mongoose = require("mongoose");

// Define Question schema and model
const questionSchema = new mongoose.Schema({
  questions: [
    {
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

//Export;
module.exports = mongoose.model("Question", questionSchema, "Question_Data");
