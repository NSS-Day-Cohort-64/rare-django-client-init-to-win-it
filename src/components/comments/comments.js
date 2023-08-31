import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createComment } from "../../managers/CommentManager"

export const Comments = () => {
    const {postId} = useParams()
    const [postComments, setPostComments ] = useState([])
    const [comment, setComment] = useState("")
    const [newComment, setNewComment] = useState({})
    const localUser = localStorage.getItem('auth_token')
    const localUserObject = JSON.parse(localUser)
    useEffect(() => {
        fetch(`http://localhost:8088/comments/${postId}`)
        .then(res => res.json())
        .then(data => setPostComments(data))
    },[newComment])


    useEffect(() => {

    },[postComments])
    const handleCommentSubmit = () => {
        createComment({
            "author_id": localUserObject,
            "post_id": parseInt(postId),
            "content": comment
        }).then(newComment => setNewComment(newComment))
    }

    return <>
    <h2>{postComments[0]?.post?.title}</h2>
    <section className="comment-section">
        {postComments.map((c) => <div className="comment" key={c.id}>{c.content} - {c.user.username}</div> )}
    </section> 
    <section className="write-comment">
        <input value={comment} onChange={(evt) => setComment(evt.target.value)} id="comment-field" placeholder="write your comment here"/>
        <button onClick={handleCommentSubmit}>submit comment</button>
    </section>
    </>
}