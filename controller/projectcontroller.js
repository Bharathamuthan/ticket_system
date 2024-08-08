// const Project = require('../models/projectmodel');



// const createProject = async (req, res) => {
//   try {
//     const project = new Task(req.body);
//     await project.save();
//     res.status(201).json(project);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const getAllProjects = async (req, res) => {
//   try {
//     const projects = await projects.find().populate('assignedTo');
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




// const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id).populate('assignedTo');
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// const updateProject = async (req, res) => {
//   try {
//     const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) {
//       return res.status(404).json({ message: 'project not found' });
//     }
//     res.status(200).json({ message: 'project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//             createProject,
//             getAllProjects,
//             getProjectById,
//             updateProject,
//             deleteProject
// }
