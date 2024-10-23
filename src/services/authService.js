import User from "../models/User.js";

const register = (username, email, password, rePass) => {
  const user = User.findOne({ $or: [{ email }, { username }] });
  if (password !== rePass) {
    throw new Error("Password mismatch");
  }

  if (user) {
    throw new Error("User already exist!");
  }
  return User.create({ username, email, password });
};

export default {
  register,
};
