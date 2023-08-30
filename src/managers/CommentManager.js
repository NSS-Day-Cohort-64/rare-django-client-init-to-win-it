const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const createComment = (newComment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newComment),
    }).then((response) => response.json())
}

export const getPostComments = (postId) => {
    return fetch(`http://localhost:8000/comments?post_id=${postId}`, {
        headers: getAuthHeaders()
    })
        .then(res => res.json());
};