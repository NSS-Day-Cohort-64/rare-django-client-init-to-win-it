export const createCategory = (newCategory) => {
    return fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
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
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch categories.");
        }
      });
  };
  
  
  export const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }
    });
  };
  
  export const updateCategory = (categoryId, updatedCategory) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update category.");
      }
    });
  };
  
