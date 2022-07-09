const express=require("express");
const app=express();
const bodyParser=require("body-parser");
require("dotenv").config();
const connectdb=require("../backend/src/database/db");
const cors=require("cors")

const path=require("path")

const userroutes=require("../backend/src/routes/userroutes");
const adminroutes=require("./src/routes/admin/adminuseroutes");
const categoryroutes=require("../backend/src/routes/categoryroute");
const productroutes=require("../backend/src/routes/productroutes");
const cartroutes=require("../backend/src/routes/cartroutes");
const initialdataroutes=require("../backend/src/routes/admin/initialdataroutes")
const pageroutes=require("../backend/src/routes/admin/pageroutes")


//*********middlwares**********//
app.use(cors());
app.use(express.json());
app.use("/public/",express.static(path.join(__dirname,"uploads")));

// app.use(bodyParser.urlencoded({extended: true}));


// //api with get method
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         msg:"Hello from server"
//     })
// })

// //api with post method
// app.post("/data",(req,res)=>{
//     res.status(200).json({
//         msg:req.body
//     })
// })

//routes
app.use("/api/user",userroutes);
app.use("/api",adminroutes);
app.use("/api",categoryroutes);
app.use("/api/product",productroutes);
app.use("/api/cart",cartroutes);
app.use("/api",initialdataroutes);
app.use("/api",pageroutes);

app.listen(process.env.PORT,()=>{
    connectdb();
    console.log("server started at "+ process.env.PORT);

})




