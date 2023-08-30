import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { getAllPosts } from "../../managers/PostManager"


export const PostList = () => {

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(
    () => {
      getAllPosts().then((postsData) => setPosts(postsData))
    },
    []
  )

  return (
    <div className="container">
      <h1 className="posts-title">All Posts</h1>

      <article className="">
        {posts.map(
          (postObject) => {

            return <div className="post">

              <div className="title"><Link to={`/posts/${postObject.id}`} key={postObject.id}>{postObject.title}</Link></div>
              <section className="" >
                <div>{postObject.author.full_name}</div>
                <div>{postObject.category.label}</div>
              </section>
            </div>
          }

        )
        }
      </article >
            <Link to="/posts/create" className="add-post-button">
        Add Post +
      </Link>
    </div >
  )
}






