"use client"; // Indicates this is a client-side rendered component.

import React, { useState } from "react";
import axios from "../../axiosConfig"; // Axios instance for API requests.
import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation.
import { Eye, EyeOff } from "lucide-react"; // Icons for password visibility toggle.

export default function SignUp() {
  // State to manage form inputs.
  const [username, setUsername] = useState(""); // Username input state.
  const [email, setEmail] = useState(""); // Email input state.
  const [password, setPassword] = useState(""); // Password input state.
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility.
  const [error, setError] = useState(""); // State to store error messages.
  const router = useRouter(); // Next.js router instance for navigation.

  // Function to handle form submission.
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior.
    setError(""); // Clear any previous errors.
    try {
      // Send signup request to the backend.
      await axios.post("/Users/signup", {
        username,
        email,
        password,
      });
      router.push("/login"); // Redirect to login page on successful signup.
    } catch (err: any) {
      // Handle errors and display appropriate error messages.
      const message =
        err.response?.data?.message || err.response?.data || "Signup failed";
      setError(message.toString());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {/* Signup form container */}
      <div className="w-full max-w-md p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Signup form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Username input */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state.
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email input */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state.
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility.
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state.
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              {/* Button to toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state.
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Link to login page */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
