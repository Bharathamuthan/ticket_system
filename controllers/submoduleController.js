const Submodule = require('../models/submodule');
const Project = require('../models/Project');

// Create a new submodule
exports.createSubmodule = async (req, res) => {
  const { projectId, moduleId, name } = req.body;
  const userId = req.user.id;

  try {
    // Validate that the project and module exist
    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== userId) {
      return res.status(400).json({ msg: 'Project not found or unauthorized' });
    }

    const module = await Module.findById(moduleId);
    if (!module || module.project.toString() !== projectId) {
      return res.status(400).json({ msg: 'Module not found or does not belong to the specified project' });
    }

    // Create the submodule
    const submodule = new Submodule({
      project: projectId,
      module: moduleId,
      name,
      created_by: userId,
    });

    await submodule.save();

    res.status(201).json({ msg: 'Submodule created successfully', submodule });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// List submodules for a module
exports.listSubmodules = async (req, res) => {
  const { projectId, moduleId } = req.query;
  const userId = req.user.id;

  try {
    // Validate that the project and module exist
    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== userId) {
      return res.status(400).json({ msg: 'Project not found or unauthorized' });
    }

    const module = await Module.findById(moduleId);
    if (!module || module.project.toString() !== projectId) {
      return res.status(400).json({ msg: 'Module not found or does not belong to the specified project' });
    }

    const submodules = await Submodule.find({ module: moduleId });
    res.status(200).json(submodules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a submodule
exports.updateSubmodule = async (req, res) => {
  const { submoduleId, name } = req.body;
  const userId = req.user.id;

  try {
    // Validate that the submodule exists
    let submodule = await Submodule.findById(submoduleId);
    if (!submodule || submodule.created_by.toString() !== userId) {
      return res.status(400).json({ msg: 'Submodule not found or unauthorized' });
    }

    // Update the submodule
    submodule.name = name || submodule.name;
    submodule.updated_by = userId;
    submodule.updated_at = Date.now();

    await submodule.save();

    res.status(200).json({ msg: 'Submodule updated successfully', submodule });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a submodule
exports.deleteSubmodule = async (req, res) => {
  const { submoduleId } = req.body;
  const userId = req.user.id;

  try {
    // Validate that the submodule exists
    let submodule = await Submodule.findById(submoduleId);
    if (!submodule || submodule.created_by.toString() !== userId) {
      return res.status(400).json({ msg: 'Submodule not found or unauthorized' });
    }

    await Submodule.findByIdAndDelete(submoduleId);

    res.status(200).json({ msg: 'Submodule deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
