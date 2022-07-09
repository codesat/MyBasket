const mongoose=require("mongoose");

const cartschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"User", required:true
    },
    cartitems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId, ref:"Product" , required:true},
            quantity:{type:Number, default:1},
            price:{type:Number, required:true}
        }
    ]



},{timestamps:true});

module.exports=mongoose.model("Cart",cartschema);
