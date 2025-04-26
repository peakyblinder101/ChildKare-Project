import { useState } from "react";
import axios from "axios";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Access the API URL from the environment variables
     // const apiUrl = import.meta.env.VITE_API_ENDPOINT;

      // Make the API call using axios, passing the URL from the env
      const response = await axios.post('https://8fdsdscs-5000.asse.devtunnels.ms/api/login', {
        email,
        password,
      });
      console.log("Login response:", response.data); // Log the response for debugging

      // Extract token and user data from the response
      const { token, user } = response.data;

      // Save token and user data to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      return { success: true, user }; // login success
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
      return { success: false, error: err };
    }
  };

  return { login, loading, error };
}
