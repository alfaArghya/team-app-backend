import { Request, Response } from "express";
import { status } from "../../responseStatus/status";
import { team, user } from "../../DB";
import { Types } from "mongoose";

export const allTeam = async (req: Request, res: Response) => {
  // getting data from user
  const userId: string = req.body.userId;

  try {
    // find teams in DB
    const findTeams = await team.find({
      $or: [
        { admin: userId },
        { teamMembers: userId }, // Assuming 'teamMembers' is the field containing userIds
      ],
    });

    //team not found
    if (!findTeams) {
      res.status(status.NotFound).json({ msg: "Teams not found" });
      return;
    }

    // team found and return details
    res.status(status.Success).json({
      msg: "Teams found",
      findTeams,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
  }
};

interface TeamDocument extends Document {
  teamMembers: Types.ObjectId[]; // Assuming UserDocument is your user interface
  teamName?: string;
  teamDescription?: string;
  admin?: Types.ObjectId;
  // Add other fields as necessary
}
export const singleTeam = async (req: Request, res: Response) => {
  // getting data from user
  const userId: string = req.body.userId;
  const id: string = req.params.id;

  try {
    // find team in DB
    const findTeam = (await team.findOne({
      _id: id,
      $or: [{ admin: userId }, { teamMembers: userId }],
    })) as TeamDocument;

    //team not found
    if (!findTeam) {
      res.status(status.NotFound).json({ msg: "no team found" });
      return;
    }

    //team found
    const leader = await user.find({ _id: findTeam.admin }, { password: 0 });
    const userIds = findTeam.teamMembers;
    const users = await user.find({ _id: { $in: userIds } }, { password: 0 });

    //return team details
    res.status(status.Success).json({
      msg: "Team found",
      data: {
        teamName: findTeam.teamName,
        teamDescription: findTeam.teamDescription,
        admin: leader,
        teamMembers: users,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
  }
};
