const User=require("../models/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const {validationResult}=require("express-validator")
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
                username:shortid.generate()
            });

         await newuser.save((err,userdata)=>{

            if(err){
                return res.status(400).json({
                    msg:"error in user creation"
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
                msg:"User already exits"
            })
        }
    }

//signin

const signincontrol=async(req,res)=>{

    const loggeduser=await User.findOne({email:req.body.email});

    if(loggeduser){

        //password compare
    const matchpass=await bcrypt.compare(req.body.password,loggeduser.password);

    if(matchpass){
      return  res.status(200).json({
        token:jwt.sign({id:loggeduser._id,role:loggeduser.role},process.env.SECRETKEY,{expiresIn:"1d"}),
        msg:"login success"
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


module.exports={signupcontrol,signincontrol}