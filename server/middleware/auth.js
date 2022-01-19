const express=require("express");
const cookieParser = require("cookie-parser");
const jwt= require("jsonwebtoken");
const Student= require("../models/studentSchema");
const dotenv= require("dotenv");
const app= express();

app.use(cookieParser());
dotenv.config({path:"../config.env"});

const auth= async (req,res,next)=>{

    try {
        
        const token= req.cookies.jwt;
        console.log(token);
        
        const sec=process.env.SECRET_KEY;
        const verifyUser= jwt.verify(token,sec);
        
        const student= await Student.findOne({_id:verifyUser._id});
        
        req.user=student;
    
        next();
    } catch (error) {
        
        res.redirect("/")
    }
       
    
    }
    
    module.exports=auth;
