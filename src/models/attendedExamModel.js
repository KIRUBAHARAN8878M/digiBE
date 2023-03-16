//Require
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Exam = require('../models/examModel')
const Question = require('../models/questionModel')

// Define AttendedExam schema and model
const attendedExamSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        choiceIndex: Number,
      },
    ],
  });
  //Export;
module.exports = mongoose.model('AttendedExam',attendedExamSchema,"AttendedExam_Data");
