import React, { useState } from 'react';

export const TagForm = ({ handleCreateTag }) => {
  const [tagLabel, setTagLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTag = {
      label: tagLabel
    };

    handleCreateTag(newTag)
      .then(() => {
        setTagLabel(''); // Clear the input field
      })
      .catch((error) => {
        console.error("Failed to create tag:", error);
      });
  };

  return (
    <div className="form">
      <h2 className="form-title">Create Tag</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tagLabel">Name:</label>
        <input
          type="text"
          id="tagLabel"
          value={tagLabel}
          onChange={(e) => setTagLabel(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
};
