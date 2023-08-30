import React, { useState, useEffect } from 'react';

export const CategoryEditForm = ({ categoryId, initialLabel, handleUpdateCategory }) => {
  const [categoryLabel, setCategoryLabel] = useState('');

  // Populate the initial value when the component mounts
  useEffect(() => {
    setCategoryLabel(initialLabel);
  }, [initialLabel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      label: categoryLabel
    };

    handleUpdateCategory(categoryId, updatedCategory);
    setCategoryLabel(''); // Optionally clear the input field
  };

  return (
    <div className="form">
      <h2 className="form-title">Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryLabel">Name:</label>
        <input
          type="text"
          id="categoryLabel"
          value={categoryLabel}
          onChange={(e) => setCategoryLabel(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};
