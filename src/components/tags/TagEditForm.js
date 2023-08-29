import React, { useState, useEffect } from 'react';

export const TagEditForm = ({ tagId, initialLabel, handleUpdateTag }) => {
  const [tagLabel, setTagLabel] = useState('');

  // Populate the initial value when the component mounts
  useEffect(() => {
    setTagLabel(initialLabel);
  }, [initialLabel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTag = {
      label: tagLabel
    };

    handleUpdateTag(tagId, updatedTag);
    setTagLabel(''); // Optionally clear the input field
  };

  return (
    <div className="form">
      <h2 className="form-title">Edit Tag</h2>
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
        <button type="submit">Update Tag</button>
      </form>
    </div>
  );
};
