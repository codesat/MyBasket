const express=require("express");
const router=express.Router();
const {additemtocart} = require("../controllers/cartcontrol");
const { verifyuser, usermiddleware } = require("../middlewares/middleware");


router.post("/addtocart",verifyuser,usermiddleware,additemtocart);


module.exports=router;

