const  AttendedExam = require('../models/attendedExamModel');
const Exam = require('../models/examModel')

const express = require('express');
const { authenticate } = require('../middleware/authentication');
const Path = express.Router()


// Get all attended exams for a user route
Path.get("/attended-exams",authenticate,  async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.userId;
 
    const exams = await AttendedExam.find({ user: userId }).populate("exam").exec();
    res.send(exams);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
  
  // Attend exam route
  Path.post("/add-attend-exam",authenticate, async (req, res) => {
    try {
      const {  examId, answers } = req.body;
      const userId = req.user.userId;
      const exam = await Exam.findById(examId);
  
      if (!exam) {
        return res.status(404).send({ message: "Exam not found" });
      }
  
      const questionIds = exam.questions.map((question) => question._id);
      const submittedAnswers = answers.filter(
        (answer) => questionIds.includes(answer.questionId)
      );
  
      const attendedExam = new AttendedExam({
        user: userId,
        exam: examId,
        answers: submittedAnswers,
      });
  
      await attendedExam.save();
  
      res.send({ message: "Exam attended successfully", attendedExam });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  
  
  // Get single attended exam for a user route
Path.get("/attended-exams/:id",authenticate, async (req, res) => {
  try {
    const user = req.user.userId;
    const attendedExamId = req.params.id;

    const attendedExam = await AttendedExam.find({ _id: attendedExamId, user: user })
      .populate("exam")
      .exec();

    if (!attendedExam) {
      return res.status(404).send({ message: "Attended exam not found" });
    }
    res.send(attendedExam);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


  // Get questions for a single attended exam for a user route
  Path.get("/attended-exams/:id/questions", authenticate,  async (req, res) => {
    try {
      const userId = req.user.userId;
      const attendedExamId = req.params.id;
      const attendedExam = await AttendedExam.findOne({ _id: attendedExamId, user: userId }).populate("exam");
      if (!attendedExam) {
        return res.status(404).send({ message: "Attended exam not found" });
      }
      const { exam } = attendedExam;
      const questions = exam.questions.slice(0, 4);
      res.send({questions, exam});
    } catch (err) {
      res.status(500).send(err);
    }
  });

  
module.exports = Path