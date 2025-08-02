"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "../../../axiosConfig";
import TaskList from "../../components/TaskList";
import FilterBar, { FilterOptions } from "../../components/FilterBar";
import Link from "next/link";
import { Task } from "../../hooks/types";

export default function AdminUserPage() {
  const { userId } = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterOptions>({
    status: "",
    category: "",
    priority: "",
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/admin/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err: any) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter.status === "" ||
      (filter.status === "completed" && task.isCompleted) ||
      (filter.status === "incomplete" && !task.isCompleted);
    const categoryMatch =
      filter.category === "" ||
      task.category?.toLowerCase() === filter.category.toLowerCase();
    const priorityMatch =
      filter.priority === "" || task.priority.toString() === filter.priority;
    return statusMatch && categoryMatch && priorityMatch;
  });

  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;
  const progressPercentage =
    filteredTasks.length > 0
      ? Math.round((completedCount / filteredTasks.length) * 100)
      : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-300">
      {/* Header with Title + Assign Task */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Admin View: {username}
        </h1>
        {username && (
          <Link
            href={`/admin/assign-task?username=${username}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-200"
          >
            + Assign Task 
          </Link>
        )}
      </div>

      <FilterBar onFilterChange={setFilter} />

      <div className="mb-4 text-sm text-gray-400">
        Completed: {completedCount} | Incomplete:{" "}
        {filteredTasks.length - completedCount}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      {!loading && !error && (
        <TaskList
          tasks={[...filteredTasks].sort(
            (a, b) =>
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          )}
          refetch={fetchTasks}
          isAdmin ={true}
        />
      )}

      <Link href="/admin" className="text-blue-400 underline mt-4 block">
        ← Back to Admin Dashboard
      </Link>
    </div>
  );
}
