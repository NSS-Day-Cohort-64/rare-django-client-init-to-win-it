const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
  });
  
  export const createCategory = (newCategory) => {
    return fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newCategory),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create category.");
      }
    });
  };
  
  export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: getAuthHeaders()
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch categories.");
      }
    });
  };
  
