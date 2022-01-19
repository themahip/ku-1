const cookieParser= require("cookie-parser");
const Student= require("../models/studentSchema.js");

const auth2= async (req,res,next)=>{
    try {
        const email= await req.cookies.email;
        req.email=email;     
        next();
    } catch (error) {
        console.log(error);
    }
    }
       module.exports=auth2;