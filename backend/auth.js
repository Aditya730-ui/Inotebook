
const express = require("express");
const User = require("../models/User"); // Mongoose User model
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const fetchuser=require("../middleware/fetchuser")
const secret="nigga"
// POST /api/auth
router.post("/createuser", [
  // Validation middleware
  body("password", "password must be at least 8 characters").isLength({ min: 8 }),
  body("email", "enter a valid email id").isEmail()
], async (req, res) => {
  const errors = validationResult(req);
 
  // 1️⃣ Return validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ success:false,errors: errors.array() });
  }

  try {
    const salt=await bcrypt.genSalt(10)
    secPass=await bcrypt.hash(req.body.password,salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,         
      password: secPass
    });
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken= jwt.sign(data,secret);
    
    res.json({authtoken,user,success:true});

  } catch (err) {
   
     if (err.code === 11000) {
  
    console.error("Duplicate email error:", err);  // log before sending
    return res.status(400).json({ error: "A user with this email already exists.",success:false });
  }

  console.error("Database Error:", err);  // fallback log
  res.status(500).send("Internal Server Error");
}

  
});

//Authenticate a User using: Post "/api/auth/login"
router.post("/login", [
  // Validation middleware
  body("password", "password must be at least 8 characters").isLength({ min: 8 }),
  body("email", "enter a valid email id").isEmail()
], async (req, res) => {
   body("email", "enter a valid email id").isEmail();
    body("password", "password cannot be blank").exists;
   const errors = validationResult(req);
  
  // 1️⃣ Return validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user= await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credential"})
    }
    const passwordcompare=await bcrypt.compare(password,user.password);
    if (!passwordcompare){
      let success=false
      return res.status(400).json({success,error:"Please try to login with correct credential"})
    }
     const data={
      user:{
        id:user.id
      }
    }
    const authtoken= jwt.sign(data,secret);
    let success=true
    res.json({success,authtoken});
  }catch(error){
    console.error("Database Error:", error);  // fallback log
  res.status(500).send("Internal Server Error");

  }
})
//get user detail after login
router.post("/getuser", fetchuser, async (req, res) => {
  
  try{
         const userId = req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
       }
       catch(error){
         console.error("Database Error:", error);  // fallback log
  res.status(500).send("Internal Server Error");

       }
})
module.exports=router;
