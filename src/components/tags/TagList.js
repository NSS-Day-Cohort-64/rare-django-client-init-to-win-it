import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTags, createTag, deleteTag, updateTag } from '../../managers/TagManager';
import { TagForm } from './TagForm';
import { TagEditForm } from './TagEditForm';
import './tags.css';

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTagLabel, setEditingTagLabel] = useState('');

  useEffect(() => {
    getAllTags().then((tagData) => setTags(tagData));
  }, []);

  const handleCreateTag = (newTag) => {
    return createTag(newTag)
      .then((response) => {
        if (response && response.id) {
          const updatedTags = [...tags, response];
          updatedTags.sort((a, b) => a.label.localeCompare(b.label));
          setTags(updatedTags);
        } else {
          throw new Error('Failed to create tag.');
        }
      });
  };

  const handleDeleteTag = (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteTag(tagId)
        .then(() => {
          const updatedTags = tags.filter(tag => tag.id !== tagId);
          setTags(updatedTags);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateTag = (tagId, updatedTag) => {
    updateTag(tagId, updatedTag)
      .then(() => {
        const updatedTags = tags.map(tag => {
          if (tag.id === tagId) {
            return { ...updatedTag, id: tagId };
          }
          return tag;
        });
        setTags(updatedTags);
      })
      .catch((error) => console.error(error));
  };

  const startEditing = (tagId, label) => {
    setEditingTagId(tagId);
    setEditingTagLabel(label);
  };

  const stopEditing = () => {
    setEditingTagId(null);
    setEditingTagLabel('');
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Tags</h1>
      <div className="tag-container">
        <div className="left-side">
          <ul className="list">
            {tags.map((tag) => (
              <li key={tag.id} className="list-items">
                <div className="list-name">{tag.label}</div>
                <div className="edit-and-delete">
                  <button className="edit-button" onClick={() => startEditing(tag.id, tag.label)}>Edit</button>{" "}
                  <button className="delete-button" onClick={() => handleDeleteTag(tag.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-side">
          {editingTagId ? (
            <TagEditForm
              tagId={editingTagId}
              initialLabel={editingTagLabel}
              handleUpdateTag={(tagId, updatedTag) => {
                handleUpdateTag(tagId, updatedTag);
                stopEditing();
              }}
            />
          ) : (
            <TagForm handleCreateTag={handleCreateTag} />
          )}
        </div>
      </div>
    </div>
  );
};
