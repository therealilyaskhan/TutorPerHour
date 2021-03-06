//our courses api which is going to deal with courses in the database
import express from 'express';
import { deleteCourse, getCourse, getCourses, createCourse, autocompleteTitles } from '../controllers/courses.js';

const router = express.Router();

//all these below are different endpoints of the courses api
router.route('/').get(getCourses).post(createCourse);

//search autocomplete endpoint
router.route('/search').get(autocompleteTitles);

router.route('/:id').get(getCourse).delete(deleteCourse);

export default router;