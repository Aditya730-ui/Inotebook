import React, { useContext, useState } from 'react';
import notecontext from '../context/notes/NoteContext';

export default function Addnote(props) {
  const context = useContext(notecontext);
  const { addnote } = context;

  const [notes, setnote] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefault(); 
    if (notes.title.trim().length < 3 || notes.description.trim().length < 8) {
      props.showalert("Title should be atleast 3 characters and description must be atleast 8 characters","danger");
      return;
    }else{
  addnote(notes.title, notes.description, notes.tag);
  props.showalert("Notes has been added successfully","success")
  setnote({ title: "", description: "", tag: "" });
    }
  };

  const onchange = (e) => {
    setnote({ ...notes, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value)
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={notes.title}
          onChange={onchange}
         
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={notes.description}
          onChange={onchange}
          
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={notes.tag}
          onChange={onchange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleclick}>
        Submit
      </button>
    </form>
  );
}


