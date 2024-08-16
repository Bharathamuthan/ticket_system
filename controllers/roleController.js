const Role = require('../models/Role');
const { roleSchema } = require('../utils/rolevalidation');

//Role Create
exports.createRole = async (req, res) => {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { name, role, description } = req.body;
  
    const newRole = new Role({
      name,
      role,
      description,
    });
  
    try {
      await newRole.save();
      res.status(201).json({ msg: 'Role created successfully' });
    } catch (err) {
      console.error(err.message);
  
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        res.status(400).json({ error: `Duplicate value for field: ${field}` });
      } else {
        res.status(500).send('Server error');
      }
    }
  };
  
//Role List
exports.listRole = async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  //Role Update
  exports.updateRole = async (req, res) => {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { id } = req.params;
    const { name, role, description } = req.body;
  
    try {
      const role = await Role.findByIdAndUpdate(
        id,
        { name, role, description },
        { new: true, runValidators: true }
      );
  
      if (!role) return res.status(404).json({ msg: 'Role not found' });
  
      res.status(200).json({ msg: 'Role updated successfully', role });
    } catch (err) {
      console.error(err.message);
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        res.status(400).json({ error: `Duplicate value for field: ${field}` });
      } else {
        res.status(500).send('Server error');
      }
    }
  };
  
 // Role Delete 
  exports.deleteRole = async (req, res) => {
    const { id } = req.params;
  
    try {
      const role = await Role.findByIdAndDelete(id);
  
      if (!role) return res.status(404).json({ msg: 'Role not found' });
  
      res.status(200).json({ msg: 'Role deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };