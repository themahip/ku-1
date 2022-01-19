const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const studentSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_no:{
        type:String,
        required:true
    },
    hashpassword:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    OTPs:[
        {
          OTP:{
            type:String,
            expires:Date(Date.now()+30000)
          } 
        }
    ]
});
studentSchema.methods.generateAuthToken= async function(){
    try {
        const sec=process.env.SECRET_KEY;
        const token=jwt.sign({_id:this._id.toString()},sec);
        this.tokens= this.tokens.concat({token});
        this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
studentSchema.methods.generateOtp= async function(){
try {
    const OTP= Math.floor(Math.random()*1000000);
    this.OTPs=this.OTPs.concat({OTP});
    this.save();
    
    return OTP;
} catch (error) {
    console.log(error);
}
}

const Student= mongoose.model("student",studentSchema);

module.exports= Student;