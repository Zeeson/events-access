const express = require('express');
const router = express.Router();
const { userValid, clientValid } = require('../validation');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Client = require('../models/Client');
const randomWords = require('random-words');
const auth = require('../middleware/auth');
const mail = require('../mailer');
//admin
//register client private  /api/admin
router.post('/client', auth(true), async (req, res) => {
  const { error, value } = clientValid(req.body);
  if (error) {
    return res.send(error.message);
  }
  const { name, email, wordcount } = req.body;
  const token = randomWords({
    exactly: 1,
    wordsPerString: wordcount || 2,
    separator: '-'
  }).toString();
  const client = Client({
    name,
    email,
    token
  });
  try {
    const exist = await Client.findOne({ email });
    if (exist) return res.send('client exists!');
  } catch (error) {
    res.status(500).send('server error');
  }
  try {
    const registered = await client.save();
    //send mail
    // await mail(registered.email, registered.token);
    res.status(201).json({
      name: registered.name,
      email: registered.email,
      token: registered.token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});
//delete client private /api/admin
router.delete('/client/:id', auth(true), async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.send('user deleted');
  } catch (error) {
    res.status(500).send('server error');
  }
});
//register worker private /api/admin
router.post('/worker', auth(true), async (req, res) => {
  const { error, value } = userValid(req.body);
  if (error) {
    return res.send(error.message);
  }
  const { username, password, admin } = req.body;
  const user = User({
    username,
    password
  });
  try {
    const exist = await User.findOne({ username });
    if (exist) return res.send('user exists!');
    user.password = await bcrypt.hash(user.password, 10);
  } catch (error) {
    res.status(500).send('server error');
  }
  try {
    const registered = await user.save();
    res.status(201).json({
      username: registered.username,
      _id: registered._id
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});
//get workers private /api/admin
router.get('/worker', auth(true), async (req, res) => {
  try {
    const workers = await User.find({ username: { $ne: 'jide' } })
      .select('-password')
      .select('-admin');
    res.json(workers);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});
//delete worker private /api/admin
router.delete('/worker/:id', auth(true), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('user deleted');
  } catch (error) {
    res.status(500).send('server error');
  }
});
//delete all workers private /api/admin
router.delete('/worker/', auth(true), async (req, res) => {
  try {
    await User.deleteMany({ admin: false });
    res.send('users deleted');
  } catch (error) {
    res.status(500).send('server error');
  }
});
//delete all clients private /api/admin
router.delete('/client/', auth(true), async (req, res) => {
  try {
    await Client.deleteMany();
    res.send('clients deleted');
  } catch (error) {
    res.status(500).send('server error');
  }
});
module.exports = router;
