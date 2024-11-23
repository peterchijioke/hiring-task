


import { UserEntity } from "../../entities";
import {Request,Response} from 'express'
import { createTask, getTask, updateTask } from "../../services/task.service";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const updateHandler = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const { id } = req?.params;

    const taskToUpdate = await getTask({ uuid: id });
    if (!taskToUpdate) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Task with ID ${id} not found`,
        status: false,
      });
    }

  const updatedFields = {
      id,
      ...(title && { title }),
      ...(description && { description }),
      ...(dueDate && {
        dueDate: typeof dueDate === "string" ? new Date(dueDate) : dueDate,
      }),
      ...(status && { status }),
    };


    if (title !== undefined) updatedFields.title = title;
    if (description !== undefined) updatedFields.description = description;
    if (dueDate !== undefined) {
      updatedFields.dueDate =
        typeof dueDate === "string" ? new Date(dueDate) : dueDate;
    }
    if (status !== undefined) updatedFields.status = status;
   
    const updatedTask = await updateTask(updatedFields);
      if (updatedTask) {
        res.status(httpStatus.CREATED).json({
            message: 'Task updated successfully!',
            data:updatedTask,
            status:true
          });
      }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update the task",
      status: false,
    });
 
}

export const updateController = errorHandlerWrapper(updateHandler);
