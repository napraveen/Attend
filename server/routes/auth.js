const express = require('express');

const app = express();
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { User } = require('../db');
router.post(
  '/signup',
  [
    check('email', 'Please provide a vaild email').isEmail(),
    check('password', 'Please provide a password greater than 5').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { password, email, username } = req.body;

    //Validated the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //validate if user doesn't already exist

    let existinguser = await User.findOne({ email: email });

    if (existinguser) {
      return res.status(400).json({
        errors: [
          {
            msg: 'This user already exists',
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let usernameArray = username.split(' ');
    if (
      usernameArray[0] === 'm' ||
      usernameArray[0] === 'M' ||
      usernameArray[0] === 'Mentor' ||
      usernameArray[0] === 'mentor'
    ) {
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        category: 'mentor',
        year: usernameArray[1],
        department: usernameArray[2],
        section: usernameArray[3],
      });
    } else if (usernameArray[0] === 'hod') {
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        category: 'hod',
        year: usernameArray[1],
        department: usernameArray[2],
      });
    } else if (usernameArray[0] === 'student') {
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        category: 'student',
        year: usernameArray[1],
        department: usernameArray[2],
        section: usernameArray[3],
      });
    } else {
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
    }

    const token = await JWT.sign(
      {
        email,
      },
      'secret',
      {
        expiresIn: 36000000,
      }
    );

    // res.cookie('token', token, {
    //   httpOnly: false,
    //   maxAge: 36000000,
    // });

    res.json({
      token,
      success: true,
      message: 'signed up successfully',
    });
  }
);

router.post('/login', async (req, res) => {
  const { password, email, username } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
    });
  }
  const token = await JWT.sign(
    {
      email,
    },
    'secret',
    {
      expiresIn: 36000000,
    }
  );

  res.cookie('token', token, {
    httpOnly: false,
    maxAge: 36000000,
  });

  res.json({
    token,
    success: true,
    message: 'Successfully logged in',
  });
});

router.get('/all', (req, res) => {
  res.json(users);
});

router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  // console.log('Received token:', token);

  if (!token) {
    return res.json({ authenticated: false, message: 'Token not found' });
  }

  JWT.verify(token, 'secret', async (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.json({
        authenticated: false,
        message: 'Error verifying token',
      });
    }
    // console.log('Decoded token:', decoded);
    const email = decoded.email;
    const user = await User.findOne({ email: decoded.email });
    const username = user.username;
    return res.json({ authenticated: true, username: username });
  });
});

module.exports = router;
