const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema, updateSchema } = require('../schemas/userSchema');
const nodemailer = require('nodemailer'); 
require('dotenv').config(); // Load environment variables from .env file

exports.register = async (req, res) => {
  const { firstname, lastname, email, contactnumber, username, password } = req.body;

  // Validate request body using Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstname,
      lastname,
      email,
      contactnumber,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use the service you want
      auth: {
        user: "suryapcs91@gmail.com", 
        pass: "agwm pion yxnh wlyl", 
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email, 
      subject: 'Registration Successful',
      text: `Hello ${firstname},\n\nThank you for registering.\n\nRegards,\nYour Team`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error while sending email: ${error.message}`);
        return res.status(500).json({ msg: 'User registered, but failed to send email' });
      }
      console.log(`Email sent: ${info.response}`);
      res.status(201).json({ msg: 'User registered successfully and email sent' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.register = async (req, res) => {
//   const { firstname, lastname, email, contactnumber, password } = req.body;

//   // Validate request body using Joi
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ msg: error.details[0].message });
//   }

//   try {
//     let user = await User.findOne({ $or: [{ email }, { password }] });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       firstname,
//       lastname,
//       email,
//       contactnumber,
//       password,
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     res.status(201).json({ msg: 'User registered successfully' });
//     sendEmail(user.email,'User Login', 'You have successfully logged In')
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

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

exports.UserList = async (req,res) =>{
  try{
    const userId = req.user.id;
    const data = await User.findById(userId)
    if(data){
      res.status(200).send(`UserList:${data}`)
    }else{
      res.status(200).send(`Failed to get UserList.${data}`)
    }

  }catch(err){
    console.log("Error",Err)
    res.status(500).send(`Error:${err}`)
  }

  };

  exports.update = async(req, res) => {
    const {firstname, lastname, email, contactnumber,password } = req.body;
    const userId = req.user.id;

    const {error} = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.details[0].message});
    }

    try{
      let user = await User.findById(userId);
      if(!user){
        return res.status(400).json({msg: 'User not found'});
      }
    

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.contactnumber = contactnumber || user.contactnumber;

    if (password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({msg: 'User update successfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

};

exports.delete = async(req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user){
      return res.status(400).json({msg: 'User not found'});
    }
    await User.findByIdAndDelete(userId);

    res.status(200).json({msg: 'User delete Successfully'});
  } catch (err){
    console.error(err.message);
    res.status(500).send('server error')
  }
};