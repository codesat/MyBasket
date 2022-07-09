const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:'user'
    },

    contact:{
        type:String,
        // required:true,
        // unique:true
    },
    profilepic:{
        type:String
    },


},{timestamps:true});

module.exports=mongoose.model("User",userschema);