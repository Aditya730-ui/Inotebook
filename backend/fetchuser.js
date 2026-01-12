const jwt=require("jsonwebtoken");
const secret="nigga"
const fetchuser=(req,res,next)=>{
    //get user from jwt token 
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Access denied"})
    }
    try{
    const data=jwt.verify(token,secret)
    req.user=data.user;
    next()
    }
    catch(error){
        res.status(401).send({error:"Access denied"})
    }
}
module.exports = fetchuser; 
