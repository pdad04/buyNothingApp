import axios from "axios";

export const allPosts = async () => {
  try {
    const res = await axios.get("/api/posts");
    return res;
  } catch (error) {
    const errors = error.response;
    return errors;
  }
}