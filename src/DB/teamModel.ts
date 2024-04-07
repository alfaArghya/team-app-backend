import mongoose from "mongoose";

//schema
const teamSchema = new mongoose.Schema({
  teamName: String,
  teamDescription: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//create Team collection
const team = mongoose.model("Team", teamSchema);

export default team;
