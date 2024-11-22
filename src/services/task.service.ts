import { AppDataSource } from "../db";
import { TaskEntity } from "../entities/task.entity";
import { getOneUser } from "./user.service";

export const createTask = async (data: {
  title: string;
  description?: string;
  dueDate: Date | string;
  creatorId: string; 
}) => {
  const { title, description, dueDate, creatorId } = data;
  const taskRepository = AppDataSource.getRepository(TaskEntity);

  const user = await getOneUser({ uuid: creatorId });
  const dueDateFormatted = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  const task = taskRepository.create({
    title,
    description,
    dueDate: dueDateFormatted,
    creator: user, 
  });
  await taskRepository.save(task);
  return task;
};


export const getOneTask = async (data: { uuid: string }) => {
  const taskRepository = AppDataSource.getRepository(TaskEntity);
  const task = await taskRepository.findOne({
    where: data,
    relations: ["creator"], 
  });

  if (!task) {
  return null
  }
  return task;
};


export const getTasks = async (
  userId: string,
  page: number,
  limit: number
) => {
  const taskRepository = AppDataSource.getRepository(TaskEntity);

  const skip = (page - 1) * limit;
  const take = limit;

  const [tasks, total] = await taskRepository.findAndCount({
    where: { creator: { uuid: userId } }, 
    skip,
    take,
    order: {
      createdAt: "DESC", 
    },
    relations: ["creator"], 
  });

  return {
    data:tasks,
    pagination:{
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    }
    
  };
};
