const nodemailer= require("nodemailer");

require("dotenv").config({path:"../config.env"})
// console.log(process.env.USER);
// console.log(process.env.PASS);

const sendEmail=async(email,subject,text)=>{
    const transporter=await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"amahip32@gmail.com",
            pass:"Rnbnxmar3@"
        }
    });
    const mailOptions={
        from:"amahip32@gmail.com",
        to:email,
        subject:subject,
        text:text
    };
    await transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Sent");
        }
    })

}
module.exports= sendEmail;