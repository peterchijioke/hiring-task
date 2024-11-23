import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const getUserDetailsHandler = async (req, res) => {
  const { uuid } = req.user;
  const user = await userService.getOneUser({ uuid });
  if (!user) {
  res.status(httpStatus.BAD_REQUEST).json({ message:'User does  not exist.',status:false });
  };
  res.json({ data:user,status:true ,message:"User details successfully retrieved"}).status(httpStatus.OK);
};

export const getUserDetailsController = errorHandlerWrapper(getUserDetailsHandler);
