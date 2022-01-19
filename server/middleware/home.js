const express=require("express");
const cookieParser = require("cookie-parser");
const jwt= require("jsonwebtoken");
const Student= require("../models/studentSchema");
const dotenv= require("dotenv");
const app= express();

app.use(cookieParser());
dotenv.config({path:"../config.env"});

const home= async (req,res,next)=>{

    try {
        const token= req.cookies.jwt;
        
        const sec=process.env.SECRET_KEY;
        const verifyUser= jwt.verify(token,sec);
        
        const student= await Student.findOne({_id:verifyUser._id});
    
      
    
      
      if(verifyUser){
          res.redirect("/dashboard")
      }
     
     
    } catch (error) {
        
        next();
    
    }
       
    
    }
    
    module.exports=home;
       
    