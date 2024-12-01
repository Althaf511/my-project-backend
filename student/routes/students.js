const express = require('express');
const router = express.Router();
const Student = require('.student./models/student');

// GET all students

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();  // Fetch all students
        res.json(students);  // Send the students as a response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error while fetching students!'); // Send error response
    }
});


// GET a single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);  // Fetch student by ID
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.json(student);  // Send the student as a response
    } catch (error) {
        res.status(500).send('Error while fetching the student!');
    }
});

// // GET students by name (with query parameter)
// router.get('/search', async (req, res) => {
//     const name = req.query.name;  // Get the 'name' query parameter
//     try {
//         const students = await Student.find({ name: name });  // Find students with matching names
//         res.json(students);
//     } catch (error) {
//         res.status(500).send('Error while searching students!');
//     }
// });





// POST a new student
router.post('/', async (req, res) => {
    const studentData = req.body;  // Get the student data from the request body

    // Create a new Student instance
    const student = new Student(studentData);

    try {
        const savedStudent = await student.save();  // Save the student to the database
        res.status(201).json(savedStudent);  // Respond with the saved student and a 201 status
    } catch (error) {
        res.status(500).send('Error while saving the student!');  // Handle errors
    }
});

module.exports = router;
