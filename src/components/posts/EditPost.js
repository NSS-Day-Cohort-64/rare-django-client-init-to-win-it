import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, editPost } from "../../managers/PostManager";
import { getAllTags } from "../../managers/TagManager";
import { getCategories } from "../../managers/CategoryManager";

export const EditPostForm = ({ token }) => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPost, setCurrentPost] = useState({
        title: "",
        content: "",
        category: "",
        tags: [],
    });

    useEffect(() => {
        // Fetch categories and tags here
        getCategories().then((categoriesData) => setCategories(categoriesData));
        getAllTags().then((tagsData) => setTags(tagsData));

        // Fetch the post data using postId
        getSinglePost(postId).then((postData) => {
            setCurrentPost({
                author: token,
                title: postData.title,
                content: postData.content,
                category: postData.category.id,
                tags: postData.tags.map((tag) => tag.id),
            });
        });
    }, [postId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedPost = {
            title: currentPost.title,
            content: currentPost.content,
            category: parseInt(currentPost.category),
            tags: currentPost.tags.map((tag) => parseInt(tag)),
        };

        editPost(postId, updatedPost)
            .then(() => navigate(`/posts/${postId}`));
    };

    return (
        <form className="postForm">
            <h2 className="postForm__title">Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        required
                        autoFocus
                        className="form-control"
                        value={currentPost.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        required
                        className="form-control"
                        value={currentPost.content}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        className="form-control"
                        value={currentPost.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Add tags here */}
            </fieldset>

            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
            >
                Update
            </button>
        </form>
    );
};
