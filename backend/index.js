import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "express";
import { userRouter } from "./routes/user.js";
import { notesRouter } from "./routes/notes.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", userRouter);
app.use("/notes", notesRouter);

mongoose
  .connect(
    "mongodb+srv://programjourney:programjourney@gameapp.rw1mwga.mongodb.net",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
