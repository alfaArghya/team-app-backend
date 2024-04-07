import { Request, Response } from "express";
import { team } from "../../DB";
import { createTeamInput } from "../../types";
import { status } from "../../responseStatus/status";

export const createTeam = async (req: Request, res: Response) => {
  const teamName: string = req.body.teamName;
  const teamDescription: string = req.body.teamDescription;
  const admin: string = req.body.userId;
  const teamMembers: string[] = req.body.teamMembers;

  //checking all data for correct format
  const { success } = createTeamInput.safeParse({
    teamName,
    teamDescription,
    admin,
    teamMembers,
  });

  //all data is not in correct format -> so can't create account
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    //team name already exists
    if (await team.findOne({ teamName: teamName })) {
      res.status(status.InvalidInput).json({
        msg: "Team already exists",
      });
      return;
    }

    // Create new team
    const newTeam = await team.create({
      teamName,
      teamDescription,
      admin,
      teamMembers,
    });

    //return newTeam
    res.status(status.Success).json({
      success: true,
      data: newTeam,
    });
    return;
  } catch (error) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};
