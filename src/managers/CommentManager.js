export const createComment = (newComment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    }).then((response) => response.json())
}