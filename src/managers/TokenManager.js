// const getAuthHeaders = () => ({
//     "Authorization": `Token ${localStorage.getItem("auth_token")}`,
//     "Content-Type": "application/json"
// });

// export const getUserByToken = (token) => {
//     return fetch(`http://localhost:8000/tokens/${token}`, {
//         headers: getAuthHeaders()
//     })
//     .then(response => response.json())
// }