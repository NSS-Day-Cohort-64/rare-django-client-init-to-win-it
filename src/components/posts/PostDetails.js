import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSinglePost } from '../../managers/PostManager'
import { getPostComments } from '../../managers/CommentManager'


function PostDetails() {
  const navigate = useNavigate()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const { postId } = useParams()

useEffect(() => {
  getSinglePost(postId)
    .then(setPost)
  getPostComments(postId)
    .then(setComments)
}, [postId])



  return (
    <section className="post">
      <h3 className="post__title">{post.title}</h3>
      <div className="post__author">{post.author?.full_name}</div>
      <div className="post__category">{post.category?.label}</div>
      <div className="post__publicationDate">{post.publication_date}</div>
      <br />
      <div className="post__content">{post.content}</div>
      <br />
      
      <h4>Comments:</h4>
      <ul className="comments_list">
        {comments.map(comment => (
          <li key={comment.id} className="comment">
            <div className="comment__author">{comment.author?.full_name}</div>
            <div className="comment__timestamp">{comment.time_stamp}</div>
            <div className="comment__content">{comment.content}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostDetails
  
  // < button button onClick = {() => { navigate(`/comments/${postId}`) }}> Write a comment</button >