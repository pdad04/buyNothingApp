import axios from "axios";

export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", body, config);
    return res;
  } catch (error) {
    const errors = error.response.data.errors
    return errors;
  }
}