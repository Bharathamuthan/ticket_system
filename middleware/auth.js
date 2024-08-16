const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');
const User = require('../models/User');
const mongoose = require('mongoose');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authToken.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.user.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Controller method to create a project
const createProject = async (req, res) => {
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

// Controller method to list projects
const listProject = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ user: userId });
    res.status(200).json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller method to update a project
const updateProject = async (req, res) => {
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

// Routes
router.post('/create', verifyToken, createProject);
router.get('/list', verifyToken, listProject);
router.put('/update', verifyToken, updateProject);

module.exports = router;
