import { Request, Response } from "express";
import { status } from "../../responseStatus/status";
import { user } from "../../DB";
import { updateInput } from "../../types";

export const updateUser = async (req: Request, res: Response) => {
  // getting data from user
  const userId: string = req.body.userId;
  const id: string = req.params.id;
  const first_name: string = req.body.first_name;
  const last_name: string = req.body.last_name;
  const gender: string = req.body.gender;
  const domain: string = req.body.domain;
  const available: boolean = req.body.available;

  // JWT AUTH id and user id not matching -> can't update user details
  if (userId !== id) {
    res.status(status.Forbidden).json({ msg: "Forbidden" });
    return;
  }

  //checking all data for correct format
  const { success } = updateInput.safeParse({
    first_name,
    last_name,
    gender,
    domain,
    available,
  });

  //all data is not in correct format -> so can't update account
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    //update user data with id
    const result = await user.updateOne(
      { _id: id },
      { first_name, last_name, gender, domain, available }
    );

    // no modifications has made by user
    if (result.modifiedCount === 0) {
      res.status(status.NotFound).json({
        success: false,
        msg: "User not found",
      });
      return;
    }

    //update user data successfully
    res.status(status.Success).json({
      success: true,
      msg: "User updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(status.InternalServerError).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
