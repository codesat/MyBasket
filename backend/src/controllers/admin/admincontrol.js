const User=require("../../models/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const shortid=require("shortid")


//signup

const signupcontrol=async(req,res)=>{

    const {
        fname,
        lname,
        email,
        password
    }=req.body;

   const user= await User.findOne({email});
        if(!user){

            const hashed=await bcrypt.hash(password,10);

            const newuser=new User({
                fname,
                lname,
                email,
                password:hashed,
                username:shortid.generate(),
                role:"admin"
            });

         await newuser.save((err,userdata)=>{

            if(err){
                return res.status(400).json({
                    msg:"error in admin creation"
                })
            }
            if(userdata){

                return res.status(200).json({
                    token:jwt.sign({id:newuser._id},process.env.SECRETKEY,{expiresIn:"1d"}),
                    user:userdata
                })
            }
         });

        }else{
            return res.status(400).json({
                msg:"admin already exits"
            })
        }
    }

//signin

const signincontrol=async(req,res)=>{

    const user=await User.findOne({email:req.body.email});

    if(user){

        //password compare
    const matchpass=await bcrypt.compare(req.body.password,user.password);

    if(matchpass && user.role==="admin"){

        const token=jwt.sign({id:user._id,role:user.role},process.env.SECRETKEY,{expiresIn:"1d"})
    res.cookie("token",token,{expiresIn:"1d"});
    res.status(200).json({
        token,
        user,
        msg:"login success of admin"
      })
    }
    else{
        return  res.status(400).json({
            msg:"incorrect details"
          })

    }
    }else{
        return res.status(400).json({
            msg:"User not found"
        })
    }

}

//signoutcontrol
const signoutcontrol=async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message:"signout successfully"

    })



}

module.exports={signupcontrol,signincontrol,signoutcontrol}
