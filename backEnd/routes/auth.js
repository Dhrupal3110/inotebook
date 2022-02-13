const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//create a User using POSt "/api/auth/createUser"- no userlogin require

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
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Sorry some error occured");
    }
  }
);
// create a User using POSt "/api/auth/login"- no userlogin require
// router.post(
//   "/login",
//   [
//     body("email").isEmail(),
//     body("password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const {email,password}=req.body;
//     try {
//       let user=User.findOne({email})
//       if (!user) {
//         res.status(400).json({error:"Please try to login with currect creadnential"});
//       }
//       const passwordcompare=bcrypt.compare(password,user.password)
//       if (!passwordcompare) {
//         res.status(400).json({error:"Please try to login with currect creadnential"});
//       }
//       const payload={
//         user:{

//         }
//       }
      
//     } catch (error) {
      
//     }
//   })
module.exports = router;
