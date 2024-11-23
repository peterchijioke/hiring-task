import {Request,Response} from 'express'
import {  deleteTask, getTask } from "../../services/task.service";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const deleteHandler = async (req, res) => {
    const {id}=req?.params
     const taskToUpdate = await getTask({ uuid: id });
  if (!taskToUpdate) {
    res.status(httpStatus.NOT_FOUND).json({
      message:`Task with ID ${id} not found`,status:false
    })
  }
const task = await deleteTask({uuid:id})
 
if (task) {
   res.status(httpStatus.CREATED).json({
      message: 'Task deleted successfully!',
      data:task,
      status:true
    });
}
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  message:"Server error occur",status:false
})
};

export const deleteController = errorHandlerWrapper(deleteHandler);
