"use client";

import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminAddTaskPage() {
  const searchParams = useSearchParams();
  const prefilledUsername = searchParams.get("username") || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [category, setCategory] = useState("Personal");
  const [assignedToUsername, setAssignedToUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (prefilledUsername) {
      setAssignedToUsername(prefilledUsername);
    }
  }, [prefilledUsername]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/admin/add-task-by-username",
        {
          title,
          description,
          dueDate,
          priority,
          category,
          assignedToUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/admin");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Failed to add task";

      console.error("Add Task Error:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Assign Task (Admin)</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleAddTask} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Enter task description"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Assigned To Username */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Assign To (Username)
          </label>
          <input
            type="text"
            value={assignedToUsername}
            onChange={(e) => setAssignedToUsername(e.target.value)}
            placeholder="Enter username"
            readOnly={!!prefilledUsername}
            className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              prefilledUsername ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200 cursor-pointer"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}
