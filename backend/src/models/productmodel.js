const mongoose=require("mongoose");

const productschema=new mongoose.Schema({

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
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    quantity:{
        type:Number,
        required:true
    },
    productpictures:[
        {
            img:{
                type:String
            }
        }
    ],
    category:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Category",
         required:true,

       },

    reviews:[
        {
            //foreign key
           userid: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
           review:String
        }
    ],
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    updatedat:Date,

},{timestamps:true});

module.exports=mongoose.model("Product",productschema);
