import { Request, Response } from "express";
import { status } from "../../responseStatus/status";
import { user } from "../../DB";

export const deleteUser = async (req: Request, res: Response) => {
  // getting data from user
  const id: string = req.params.id;
  const userId: string = req.body.userId;

  // JWT AUTH id and user id not matching -> can't delete user
  if (userId !== id) {
    res.status(status.Forbidden).json({ msg: "Forbidden" });
    return;
  }

  try {
    //delete the use data
    const findUser = await user.findOneAndDelete({ _id: id });

    // no user found
    if (!findUser) {
      return res.status(status.NotFound).json({
        success: false,
        msg: "User not found",
      });
    }

    // delete the user successfully
    res.status(status.Success).json({
      success: true,
      user: findUser,
    });
  } catch (error) {
    console.log(error);

    res.status(status.InternalServerError).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
