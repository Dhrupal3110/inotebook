const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fatchuser = require("../middleware/fatchuser");

const JWT_SECRET = "Dhrup@l";
//Route:1-create a User using POSt "/api/auth/createUser"- no userlogin require

router.post(
  "/createUser",
  [
    body("name", "enter velid name ").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this  exisist alredy
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry, user with this email is alredy exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpwd = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpwd,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      //  console.log(authToken);
      res.json(authToken);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Sorry some error occured");
    }
  }
);
//Route:2- create a User using POSt "/api/auth/login"- no userlogin require
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ error: "Please try to login with currect creadnentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password); //it returns true false
      if (!passwordcompare) {
        res
          .status(400)
          .json({ error: "Please try to login with currect creadnentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //  console.log(authToken);
      res.json(authToken);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurd");
    }
  }
);
//Route:3- create a User using POSt "/api/auth/getuser"-  userlogin require
router.post(
  "/getuser",fatchuser,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurd");
    }
  }
);

module.exports = router;
