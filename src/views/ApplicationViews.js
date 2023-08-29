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
import { PostForm } from "../components/posts/PostForm"
import { useState, useEffect } from "react"
import { getCategories } from "../managers/CategoryManager"
import { getAllTags } from "../managers/TagManager"


export const ApplicationViews = ({ token, setToken }) => {

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch categories and tags from the server and update the state
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getAllTags().then((tagsData) => setTags(tagsData));
  }, []);


  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} >
        <Route path=":postId/edit" element={<EditPostDetails setToken={setToken} />} />

        <Route path="/posts">
          <Route index element={<PostList setToken={setToken} />} />
          <Route path=":postId" element={<PostDetails setToken={setToken} />} />
          <Route path="create" element={<PostForm token={token} setToken={setToken} categories={categories} tags={tags} />} />
        </Route>

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
