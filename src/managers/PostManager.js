const getAuthHeaders = () => ({
  "Authorization": `Token ${localStorage.getItem("auth_token")}`,
  "Content-Type": "application/json"
});

export const getAllPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: getAuthHeaders()
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch post.");
    }
  });
};

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    headers: getAuthHeaders()
  })
  .then(res => res.json());
};

export const getUserPosts = (userId) => {
  return fetch(`http://localhost:8000/posts?user_id=${userId}`, {
    headers: getAuthHeaders()
  })
  .then(res => res.json());
};

export const editPost = (postId, updatedPostData) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedPostData),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to edit post.");
    }
  });
};


