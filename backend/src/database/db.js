const mongoose=require("mongoose");
require("dotenv").config();


const connectdb=async()=>{
       try{
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            });

            console.log("connected to mongodb");
       }catch(err){
        console.log(err);
       }

}

module.exports=connectdb;