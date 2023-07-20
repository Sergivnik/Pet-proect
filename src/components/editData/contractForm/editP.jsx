import React, { useState, useEffect } from "react";

export const EditP = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(children);
  const [heightP, setHeightP] = useState(null);

  useEffect(() => {
    setText(children);
    let pEdit = document.querySelector(".editP");
    let heightP = pEdit.getBoundingClientRect().height;
    setHeightP(heightP);
  }, [children]);
  useEffect(() => {
    if (isEditing) {
      let textEdit = document.querySelector(".textareaEditP");
      textEdit.style.height = `${heightP}px`;
    }
  }, [isEditing]);

  const handleDoubleClick = (e) => {
    setIsEditing(true);
    let pEdit = e.currentTarget;
    let heightP = pEdit.getBoundingClientRect().height;
    setHeightP(heightP);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <textarea
      className="textareaEditP"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <p className="editP" onDoubleClick={handleDoubleClick}>
      {text}
    </p>
  );
};
