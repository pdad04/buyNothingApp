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
    
  } catch (error) {
    
  }

}

export const deleteComment = async (commentId, token) => {
  const config = {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  }
  
  try {
    const res = await axios.delete(`/api/comments/${commentId}/remove`, config);
    return res;
  } catch (error) {
    return error
    console.log(error);
  }
}