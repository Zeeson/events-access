const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config();

//workers
//get user private /api/user
router.get('/user', auth(), async (req, res) => {
  try {
    const user = await User.findById(res.user).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
//login user /api/auth
router.post('/auth', async (req, res) => {
  if (req.body.username.length < 1 || req.body.password.length < 1)
    return res.status(401).send('enter valid fields');
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send('username or password invalid');
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).send('username or password invalid');
    const token = await jwt.sign(
      { user: user._id, admin: user.admin },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});
//get clients private /api/clients
router.get('/client', auth(true), async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});
module.exports = router;
