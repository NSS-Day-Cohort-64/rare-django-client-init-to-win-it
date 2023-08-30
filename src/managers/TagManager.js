export const createTag = (newTag) => {
  return fetch("http://localhost:8000/tags", {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTag),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create tag.");
      }
    });
};

export const getAllTags = () => {
  return fetch("http://localhost:8000/tags", {
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
        throw new Error("Failed to fetch tags.");
      }
    });
};


export const deleteTag = (tagId) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete tag.");
    }
  });
};

export const updateTag = (tagId, updatedTag) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTag),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update tag.");
    }
  });
};


