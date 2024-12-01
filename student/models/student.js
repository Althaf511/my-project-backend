const mongoose = require('mongoose');

// Define the Marks schema
const marksSchema = new mongoose.Schema({
    english: { type: Number, required: true },
    tamil: { type: Number, required: true },
    science: { type: Number, required: true },
    maths: { type: Number, required: true },
    hindi: { type: Number, required: true },
    total: { type: Number, required: true }  // Total marks
});
                
// Define the Student schema
const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },  // Unique identifier for the student
    name: { type: String, required: true },               // Name of the student
    marks: marksSchema                                     // Associate marks with the student
});

// Export the Student model
module.exports = mongoose.model('Student', studentSchema);
