const jwt=require("jsonwebtoken");
const User = require("../models/usermodel");
require("dotenv").config();

const multer=require("multer")
const shortid=require("shortid");
const path=require("path");


const verifyuser=async(req,res,next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            //decodes token id
            const decoded=jwt.verify(token,process.env.SECRETKEY);
            req.user=await User.findById(decoded.id);
            next();

        }catch(err){
            res.status(401).json({
                err:err
            })
        }
    }

    if(!token){
        return res.status(401).json({
            msg:"no token provided"
        });

    }

}
const usermiddleware=(req,res,next)=>{

    if(req.user.role!=="user"){
        return res.status(400).json({
            msg:"User access denied"
        })
    }
    next();

}
const adminmiddleware=(req,res,next)=>{

    if(req.user.role!=="admin"){
        return res.status(400).json({
            msg:"Admin access denied"
        })
    }
    next();

}


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),"uploads"));
    },
    filename:function(req,file,cb){
        cb(null, shortid.generate() + "-"+ file.originalname);
        // cb(null, file.fieldname + "-"+ Date.now());
    }
})


 const upload=multer({storage});


module.exports={verifyuser,usermiddleware,adminmiddleware,upload}