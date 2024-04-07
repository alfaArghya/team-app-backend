import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../../responseStatus/status";
import { signinInput } from "../../types/index";
import { user } from "../../DB";

dotenv.config();

const signin = async (req: Request, res: Response) => {
  //getting data from user
  const email: string = req.body.email;
  const password: string = req.body.password;

  //checking all data for correct format
  const { success } = signinInput.safeParse({
    email,
    password,
  });

  //all data is not in correct format -> so can't login
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    //finding user in database
    const findUser = await user.findOne({ email: email });

    //user not found -> so can't login
    if (!findUser) {
      res.status(status.Forbidden).json({
        message: "Invalid email",
      });
      return;
    }

    //checking password
    if (!(await argon2.verify(findUser.password || "", password))) {
      res.status(status.Forbidden).json({
        msg: "Incorrect password",
      });
      return;
    }

    //create JWT token for user AUTHENTICATION
    const token = jwt.sign(
      { id: findUser._id.toString(), email: findUser.email },
      `${process.env.JWT_Secret}`
    );

    //return JWT token
    res.json({
      message: "Hello user!",
      token,
    });
  } catch (err) {
    res.status(status.Conflict).json({ msg: "email already exist" });
    return;
  }
};

export default signin;
