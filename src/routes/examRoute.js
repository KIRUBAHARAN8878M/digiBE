const Exam = require("../models/examModel");
const express = require("express");
const { authenticate } = require("../middleware/authentication");
const Path = express.Router();

Path.post("/create-exams", authenticate, (req, res) => {
  try {
    const { title, questions } = req.body;
    let exam = new Exam({ title, questions });
    exam.save().then((data) => {
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = Path;
