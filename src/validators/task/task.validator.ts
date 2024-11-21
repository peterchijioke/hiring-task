
import { body } from "express-validator";

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