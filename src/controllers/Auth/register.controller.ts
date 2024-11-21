import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const isUsernameExist = await userService.getOneUser({username})
  const isEmailExist = await userService.getOneUser({email})

if (isEmailExist) {
  res.status(httpStatus.BAD_REQUEST).json({ message:'User with email address already exist' });
}
if (isUsernameExist) {
  res.status(httpStatus.BAD_REQUEST).json({ message:'User with username already exist' });
}
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });
  res.json({ user }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
