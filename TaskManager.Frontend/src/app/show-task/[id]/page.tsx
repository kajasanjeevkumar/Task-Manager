'use client'; // Indicates that this file is a client-side component in Next.js

import { useEffect, useState } from 'react'; // React hooks for managing state and side effects
import { useParams } from 'next/navigation'; // Hook to access route parameters in Next.js
import axios from "../../../axiosConfig"; // Axios instance for making HTTP requests

// Define the structure of a Task object
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: number; // Priority is represented as an integer (e.g., 0 = Low, 1 = Medium, 2 = High)
  category: string;
  appUserId: number; // ID of the user associated with the task
}

// Main component for displaying task details
export default function TaskDetailsPage() {
  const { id } = useParams(); // Extract the task ID from the URL parameters
  const [task, setTask] = useState<Task | null>(null); // State to store the task details
  const [error, setError] = useState(''); // State to store any error messages

  // Fetch task details when the component mounts or when the `id` changes
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/TodoItems/${id}`); // Fetch task data from the API
        setTask(response.data); // Update the task state with the fetched data
      } catch (err) {
        setError('Failed to load task.'); // Set an error message if the API call fails
        console.error(err); // Log the error to the console for debugging
      }
    };

    if (id) fetchTask(); // Only fetch the task if an ID is available
  }, [id]); // Dependency array ensures the effect runs when `id` changes

  // Display an error message if an error occurs
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  // Display a loading message while the task data is being fetched
  if (!task) return <div className="text-white text-center p-4">Loading...</div>;

  // Render the task details once the data is successfully fetched
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-700 text-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1> {/* Task title */}

      <div className="space-y-3">
        {/* Task description */}
        <p><span className="font-semibold">Description:</span> {task.description || 'No description provided.'}</p>
        {/* Task due date, formatted as a readable string */}
        <p><span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleString()}</p>
        {/* Task priority, mapped from an integer to a string */}
        <p><span className="font-semibold">Priority:</span> {['Low', 'Medium', 'High'][task.priority]}</p>
        {/* Task category */}
        <p><span className="font-semibold">Category:</span> {task.category}</p>
        {/* Task completion status with conditional styling */}
        <p><span className="font-semibold">Status:</span> 
          <span className={`ml-2 px-2 py-1 rounded text-sm ${task.isCompleted ? 'bg-green-600' : 'bg-yellow-600'}`}>
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </span>
        </p>
      </div>
    </div>
  );
}
