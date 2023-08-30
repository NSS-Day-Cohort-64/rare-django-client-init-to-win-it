import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../../managers/CategoryManager';
import { CategoryForm } from './CategoryForm';
import { CategoryEditForm } from './CategoryEditForm';
import './categories.css';

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryLabel, setEditingCategoryLabel] = useState('');

  useEffect(() => {
    getCategories().then((categoryData) => setCategories(categoryData));
  }, []);

  const handleCreateCategory = (newCategory) => {
    return createCategory(newCategory)
      .then((response) => {
        if (response && response.id) {
          const updatedCategories = [...categories, response];
          updatedCategories.sort((a, b) => a.label.localeCompare(b.label));
          setCategories(updatedCategories);
        } else {
          throw new Error('Failed to create a category.');
        }
      });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(categoryId)
        .then(() => {
          const updatedCategories = categories.filter(category => category.id !== categoryId);
          setCategories(updatedCategories);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateCategory = (categoryId, updatedCategory) => {
    updateCategory(categoryId, updatedCategory)
      .then(() => {
        const updatedCategories = categories.map(category => {
          if (category.id === categoryId) {
            return { ...updatedCategory, id: categoryId };
          }
          return category;
        });
        setCategories(updatedCategories);
      })
      .catch((error) => console.error(error));
  };

  const startEditing = (categoryId, label) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryLabel(label);
  };

  const stopEditing = () => {
    setEditingCategoryId(null);
    setEditingCategoryLabel('');
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Categories</h1>
      <div className="tag-container">
        <div className="left-side">
          <ul className="list">
            {categories.map((category) => (
              <li key={category.id} className="list-items">
                <div className="list-name">{category.label}</div>
                <div className="edit-and-delete">
                  <button className="edit-button" onClick={() => startEditing(category.id, category.label)}>Edit</button>{" "}
                  <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-side">
          {editingCategoryId ? (
            <CategoryEditForm
              categoryId={editingCategoryId}
              initialLabel={editingCategoryLabel}
              handleUpdateCategory={(categoryId, updatedCategory) => {
                handleUpdateCategory(categoryId, updatedCategory);
                stopEditing();
              }}
            />
          ) : (
            <CategoryForm handleCreateCategory={handleCreateCategory} />
          )}
        </div>
      </div>
    </div>
  );
};
