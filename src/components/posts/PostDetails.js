import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSinglePost } from '../../managers/PostManager'
import { getPostComments } from '../../managers/CommentManager'
import "./postdetail.css";

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

  // Function to format date and time
  const formatDateAndTime = (dateString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);
    return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
  }

  return (
    <section className="post">
      <h3 className="post__title">{post.title}</h3>
      <div className="post__author">Author: {post.author?.full_name}</div>
      <div className="post__category">Category: {post.category?.label}</div>
      <div className="post__publicationDate">Date: {formatDateAndTime(post.publication_date)}</div>
      <br />
      <div className="post__content">{post.content}</div>
      <br />
      
      <h4>Comments:</h4>
      <ul className="comments_list">
        {comments.map(comment => (
          <li key={comment.id} className="comment">
            <div className="comment__author">{comment.author?.full_name}</div>
            <div className="comment__timestamp">{formatDateAndTime(comment.time_stamp)}</div>
            <div className="comment__content">{comment.content}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostDetails
