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

