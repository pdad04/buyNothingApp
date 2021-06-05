import axios from "axios";

export const createComment = async (formData, token, postId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  const body = JSON.stringify(formData)
  
  try {
    const res = await axios.post(`/api/comments/${postId}/create`, body, config);
    console.log(res);
  } catch (error) {
    
  }

}