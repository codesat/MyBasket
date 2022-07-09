const mongoose=require("mongoose");

const categoryschema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String

    },
    categoryimage:{
        type:String,
        default:null
    },
    parentid:{
        type:String,
    }
},{timestamps:true});

module.exports=mongoose.model("Category",categoryschema);
