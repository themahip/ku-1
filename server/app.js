const express= require("express");
const app= express();
require("dotenv").config({path:"./config.env"})
const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const otp= require("./mailer/otp")
const validator= require("email-validator");
const crypto= require("crypto");
const jwt=require("jsonwebtoken");
const auth= require("./middleware/auth");
const auth2= require("./middleware/auth2");
const home= require("./middleware/home");
const sendEmail= require("./mailer/link");
const { Mongoose } = require("mongoose");
const Token= require("./models/token");
const Student = require("./models/studentSchema");
const PORT= process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env.URL);

app.post("/register",async(req,res)=>{
    const {name, email, phone_no, password, cpassword, department, year}=req.body;
    const hashpassword= await bcrypt.hash(password,10)

    if(!name || !email || !phone_no || !password || !cpassword || !department || !year){
        res.status(200).send("Please fill in all the places");
    }
    if(password!==cpassword){
        res.status(200).send("Password didn't match");
    }
    if(!validator.validate(email)){
        res.status(200).send("email doesnot validate");
    }
    if(password.length<8){
        res.status(200).send("password must be greater than 8");
    }
    else{
        const student= await Student.findOne({email:email});
        if(student){
            res.status(200).send("user already exist");
        }
        else{
            const newStudent= await new Student({
                name,
                email,
                phone_no,
                hashpassword,
                department,
                year
            });
            newStudent.save((error)=>{
                if(error){
                    console.log(er);
                }
                else{
                    console.log("stored");
                }
            });
            const token= await new Token({
                userId:newStudent._id,
                token:crypto.randomBytes(32).toString("hex"),
            }).save();
                const message=`http://localhost:3000/verify/${token.userId}/${token.token}`
                await sendEmail(newStudent.email,"verify",message);
        }
    } 
});

app.get("/verify/:id/:token",async(req,res)=>{
    try {
        const userId= await Student.findOne({_id:req.params.id});
        console.log(userId);
        if(!userId){
            res.status(200).send("invlaid link");
        }
        const token= await Token.findOne({
            userId:userId._id,
            token:req.params.token
        });
        console.log(token);
        if(!token){
            res.status(200).send("invlaid link");
        }
        else{
            await Student.updateOne({_id:req.params.id,verified:true});
            await Token.findByIdAndRemove(token._id);
            res.send("verified")
            console.log("link verified");
        }
           
        
    } catch (error) {
        
    }
})

app.post("/login",async(req,res)=>{
    const {email, password}= req.body;
    const student=await Student.findOne({email:email});
    const isMatch=await bcrypt.compare(password,student.hashpassword);

    if(!student){
        res.status(200).send("Email is not registered")
    }
    if(student.verified===false){
        res.status(200).send("Email is not verified");
    }
    
    
    if(isMatch){
        res.send("match");
        const token=await student.generateAuthToken();
                    console.log(token);
                    res.cookie("jwt",token,{
                        expire:new Date(Date.now()+5000000),
                        httpOnly:true,
                        // secure:true  --only can be used in production version. So uncomment when deploying..
                 
                    });
    }
    else{
        
        res.status(200).send("Password didn't match");
    }

    
});

app.post("/forgot",(req,res)=>{
    const email= req.body.email;
    const student= Student.findOne({email:email});
    if(!student){
        res.status(200).send("Email doesnot exist");
    }
    else{
        res.cookie("email",email,{
            httpOnly:true,
            expire:Date(Date.now()+30000)
        })
    }

});

app.post("/verification",auth2,(req,res)=>{
  const email= req.email;
  const verStudent= Student.findOne({email:email});
  const length= verUser.OTPs.length;
    otp(verUser.email,verUser.OTPs[length-1].OTP);
})

app.listen(PORT,()=>{
    console.log(`the app is running on port ${PORT}`);
})