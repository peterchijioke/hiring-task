import { UserEntity } from "../../entities";
import { createTask } from "../../services/task.service";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const createHandler = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const user:UserEntity = req?.user

   
const task = await createTask({
  title,
  description,
  dueDate: new Date(),
  creatorId: user?.uuid
})
if (task) {
   res.status(httpStatus.CREATED).json({
      message: 'Task created successfully!',
      data:task,
      status:true
    });
}

res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  message:"Server error occur",status:false
})
   
};

export const createController = errorHandlerWrapper(createHandler);
