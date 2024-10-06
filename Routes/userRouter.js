const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../Models/userSchema');
const { authMiddleware, generateToken } = require('../Middleware/auth');

// // Registration Route
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     // Basic validation
//     if (!email || !password){
//         return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//         // // Check if the user already exists
//         // if (await User.findOne({ email })) {
//         //     return res.status(400).json({ error: 'User already exists' });
//         // }

//         // Hash the password and create a new user
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await new User({ email, password: hashedPassword }).save();

//         // Generate JWT token and respond
//         const token = generateToken({ id: user._id, email: user.email });
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error(`Error in register: ${error}`);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
console.log("req.body;" ,req.body);

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find the user and compare the password
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token and respond
        const token = generateToken({ id: user._id, email: user.email });
        res.status(200).json({ token });
    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected Route
router.get('/protectedRoute', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
