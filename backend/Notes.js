const { type } = require('@testing-library/user-event/dist/type')
const mongoose=require('mongoose')
const NotesSchema= new mongoose.Schema({
    user: {
    type : mongoose.Schema.Types.ObjectId,  // This stores the user's ID
    ref: 'user',                           // Reference to the 'User' model
    required: true                         // User field is required
  },
    title:{
        type: String,
        required: true
    },
    description:{
          type: String,
          default: "general",
          required:true
    },
    tag:{
        type : String,
       
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.model("notes",NotesSchema)