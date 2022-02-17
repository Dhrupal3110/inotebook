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
//Route:3- update note using:PUT "/api/notes/updatenote"-  userlogin require
router.put("/updatenote/:id", fatchuser, async (req, res) => {
  try {
    const { title, description, teg } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (teg) {
      newNote.teg = teg;
    }

    //find the note to be uploaded to be update
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    // console.log(note.user.toStrimg());
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).send("some error occurd" + error);
  }
});
//Route:4- Delete note using:DELET "/api/notes/deletnote"-  userlogin require
router.delete("/deletenote/:id", fatchuser, async (req, res) => {
  try {
    //find the note to be delete to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //Allow deletion only if users owens this Note
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note will be deleted", note: note });
  } catch (error) {
    res.status(500).send("some error occurd" + error);
  }
});

module.exports = router;
