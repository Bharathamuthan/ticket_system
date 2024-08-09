const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/role');
const { registerSchema, loginSchema, updateSchema } = require('../utils/validation');
const { sendEmail } = require('../utils/email');
const { requestEmail } = require('../utils/request');

exports.register = async (req, res) => {
  const { firstname, lastname, email, contactnumber, password,  } = req.body;

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
    sendEmail(user.email, 'welcome', '<b>You have successfully registered in.</b>');
    res.status(201).json({ msg: 'User registered successfully' });
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
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.UserList = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error', err);
    res.status(500).send(`Error: ${err}`);
  }
};

exports.request = (req, res) => {
  const { to, subject, html } = req.body;

  console.log('Received email request:', { to, subject, html });

  requestEmail({ to, subject, html }, (error, result) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ msg: 'Failed to send email', error: error.message });
    }
    console.log('Email sent successfully:', result);
    res.status(200).json({ msg: 'Email sent successfully', result });
  });
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