import { mongoose } from "mongoose";
const notesSchema = new mongoose.Schema({
  videoLink: {
    type: String,
  },
  notes: {
    type: String,
  },
  question: {
    type: String,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
export const NotesModel = mongoose.model('Notes', notesSchema);
