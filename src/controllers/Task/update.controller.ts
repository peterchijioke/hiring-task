import { UserEntity } from "../../entities";
import {Request,Response} from 'express'
import { createTask, getTask, updateTask } from "../../services/task.service";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const updateHandler = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const {id}=req?.params

     const taskToUpdate = await getTask({ uuid: id });
  if (!taskToUpdate) {
    res.status(httpStatus.NOT_FOUND).json({
  message:`Task with ID ${id} not found`,status:false
    })
  }
const task = await updateTask({
  title,
  description,
  dueDate: new Date(dueDate),
  id
})
 
if (task) {
   res.status(httpStatus.CREATED).json({
      message: 'Task updated successfully!',
      data:task,
      status:true
    });
}
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  message:"Server error occur",status:false
})
};

export const updateController = errorHandlerWrapper(updateHandler);
