import { useState, useEffect } from 'react'; // React hooks for managing state and side effects
import axios from '../../axiosConfig'; // Axios instance for making HTTP requests
import { Task } from './types'; // Import the Task type definition (adjust path if necessary)

// Custom hook to fetch and manage tasks
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store the list of tasks
  const [loading, setLoading] = useState(true); // State to indicate whether data is being loaded
  const [error, setError] = useState<string | null>(null); // State to store any error messages

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('/TodoItems'); // Fetch tasks from the API endpoint
      setTasks(response.data); // Update the tasks state with the fetched data
    } catch (err: any) {
      setError(err.message); // Set an error message if the API call fails
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // useEffect to fetch tasks when the component using this hook mounts
  useEffect(() => {
    fetchTasks(); // Call the fetchTasks function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Return the tasks, loading state, error message, and a refetch function
  return { tasks, loading, error, refetch: fetchTasks };
};

export default useTasks; // Export the custom hook for use in other components
