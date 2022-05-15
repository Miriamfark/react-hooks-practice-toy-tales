import React from "react";

function ToyForm({ handleFormSubmit, handleNameChange, handleImageChange, formName, formImage }) {
  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          onChange={handleNameChange}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formName}
        />
        <br />
        <input
          onChange={handleImageChange}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formImage}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
