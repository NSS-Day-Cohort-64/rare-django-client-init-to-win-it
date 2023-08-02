import React, { useState } from 'react';
import { createTag } from '../../managers/TagManager';

export const TagForm = () => {
  const [tagLabel, setTagLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTag = {
      label: tagLabel
    };

    createTag(newTag)
      .then((response) => {
        if (response.ok) {
          setTagLabel('');
        } else {
          throw new Error('Failed to create tag. Please try again later.');
        }
      })
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
