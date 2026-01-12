import {React,useContext, useEffect, useRef,useState} from 'react'
import notecontext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
  const {showalert}=props
  let navigate=useNavigate()
const context=useContext(notecontext);

  const {notes,setnotes,addnote,getnotes,editnote}=context;
   const [text, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" });
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getnotes()
    }else{
      navigate("/login")
    }
  },[])
  const ref=useRef(null)
  const refclose=useRef(null)
  const updatenotes=(currentnote)=>{
    ref.current.click()    
    setnote({id:currentnote._id,etitle: currentnote.title,edescription: currentnote.description,etag: currentnote.tag})
  }
   const handleclick = (e) => {
    e.preventDefault();
      
      refclose.current.click()
       if (text.etitle.trim().length < 3 || text.edescription.trim().length < 8) {
      props.showalert("Title should be atleast 3 characters and description must be atleast 8 characters","danger");
      return;
    }else{
      editnote(text.id, text.etitle, text.edescription, text.etag)
       props.showalert("Note has been edited successfully","success");
    }
  };

  const onchange = (e) => {
    setnote({ ...text, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value)
  };

  return (
    <>
    <Addnote showalert={showalert}/>
  

<button type="button" class="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{display:"none"}}>
  Edit Note
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form>
      <div className="mb-3">
        <label htmlFor="etitle" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="etitle"
          name="etitle"
          value={text.etitle}
          onChange={onchange}
          required
          minLength={5}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="edescription"
          name="edescription"
          value={text.edescription}
          onChange={onchange}
          required
          minLength={8}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="etag" className="form-label">Tag</label>
        <input
          type="text"
          className="form-control"
          id="etag"
          name="etag"
          value={text.etag}
          onChange={onchange}
        />
      </div>
      
    </form>
      </div>
      <div class="modal-footer">
        <button ref={refclose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handleclick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
       <h3>Your Notes</h3>
       <div className="container">
       {notes.length===0 && "no notes to display"}
       </div>
       
    {notes.map((notes)=>{
      return <Noteitem key={notes._id} updatenotes={updatenotes} notes={notes} showalert={showalert}/>
    })} 
    </div>
    

    </>
  )
}
