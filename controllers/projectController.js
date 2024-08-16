const jwt = require('jsonwebtoken');
const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;  
  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const project = new Project({
      name,
      description,
      user: userId,       
      created_by: userId, 
    });

    await project.save();  

    user.projects.push(project.id);
    await user.save();  

    res.status(201).json({ msg: 'Project created successfully', project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.listProject = async (req, res) => {
  const userId = req.user.id;  

  try {
    const projects = await Project.find({ user: userId });  
    res.status(200).json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.updateProject = async (req, res) => {
  const { projectId, name, description } = req.body;
  const userId = req.user.id;

  // Validate that projectId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ msg: 'Invalid project ID' });
  }

  try {
    let project = await Project.findById(projectId);
    if (!project || project.user.toString() !== userId) {
      return res.status(400).json({ msg: 'Project not found or unauthorized' });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({ msg: 'Project updated successfully', project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
