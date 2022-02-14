const express = require("express");
const router = express.Router();
const fatchuser = require("../middleware/fatchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route:1- get all the otes using:GET "/api/notes/getuser"-  userlogin require

router.get("/fatchallnotes", fatchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurd");
  }
});
//Route:2- add notes using:GET "/api/notes/addnote"-  userlogin require

router.post(
  "/addnote",
  fatchuser,
  [
    body("title", "enter velid title ").isLength({ min: 5 }),
    body("description", "description must atleast 5 charactor").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, teg } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        teg,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurd");
    }
  }
);
module.exports = router;
