import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const salt = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
});

const User = model("User", userSchema);

export default User;
