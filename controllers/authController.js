
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user.id }, "Akshara", { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.forgotPassword = async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        console.log(user,"user")
        const token = jwt.sign({ id: user.id }, "Akshara", { expiresIn: '1h' });
        console.log(token,"token")
      
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { 
                user: 'aksharamaheshwaram93@gmail.com',
                pass: 'Katyayani@93'
            },
        });

        const mailOptions = {
            from: 'aksharamaheshwaram93@gmail.com', 
            to: user.email,
            subject: 'Reset Password Link',
            text: `Please use the following link to reset your password: http://localhost:3000/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: 'Email could not be sent' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ msg: 'Reset password email sent' });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

