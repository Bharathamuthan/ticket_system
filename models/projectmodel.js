// // models/Task.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const projectSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Completed'],
//     default: 'Pending'
//   },
 
// },{timestamps:true});

// const Project = mongoose.model('Project', projectSchema);
// module.exports = Project;
