/* 
When you have 'type: module' in the package.json file, your source code should use import syntax. When you do not have, you should use require syntax. you can't mix up both require and import calls while importing modules, that will give an error;
*/
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import cors from 'cors';

import connectDB from './db.js';
import studentsRouter from './routes/students.js';
import meetingsRouter from './routes/meetings.js';
import tutorsRouter from './routes/tutors.js';
import errorHandler from './middleware/errorHandler.js';
import feedbacksRouter from './routes/feedbacks.js';
import coursesRouter from './routes/courses.js';
import teachesRouter from './routes/teaches.js';
import messagesRouter from './routes/messages.js';
import transactionsRouter from './routes/transactions.js';
import inboxesRouter from './routes/inboxes.js';
import locationsRouter from './routes/locations.js';
import studentInterestsRouter from './routes/studentInterests.js';

dotenv.config({ path: './config/.env' });

//connect to cluster
connectDB();

const app = express();
const port = process.env.PORT;
const inProduction = process.env.NODE_ENV === "production";
const __dirname = path.resolve();

//req body parser: express.json() returns an express's native middleware function that accepts as argument 'req' , 'res' and 'next' objects, the http req object that it accepts, it parses the body of that and attaches it a body property which is also an object, previously when express did have this middleware natively we had to use body parser middleware function from npm;
app.use(express.json());

// For the cors config below, when in production, "http://localhost:5000" should be "http://foo.com"
app.use(
  cors({
    origin: inProduction ? "http://localhost:5000" : "http://localhost:3000"
  })
);

// fileupload middlware
app.use(fileupload(
  {
    createParentPath: true,
  }
));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//DEFAULT / ROOT
app.get('/', function (req, res) {
  res.send("Default Page");
});

//STUDENTS
app.use('/api/students', studentsRouter);

//TUTORS
app.use('/api/tutors', tutorsRouter);

// MEETINGS
app.use('/api/meetings', meetingsRouter);

//FEEDBACKS
app.use('/api/feedbacks', feedbacksRouter);

//COURSES
app.use('/api/courses', coursesRouter);

//TEACHES
app.use('/api/teaches', teachesRouter);

//TRANSACTIONS
app.use('/api/transactions', transactionsRouter);

//INBOXES
app.use('/api/inboxes', inboxesRouter);

//MESSAGES
app.use('/api/messages', messagesRouter);

//LOCATIONS
app.use('/api/locations', locationsRouter);

//RECOMMENDATIONS
app.use('/api/interests', studentInterestsRouter);


//errorHandler middleware at the end of all routings ? read at "NodeJS Fundamentals" search "error handler middleware"
app.use(errorHandler);


app.listen(port, () => console.log(`server at https://localhost:${port}`));