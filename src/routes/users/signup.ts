import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../../responseStatus/status";
import { signupInput } from "../../types";
import { user } from "../../DB";

dotenv.config();

const signup = async (req: Request, res: Response) => {
  //getting data from user
  const first_name: string = req.body.first_name;
  const last_name: string = req.body.last_name;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const gender: string = req.body.gender;
  const domain: string = req.body.domain;

  //checking all data for correct format
  const { success } = signupInput.safeParse({
    first_name,
    last_name,
    email,
    password,
    gender,
    domain,
  });

  //all data is not in correct format -> so can't create account
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    // username or mail already exist --> so can't create account
    if (await user.findOne({ email: email })) {
      res.status(status.InvalidInput).json({
        msg: "email already exists",
      });
      return;
    }

    const hashPassword = await argon2.hash(password); //hash the password

    // create a new user
    const createUser = await user.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
      gender: gender,
      domain: domain,
      available: true,
    });

    //create JWT token for user AUTHENTICATION
    const token = jwt.sign(
      { id: createUser._id.toString(), email: createUser.email },
      `${process.env.JWT_Secret}`
    );

    //return JWT token
    res.status(status.Success).json({
      message: "signup successful",
      token,
    });
  } catch (err) {
    res.status(status.Conflict).json({ msg: "email already exist" });
    return;
  }
};

export default signup;
