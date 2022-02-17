import React, { useState } from "react";
import { useContext } from "react";

import noteContext from "../contexts/notes/notesContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;


  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.descreption, note.teg);
    setNote({ title: "", descreption: "", teg: "" })
  };

  const [note, setNote] = useState({ title: "", descreption: "", teg: "General" });
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
             
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="descreption">Descreption</label>
            <input
              type="text"
              className="form-control"
              id="descreption"
              name="descreption"
              value={note.descreption}
              onChange={onChange}
              
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="teg">teg</label>
            <input
              type="text"
              className="form-control"
              id="teg"
              name="teg"
              value={note.teg}
              onChange={onChange}
            />
          </div>


          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
            disabled={note.title.length<5||note.descreption.length<5}
          >
            Add Note
          </button>
        </form>
        <h2>Your Notes</h2>
      </div>
    </div>
  );
};

export default AddNote;
