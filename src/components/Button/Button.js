import React from "react";
import "./styles.css";

export default function Button({ title, handleEdit }) {
  return handleEdit ? (
    <button className="button" onClick={handleEdit}>
      {title}
    </button>
  ) : (
    <button className="button">{title}</button>
  );
}
