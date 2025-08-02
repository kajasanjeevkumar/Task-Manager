"use client";
import React, { useState } from "react";
import axios from "../../axiosConfig";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Users/login", { username, password });
      const token = response.data.token;

      // Save JWT token to localStorage
      localStorage.setItem("token", token);

      // Decode the token to check the user's role
      const decoded: { [key: string]: any } = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // Redirect based on role
      console.log(decoded);
      if (role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.response?.data || "Login failed";
      console.error(message);
      setError(message.toString());
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
