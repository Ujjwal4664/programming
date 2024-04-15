import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
import { NotesModel } from "../models/Notes.js";

const router = express.Router();
//get one by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NotesModel.findById(id);

    if (!note) {
      return res.status(404).json({ error: " not found" });
    }
    console.log(note);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get all
router.get("/", async (req, res) => {
  try {
    const result = await NotesModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const { notes, videoLink, userOwner, question } = req.body;

  try {
    const note = new NotesModel({
      _id: new mongoose.Types.ObjectId(),
      question,
      videoLink,
      notes,
      userOwner,
    });

    const result = await note.save();

    await UserModel.findByIdAndUpdate(
      userOwner,
      { $push: { notes: result._id } },
      { new: true }
    );

    res.status(201).json({
      createdBlog: {
        videoLink: result.videoLink,
        notes: result.notes,
        userOwner: res.userOwner,
        _id: result._id,
        question: result.question,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export { router as notesRouter };
