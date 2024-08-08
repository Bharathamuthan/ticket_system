const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const config =require('config');
const {registerValidation, loginValidation} = require('../validation');
const nodemailer = require('nodemailer');
//Nodemiler
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mathankpr48@gmail.com',  
        pass: 'oevn cdwg rbmm rxaa'          
    },  
    tls: {
        rejectUnauthorized: false
      }
});
// Register a new user
const registerUser = async (req, res) => {

    // Validate data before creating a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { Firstname, Lastname, email, password, Phonenumber } = req.body;

    if (!Firstname || !Lastname || !email || !password || !Phonenumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (Phonenumber.toString().length !== 10) {
        return res.status(400).json({ message: 'Phonenumber must be 10 digits long' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            Firstname,
            Lastname,
            email,
            password,
            Phonenumber
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save(); 
        
       //send mail
        let mailOptions = {
            from: 'mathankpr48@gmail.com', // replace with your email
            to: email, // sending to the registered user's email
            subject: 'Welcome to Our Platform',
            text: `hello ${Firstname},`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
       res.status(201).json({ message: 'User registered successfully' });

    }
     catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//LoginUser
const loginUser = async (req, res) => {

    // Validate data before logging in a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '3h' },
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
// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    const { Firstname, Lastname, email, password, Phonenumber } = req.body;

    const userFields = {};
    if (Firstname) userFields.Firstname = Firstname;
    if (Lastname) userFields.Lastname = Lastname;
    if (email) userFields.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
    }
    if (Phonenumber) userFields.Phonenumber = Phonenumber;

    try {
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
module.exports={
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById

}