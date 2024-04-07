import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { status } from "../responseStatus/status";

dotenv.config();

export const userAUTH = (req: Request, res: Response, next: () => void) => {
  const token: string = req.headers.authorization || ""; //get JWT token

  //AUTHORIZATION token not provided
  if (!token) {
    return res.status(status.Unauthorized).json({ msg: "Token not provided" });
  }

  try {
    const secret = process.env.JWT_Secret; //JWT admin password

    //JWT admin password not found
    if (!secret) {
      console.error("JWT_Secret is not defined in the environment variables");
      return res
        .status(status.InternalServerError)
        .json({ msg: "Internal Server Error" });
    }

    //getting user details from JWT token
    const user = jwt.verify(token, secret) as JwtPayload;
    console.log(user);

    if (user && user.id) {
      req.body = {
        userId: user.id,
        userMail: user.email,
        // ------
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        domain: req.body.domain,
        available: req.body.available,
        // -----
        teamName: req.body.teamName,
        teamDescription: req.body.teamDescription,
        teamMembers: req.body.teamMembers,
      };
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(status.Unauthorized).json({ msg: "Unauthorized" });
  }
};
