const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema, updateSchema } = require('../utils/validation');
const { sendEmail } = require('../utils/email');

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
exports.addMember = async (req, res) => {
  const { firstname, lastname, phonenumber, email, password, role } = req.body;

  // Validate request body using Joi (or any other validation library)
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
      phonenumber,
      email,
      password,
      role, 
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'Member added successfully' });
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