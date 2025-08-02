import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../hooks/types";

interface TaskListProps {
  tasks: Task[];
  refetch: () => void;
  isAdmin?: boolean; // Optional flag to allow admin-level access
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refetch, isAdmin = false }) => {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refetch={refetch} isAdmin={isAdmin} />
      ))}
    </ul>
  );
};

export default TaskList;
