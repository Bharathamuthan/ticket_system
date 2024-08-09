const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema, updateSchema } = require('../utils/validation');
const { sendEmail } = require('../utils/email');
// const Role = require('../models/Role');

exports.register = async (req, res) => {
  const { firstname, lastname, email, contactnumber, password } = req.body;

  // Validate request body using Joi  
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstname,
      lastname,
      email,
      contactnumber,
      password,
    });
    

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Login the user after registration
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, msg: 'User registered and logged in successfully' });
        sendEmail(user.email, 'Welcome!', '<b>You have successfully registered and logged in.</b>');
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  

  // Validate request body using Joi
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        sendEmail(user.email, 'User Login', '<b>You have successfully logged in.</b>');
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.addnew = async (req, res) => {
  const { firstname, lastname, email, contactnumber, password, role } = req.body;

  // Validate request body using Joi  
  const { error } = addnewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Find the role (or set a default role)
    const userRole = role ? await Role.findOne({ name: role }) : await Role.findOne({ name: 'user' });

    if (!userRole) {
      return res.status(400).json({ msg: 'Invalid role specified' });
    }

    user = new User({
      firstname,
      lastname,
      email,
      contactnumber,
      password,
      role: userRole._id, // Assign the role to the user
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create the JWT payload with the user ID and role
    const payload = {
      user: {
        id: user.id,
        role: userRole.name, // Include the role in the payload
      },
    };

    // Sign the JWT token and send it in the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, msg: 'User registered and logged in successfully' });
        sendEmail(user.email, 'Welcome!', '<b>You have successfully registered and logged in.</b>');
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.UserList = (req, res) => {
  // Example: Assuming you are trying to access req.user.id
  const user = req.user;
  if (!user || !user.id) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  // Proceed with your logic if user and user.id are defined
  // Your existing logic here...
};


exports.update = async (req, res) => {
  const { firstname, lastname, email, contactnumber, password } = req.body;
  const userId = req.user.id;

  // Validate request body using Joi
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.contactnumber = contactnumber || user.contactnumber;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ msg: 'User updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.delete = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
