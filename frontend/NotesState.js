import react, { useState } from "react";
import notecontext from "./NoteContext";
const NoteState=(props)=>{
  const host="http://localhost:5000"
   const [notes, setnote] = useState([]);
     //fetch all notes
     const getnotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchnotes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
     });
     const json=await response.json()
     console.log(json)
     setnote(json)
    }
  //add note function
   const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json(); // the new note returned by backend
    setnote(notes.concat(json)); // add to local state
  };
  // const addnote=(title,description,tag)=>{
  //   let note={
  //   "_id": "68838d3b1a3c20979c8c7a24",
  //   "user": "687e5b557d1d5bf3cc7a18ed",
  //   "title": title,
  //   "description": description,
  //   "tag": tag,
  //   "date": "2025-07-25T13:57:15.286Z",
  //   "__v": 0
  // };
  // setnote(notes.concat(note))
  // }
  //delete note
      const deletenote=async(id)=>{
          const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
      
     });
     const json= response.json();
        const newnote=notes.filter((note)=>{
         return note._id!==id
        })
        setnote(newnote);
      }
  //editnote
  const editnote=async(id,title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
     });
     const json= await response.json();
     for(let index=0;index<notes.length;index++){
      const element=notes[index];
      if(element._id===id){
        notes[index].title=title;
         notes[index].description=description;
         notes[index].tag=tag
         break;
      }
     }
     setnote([...notes])
  }
     
       return(
        <notecontext.Provider value={{notes,setnote,addnote,deletenote,editnote,getnotes}}>
                  {props.children}
        </notecontext.Provider>
       )
}
export default NoteState