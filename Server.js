// Import required modules
require('./src/connection/connection');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require('./src/routes/userRoute');
const Question = require('./src/routes/questionRoute');
const Exam = require('./src/routes/examRoute');
const AttendedExam = require('./src/routes/attendedExamRoute');


// Create express app
const app = express();

// Set up bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin:'*'}))

// // Connect to MongoDB using Mongoose
// mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });
// const db = mongoose.connection;

// // Define User schema and model
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });
// const User = mongoose.model("User", userSchema);

// // Define Question schema and model
// const questionSchema = new mongoose.Schema({
//   text: String,
//   choices: [
//     {
//       text: String,
//       isCorrect: Boolean,
//     },
//   ],
// });
// const Question = mongoose.model("Question", questionSchema);

// // Define Exam schema and model
// const examSchema = new mongoose.Schema({
//   title: String,
//   questions: [questionSchema],
// });
// const Exam = mongoose.model("Exam", examSchema);

// // Define AttendedExam schema and model
// const attendedExamSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
//   answers: [
//     {
//       questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
//       choiceIndex: Number,
//     },
//   ],
// });
// const AttendedExam = mongoose.model("AttendedExam", attendedExamSchema);

// Define JWT secret
// const JWT_SECRET = "secret";

// // Register route
// app.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   const user = new User({ username, password });
//   user.save((err, user) => {
//     if (err) return res.status(500).send(err);
//     res.send({ message: "User registered successfully" });
//   });
// });

// // Login route
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ username, password }, (err, user) => {
//     if (err) return res.status(500).send(err);
//     if (!user) return res.status(401).send({ message: "Invalid credentials" });
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//     res.send({ token });
//   });
// });

// // Get all users route (authenticated by jwt token)
// app.get("/users", authenticateToken, (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) return res.status(500).send(err);
//     res.send(users);
//   });
// });

// // List all questions route
// app.get("/questions", (req, res) => {
//   Question.find({}, (err, questions) => {
//     if (err) return res.status(500).send(err);
//     res.send(questions);
//   });
// });

// // List single question route
// app.get("/questions/:id", (req, res) => {
//   Question.findById(req.params.id, (err, question) => {
//     if (err) return res.status(500).send(err);
//     res.send(question);
//   });
// });

// // Create exam route
// app.post("/exams", (req, res) => {
//   const { title, questions } = req.body;
//   const exam = new Exam({ title, questions });
//   exam.save((err, exam) => {
//     if (err) return res.status(500).send(err);
//     res.send({ message: "Exam created successfully", exam });
//   });
// });

// // Get all attended exams for a user route
// app.get("/attended-exams", authenticateToken, (req, res) => {
//   const userId = req.user.userId;
//   AttendedExam.find({ user: userId })
//     .populate("exam")
//     .exec((err, exams) => {
//       if (err) return res.status(500).send(err);
//       res.send(exams);
//     });
// });

// // Attend exam route
// app.post("/attend-exam", authenticateToken, (req, res) => {
//   const { examId, answers } = req.body;
//   const userId = req.user.userId;
//   const attendedExam = new AttendedExam({
//     user: userId,
//     exam: examId,
//     answers,
//   });
//   attendedExam.save((err, attendedExam) => {
//     if (err) return res.status(500).send(err);
//     res.send({ message: "Exam attended successfully", attendedExam });
//   });
// });

// // Get single attended exam for a user route
// app.get("/attended-exams/:id", authenticateToken, (req, res) => {
//   const userId = req.user.userId;
//   const attendedExamId = req.params.id;
//   AttendedExam.findOne({ _id: attendedExamId, user: userId })
//     .populate("exam")
//     .exec((err, attendedExam) => {
//       if (err) return res.status(500).send(err);
//       if (!attendedExam)
//         return res.status(404).send({ message: "Attended exam not found" });
//       res.send(attendedExam);
//     });
// });

// // Get questions for a single attended exam for a user route
// app.get("/attended-exams/:id/questions", authenticateToken, (req, res) => {
//   const userId = req.user.userId;
//   const attendedExamId = req.params.id;
//   AttendedExam.findOne({ _id: attendedExamId, user: userId })
//     .populate("exam")
//     .exec((err, attendedExam) => {
//       if (err) return res.status(500).send(err);
//       if (!attendedExam)
//         return res.status(404).send({ message: "Attended exam not found" });
//       const { exam } = attendedExam;
//       const questions = exam.questions.slice(0, 4);
//       res.send(questions);
//     });
// });

// // Middleware function to authenticate jwt token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token)
//     return res.status(401).send({ message: "Missing authorization header" });
//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// }




//Route Controller;
app.use('/',User);
app.use('/user',User);
app.use('/question',Question);
app.use('/exam',Exam);
app.use('/attend-exam',AttendedExam);
// Start the server
const PORT = process.env.PORT ||4000;
app.listen(PORT, () => {
    console.log('Port is Running on ' + PORT);
});

