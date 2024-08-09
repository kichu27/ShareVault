import axios from "axios";

export const refreshSession = async () => {
  try {
    console.log("Refreshing session...");
    const response = await axios.get("http://localhost:3000/api/auth/session");
    console.log("Session data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error refreshing session:", error);
    return null;
  }
};
