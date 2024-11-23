
import { body } from "express-validator";
import { TaskStatus } from "../../entities/task.entity";

export const taskValidator = [
  body('title')
    .isString().withMessage('Task name must be a string')
    .notEmpty().withMessage('Task name is required')
    .trim(),
  
  body('description')
    .isString().withMessage('Description must be a string')
    .optional()
    .trim(),
  
  body('dueDate')
    .isISO8601().withMessage('Due date must be a valid date')
    .optional({ nullable: true })
    .toDate(),
];




export const taskUpdateValidator = [
  body('title')
    .isString().withMessage('Task name must be a string')
    .optional()
    .trim(),

  body('description')
    .isString().withMessage('Description must be a string')
    .optional()
    .trim(),

  body('dueDate')
    .isISO8601().withMessage('Due date must be a valid date')
    .optional({ nullable: true })
    .toDate(),

  body('status')
    .optional()
    .isIn(Object.values(TaskStatus)) 
    .withMessage(`Status must be one of: ${Object.values(TaskStatus).join(', ')}`),
];