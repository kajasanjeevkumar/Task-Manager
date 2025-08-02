// types.ts
// Define the structure of a Task object
export interface Task {
  id: number; // Unique identifier for the task
  title: string; // Title of the task
  description?: string; // Optional description of the task
  dueDate: string; // Due date of the task in ISO string format
  isCompleted: boolean; // Indicates whether the task is completed
  priority: number; // Priority level of the task (e.g., 0 = Low, 1 = Medium, 2 = High)
  category?: string; // Optional category to which the task belongs
  appUserId: number; // ID of the user who created or owns the task
  assignedToUserId?: number; // Optional ID of the user to whom the task is assigned
}
