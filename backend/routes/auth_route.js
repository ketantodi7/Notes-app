const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, matchedData, validationResult } = require('express-validator');

const jwt_secret = 'harry';

// create a User using /api/auth/createuser - no login required
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').trim().isLength({ min: 6 }),
], async (req, res) => {
  let success = false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success, errors: result.array() });
    // const data = matchedData(req);
    // return res.send(data);
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);


  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "a user with this email already exist" })
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      }
    }
    const auth_key = jwt.sign(data, jwt_secret);
    // res.json(user)
    success = true;
    res.json({ success, auth_key });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
  // .then(user => res.json(user))
  // .catch(err => console.log(err));

});

// login 

router.post("/login", [
  body('email').isEmail(),
  body('password').trim().isLength({ min: 6 }),
], async (req, res) => {
  let success = false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success = false;
      return res.status(400).json({success, error: "Enter Valid Credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Enter Valid Credentials" });
    }
    const data = {
      user: {
        id: user.id,
      }
    }
    const auth_key = jwt.sign(data, jwt_secret);
    success = true;
    res.json({success, auth_key });
  }

  catch (error) {
    console.error(error.message);
    res.status(500), send("Internal Error Occurred");
  }

});

// get user details
router.post("/fetch", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occurred");
  }
});

module.exports = router