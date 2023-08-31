import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CategoryForm } from "../components/categories/CategoryForm"
import { PostList } from "../components/posts/PostsList"
import PostDetails from "../components/posts/PostDetails"
import { EditPostDetails } from "../components/posts/EditPost"
import { TagList } from "../components/tags/TagList"
import { Category } from "../components/categories/Category"
import { UserPosts } from "../components/posts/UserPosts"
import { UserList } from "../components/users/UserList"
import { Comments } from "../components/comments/comments"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} >
        <Route path=":postId/edit" element={<EditPostDetails setToken={setToken} />} />

        <Route path="/posts">
          <Route index element={<PostList setToken={setToken} />} />
          <Route path=":postId" element={<PostDetails setToken={setToken} />} />
        </Route>
        <Route path="/comments/:postId" element={<Comments token={token} />} />


        <Route path="myPosts" element={<UserPosts token={token} setToken={setToken} />} />

        <Route path="/categories">
          <Route index element={<Category setToken={setToken} />} />
        </Route>

        <Route path="/tags">
          <Route index element={<TagList setToken={setToken} />} />
        </Route>

        <Route path="/users">
          <Route index element={<UserList setToken={setToken} />} />
        </Route>
      </Route>

    </Routes>
  </>
};
