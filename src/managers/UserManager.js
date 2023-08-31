const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
  });
  
  export const getAllUsers = () => {
    return fetch("http://localhost:8000/users", {
      headers: getAuthHeaders()
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch users.");
      }
    });
  };
  

  export const getUserById = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
      headers: getAuthHeaders()
    })
      .then(res => res.json());
  };

  export const getAuthorById = (authorId) => {
    return fetch(`http://localhost:8000/author/${authorId}`, {
        headers: getAuthHeaders()
        })
        .then(res => res.json());
    };