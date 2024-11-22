import { UserEntity } from "../../entities";
import { createTask, getTasks } from "../../services/task.service";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const getHandler = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const user: UserEntity = req?.user;

    const tasks = await getTasks(user.uuid, Number(page), Number(limit));
    res.status(httpStatus.OK).json({
      message: "Tasks retrieved successfully!",
     ...tasks,
      status: true,
    }); 
};

export const getController = errorHandlerWrapper(getHandler);
