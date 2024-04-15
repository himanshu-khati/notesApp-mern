import React, { useState } from "react";

export interface Props {
  title: string;
  description: string;
  id: string;
  updateHandler: (id: string, title: string, description: string) => void;
  deleteHandler: (id: string) => void;
}
const NoteItem: React.FC<Props> = ({
  title,
  description,
  updateHandler,
  deleteHandler,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleUpdateClick = () => {
    setIsEditing(false);
    updateHandler(id, editedTitle, editedDescription);
  };

  return (
    <div className="note">
      <div>
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
        ) : (
          <>
            <h4>{title}</h4>
            <p>{description}</p>
          </>
        )}
      </div>
      <div>
        <button className="btn" onClick={() => deleteHandler(id)}>
          Delete
        </button>
        {isEditing ? (
          <button className="btn" onClick={handleUpdateClick}>
            Update
          </button>
        ) : (
          <button className="btn" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
