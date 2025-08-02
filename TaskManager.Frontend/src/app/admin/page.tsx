"use client";

import { use, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: number;
  category: string;
  ownerUsername: string;
  assignedToUsername: string;
};

type JwtPayload = {
  [key: string]: any;
};

export default function AdminTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded: JwtPayload = jwtDecode(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (role !== "Admin") {
      router.push("/");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get("/admin/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          📋 All Tasks (Admin View)
        </h1>

        <div className="flex gap-4">
          {/* Add Task Button */}
          <button
            onClick={() => router.push("/admin/assign-task")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200 cursor-pointer"
          >
            + Assign Task (Admin)
          </button>

          {/* Search Button by Username */}
          <button
            onClick={async () => {
              const username = prompt("Enter Username to search tasks:");
              if (!username) return;

              try {
                const token = localStorage.getItem("token");

                const res = await axios.get(`/admin/user-id/${username}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                const userId = res.data.userId;
                if (userId) {
                  router.push(`/admin/${userId}?username=${username}`);
                } else {
                  alert("User ID not found for the given username.");
                }
              } catch (err: any) {
                console.error("Failed to fetch user ID", err);
                alert(
                  err.response?.data?.message ||
                    "An error occurred while fetching user ID."
                );
              }
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded shadow flex items-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <span>Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 18l6-6m0 0l-6-6m6 6H3"
              />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading tasks...</p>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
          <table className="min-w-full text-sm text-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3 text-left">Assigned To</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{task.id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.ownerUsername}</td>
                  <td className="px-4 py-2">{task.assignedToUsername}</td>
                  <td className="px-4 py-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {["Low", "Medium", "High"][task.priority]}
                  </td>
                  <td className="px-4 py-2">
                    {task.isCompleted ? (
                      <span className="text-green-400 font-semibold">
                        ✔ Done
                      </span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">
                        ⏳ Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
