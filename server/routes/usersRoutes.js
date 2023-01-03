const User = require('../models/usersModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/authMiddleware');

// register - POST => api/users/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // check if user already exists - async operation
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.json({
          success: false,
          message: 'User already exists',
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      // create new user
      const newUser = new User(req.body);
      await newUser.save();

      // send response
      res.json({
        success: true,
        message: 'User created successfully',
      });

    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }

});

// login - POST => api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // check if user exists
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res.json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // compare password with db password (true/false)
      const validPassword = await bcrypt.compare(password, userExist.password);

      if (!validPassword) {
        return res.json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // create and assign token after successful login
      // sign = data to encrypt; secret key; token expiration
      const token = jwt.sign(
        {
          userId: userExist._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );

      // send token to the front end
      // good practice to use 'data' when sending data to frontend
      res.json({
        success: true,
        message: 'User logged in successfully',
        data: token
      });

    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
});

// getuser - GET => api/users/getuser
router.get('/getuser', authMiddleware, async (req, res) => {
  try {
    // excluding multiple fields from the user's data using select()
    const user = await User.findById(req.body.userId).select('-password -__v');
    res.json({
      success: true,
      message: 'User profile fetched successfully!',
      data: user
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;