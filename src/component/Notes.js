import React, { useEffect, useRef, useState } from "react";
// import Modal from "react-modal/lib/components/Modal";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../contexts/notes/notesContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useHistory()
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({ id:'',etitle: "", edescription: "", eteg: "" });


  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }else{
  history.push('/login')
    }
  });


  const ref = useRef(null);
  const refclose=useRef(null);


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,
      etitle:currentNote.title,
      edescription:currentNote.description,
      eteg:currentNote.teg})
  };

  const handleClick = (e) => {
    // console.log("Updated the note",note);
    editNote(note.id,note.etitle,note.edescription,note.eteg)
    ref.current.click();
    props.showAlert(" updated sucessfully","success")
  };


  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
    

      <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display: "none"}}>
    Launch demo modal
  </button>
  

  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              onChange={onChange}
              aria-describedby="emailHelp"
              value={note.etitle}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
              
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="teg">teg</label>
            <input
              type="text"
              className="form-control"
              id="eteg"
              name="eteg"
              value={note.eteg}
              onChange={onChange}
            />
          </div>

          
        </form>
        </div>
        <div className="modal-footer">
          <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button  type="button" className="btn btn-primary" disabled={note.etitle.length<5||note.edescription.length<5}
          onClick={handleClick}>Update Note</button>
        </div>
      </div>
    </div>
  </div>

      <div>
        <div className=" row my-3">
          <div className="container mx-3">
          {notes.length===0&&"no notes to displey please enetr nots to displey"}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
