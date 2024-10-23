import { Schema, Types, model } from "mongoose";

const volcanoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  elevation: {
    type: Number,
    required: true,
  },
  lastEruption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  typeVolcano: {
    type: String,
    required: true,
    enum: [
      "upervolcanoes",
      "Submarine",
      "Subglacial",
      "Mud",
      "Stratovolcanoes",
      "Shield",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  voteList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Volcano = model("Volcano", volcanoSchema);

export default Volcano;
