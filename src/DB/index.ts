import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

//connect to database
mongoose.connect(process.env.DATABASE_URL || "");

export { default as user } from "./userModel";
export { default as team } from "./teamModel";
