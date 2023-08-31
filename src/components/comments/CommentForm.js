// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from "react-router-dom"
// import { getUserByToken } from '../../managers/TokenManager'
// import { getSinglePost } from '../../managers/PostManager'
// import { createComment } from '../../managers/CommentManager'



// export const CommentForm = () => {
//     const {postId } = useParams()
//     const navigate = useNavigate()
//     const [token, setToken] = useState(localStorage.getItem('auth_token'))
//     const [user, setUser] = useState()
//     const [comment, setComment] = useState({
//         post: 0,
//         author: 0,
//         content: ""
//     })
//     const [post, setPost] = useState({})

//     useEffect(() => {
//         if (postId) {
//             getSinglePost(postId).then(postData => setPost(postData))
//         }
//     }, [postId])

//     useEffect(() => {
//         if (token) {
//             getUserByToken(token).then(data => setUser(data.user))
//         }
//     }, [token])

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         const commentToSendToAPI = {
//             post: post.id,
//             author: user.id,
//             content: comment.content
//         }
//         createComment(commentToSendToAPI)
//             .then(() => {
//                 navigate(`/posts/${postId}`)
//             })
//     }

//     return (
//         <div className="commentForm">
//             <h2 className="commentForm__header">Write us a comment</h2>
//             <form onSubmit={handleSubmit}>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="commentFormHTML" className="commentContent">Comment:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="Let the world know how you feel about this"
//                         value={comment.content}
//                         onChange={(event) => {
//                             const copy = {...comment}
//                             copy.content = event.target.value
//                             setComment(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//                 <br />
//                 <button type="submit">Post Comment</button>
//             </form>
//         </div>
//     )
// }