import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  password: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

//create User collection
const user = mongoose.model("User", userSchema);

export default user;
