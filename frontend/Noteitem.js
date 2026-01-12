import React, { useContext } from 'react'
import notecontext from '../context/notes/NoteContext'
export default function Noteitem(props){
    const context=useContext(notecontext)
    const {deletenote}=context
  return (
    <>
    <div className="col-md-3">
 <div className="card my-3" style={{width: "18rem"}}>
  
  <div className="card-body">
    <h5 className="card-title">{props.notes.title}</h5>
    <p className="card-text">{props.notes.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(props.notes._id);props.showalert("Successfully deletd","success")}}></i>
    <i className="fa-solid fa-pen mx-2" onClick={()=>{props.updatenotes(props.notes)}}></i>
    
  </div>
</div>
    </div>
    </>
  )
}
