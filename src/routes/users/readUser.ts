import { Request, Response } from "express";
import { status } from "../../responseStatus/status";
import { user } from "../../DB";

export const allUser = async (req: Request, res: Response) => {
  //getting data from user side
  const skipCount: number = parseInt(
    typeof req.query.skipCount === "string" ? req.query.skipCount : "0"
  );

  try {
    // fetch user information
    const users = await user
      .find({}, { password: 0 })
      .skip(skipCount * 20)
      .limit(20);

    //return user as array
    res.status(status.Success).json({
      success: true,
      count: users.length,
      users,
    });
    return;
  } catch (error) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};
export const allUserByName = async (req: Request, res: Response) => {
  //getting data from user side
  const first_name: string = req.body.first_name;
  const last_name: string = req.body.last_name;

  try {
    console.log("hii");

    // fetch user information
    const users = await user.find(
      {
        $or: [{ first_name: first_name }, { last_name: last_name }],
      },
      { password: 0 }
    );

    //return user as array
    console.log(users);

    res.status(status.Success).json({
      success: true,
      users,
    });
    return;
  } catch (error) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};

export const singleUser = async (req: Request, res: Response) => {
  //getting data from user side
  const id: string = req.params.id;

  try {
    // fetch user information by id
    const findUser = await user.findOne({ _id: id }, { password: 0 }); // Use findOne to get a single document

    //user not found
    if (!findUser) {
      res.status(status.NotFound).json({
        success: false,
        msg: "User not found",
      });
      return;
    }

    res.status(status.Success).json({
      success: true,
      user: findUser, // Send the actual user data
    });
  } catch (error) {
    console.log(error);

    res.status(status.InternalServerError).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
