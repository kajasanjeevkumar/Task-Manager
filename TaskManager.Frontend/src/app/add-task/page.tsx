'use client'; // Indicates that this file is a client-side component in Next.js

import { useState } from 'react'; // React hook for managing state
import axios from '../../axiosConfig'; // Axios instance configured with a base URL
import { useRouter } from 'next/navigation'; // Next.js hook for programmatic navigation

// Main component for adding a new task
export default function AddTaskPage() {
  const router = useRouter(); // Hook for navigating programmatically

  // State variables for managing form inputs and error messages
  const [title, setTitle] = useState(''); // Task title
  const [description, setDescription] = useState(''); // Task description
  const [dueDate, setDueDate] = useState(''); // Task due date
  const [priority, setPriority] = useState(0); // Task priority (0 = Low, 1 = Medium, 2 = High)
  const [category, setCategory] = useState('Personal'); // Task category
  const [error, setError] = useState(''); // Error message state

  // Handle form submission to add a new task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to create a new task
      await axios.post('/TodoItems', {
        title,
        description,
        dueDate,
        isCompleted: false, // New tasks are incomplete by default
        priority,
        category
      });
      router.push('/'); // Navigate back to the home page after successful task creation
    } catch (err: any) {
      setError('Error adding task.'); // Set an error message if the API call fails
      console.error(err); // Log the error for debugging
    }
  };

  // Render the form for adding a new task
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Task</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>} {/* Display error message if any */}

      <form onSubmit={handleSubmit} className="space-y-5 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Title input */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Description input */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Due date input */}
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Priority input */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={e => setPriority(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>

        {/* Category input */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Health</option>
            <option>Study</option>
            <option>Other</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition duration-200 cursor-pointer"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}