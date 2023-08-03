import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserPosts } from '../../managers/PostManager'
import "./posts.css";

export function UserPosts({ token }) {
  const [userPosts, setUserPosts] = useState([])

  useEffect(
    () => {
      getUserPosts(token).then((userPostsData) => setUserPosts(userPostsData))
    },
    [token]
  )

  return (
    <div className="container">
      <button className="new-button">New Post +</button>

      <article className="post-list">

        {userPosts.map(
          (postObject) => {

            return <div className="post">
              <div className="header"><Link to={`/posts/${postObject.id}`} key={postObject.id} className='title'>{postObject.title}</Link>Publication Date: {postObject.publication_date}</div>
              <section className="post-data" >
                <img src={postObject.image_url} alt="{postObject.title}" className="article-picture" />
              </section>
              <section className="footer">
                <div className="author-info">Author: {postObject.user.first_name} {postObject.user.last_name}</div>
              </section>

            </div>
          }

        )
        }
      </article >
    </div >
  )
}
