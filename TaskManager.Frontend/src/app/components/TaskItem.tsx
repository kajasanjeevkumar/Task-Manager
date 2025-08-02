import Link from "next/link";
import axios from "../../axiosConfig";
import { Task } from "../hooks/types";

export interface TaskItemProps {
  task: Task;
  refetch: () => void;
  isAdmin?: boolean;
}

export default function TaskItem({ task, refetch, isAdmin = false }: TaskItemProps) {
  const handleCheckboxChange = async () => {
    try {
      await axios.put(`/TodoItems/${task.id}`, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      refetch();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Error updating task");
    }
  };

  const handleStarClick = async () => {
    try {
      await axios.put(`/TodoItems/${task.id}`, {
        ...task,
        priority: task.priority === 2 ? 0 : 2,
      });
      refetch();
    } catch (error) {
      console.error("Failed to update task priority:", error);
      alert("Error updating task priority");
    }
  };

  const canEdit = isAdmin || task.appUserId === task.assignedToUserId;
  const canCheck = isAdmin || task.appUserId === task.assignedToUserId;



  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date();

  return (
    <li className="border p-4 rounded shadow relative">
      <div className="flex justify-between items-start">
        <div>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleCheckboxChange}
            className="mr-2 cursor-pointer"
            disabled={!canCheck}
            title={!canCheck ? "You cannot mark this task as complete" : ""}
          />
          <span className={task.isCompleted ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>

          {isOverdue && (
            <span className="ml-2 inline-block bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Overdue
            </span>
          )}

          <div className="text-sm text-gray-500 mt-1">
            Due: {task.dueDate?.split("T")[0]} | Category: {task.category} | Priority:{" "}
            {task.priority === 0
              ? "Low"
              : task.priority === 1
              ? "Normal"
              : task.priority === 2
              ? "High"
              : "Unknown"}
          </div>
        </div>

        <div className="flex items-center space-x-2 min-h-[32px]">
          <button
            onClick={handleStarClick}
            className="text-yellow-500 hover:text-yellow-600 transition-colors cursor-pointer"
          >
            {task.priority === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.587 9.21l8.2-1.192L12 .587z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.26a1 1 0 00.95.69h6.573c.969 0 1.371 1.24.588 1.81l-5.316 3.868a1 1 0 00-.364 1.118l2.036 6.26c.3.921-.755 1.688-1.54 1.118l-5.316-3.868a1 1 0 00-1.176 0l-5.316 3.868c-.784.57-1.838-.197-1.54-1.118l2.036-6.26a1 1 0 00-.364-1.118L2.49 11.687c-.783-.57-.38-1.81.588-1.81h6.573a1 1 0 00.95-.69l2.036-6.26z"
                />
              </svg>
            )}
          </button>

          <Link href={`/show-task/${task.id}`}>
            <button className="text-blue-400 underline text-sm cursor-pointer">
              Show More
            </button>
          </Link>

          {canEdit ? (
            <>
              <Link href={`/edit-task/${task.id}`} className="text-yellow-600">
                Edit
              </Link>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(`/TodoItems/${task.id}`);
                    refetch();
                  } catch (error) {
                    console.error("Delete failed", error);
                    alert("Error deleting task");
                  }
                }}
                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </>
          ) : (
            <span className="text-gray-400 italic text-sm">Admin Added</span>
          )}
        </div>
      </div>
    </li>
  );
}
