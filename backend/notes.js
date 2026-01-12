const express=require("express")
const router= express.Router()
const notes=require("../models/Notes")
const fetchuser=require("../middleware/fetchuser")
const {body,validationResult}=require("express-validator")
//get all notes
router.get("/fetchnotes",fetchuser,async (req,res)=>{
    try {
        const Notes=await notes.find({user:req.user.id});
        res.json(Notes)
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
    
})
//add notes
router.post("/addnotes",fetchuser,[
    body('title',"enter a valid title").isLength({min:4}),
     body('description',"description must be atleast 6 characters").isLength({min:6}),
    ],async (req,res)=>{
        try {
            const {title,description,tag}= req.body;
             const errors = validationResult(req);
          
          // 1️⃣ Return validation errors if any
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        
             const note= new notes({
                title,description,tag,user:req.user.id
             })
             const savednote=await note.save()
             res.json(savednote)
            
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    
})
//update an existing note
router.post("/updatenotes/:id",fetchuser,async (req,res)=>{
    try{
    const {title,description,tag}= req.body;
    const newnote={
    }
    if (title){
        newnote.title=title
    }
     if (description){
        newnote.description=description
    }
     if (tag){
        newnote.tag=tag
    }
    //find the note to be updated and update it
    let findnote= await notes.findById(req.params.id);
    if(!findnote)
    {
        return res.status(404).send("not found")
    }
    if (findnote.user.toString()!==req.user.id){
        return res.status(401).send("Unauthorized Access")
    }
    updatednote= await notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(updatednote);
}catch(error){
    res.status(500).send("Internal Server Error");
}
})
//deletenote
router.post("/deletenotes/:id",fetchuser,async (req,res)=>{
     try{
     let findnote= await notes.findById(req.params.id);
     if(!findnote)
    {
        return res.status(404).send("not found")
    }
    //allow deletion if user owns this note
    if (findnote.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }
     findnote=await notes.findByIdAndDelete(req.params.id) 
     res.json({"success":"note has been deleted","newnote":findnote}) 
    }catch(error){
        res.status(500).send("Internal Server Error");
}
})

module.exports=router;