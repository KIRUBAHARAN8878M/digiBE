const Question = require("../models/questionModel");
const express = require("express");
const { authenticate } = require("../middleware/authentication");
const Path = express.Router();
// To create questions
Path.post("/create-questions", (req, res) => {
  try {
    const { questions } = req.body;
    let ques = new Question({ questions });
    ques.save().then((data) => {
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// List all questions route
Path.get("/questions", authenticate, (req, res) => {
  try {
    Question.find().then((data) => {
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// List single question route
Path.get("/questions/:id", authenticate, async (req, res) => {
  try {
    const questionsData = await Question.findOne();
    const question = questionsData.questions.find(
      (q) => q._id == req.params.id
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = Path;
