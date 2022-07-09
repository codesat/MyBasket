const express=require("express");
const router=express.Router();
const {signupcontrol,signincontrol}=require("../controllers/usercontrol");
const {verifyuser}=require("../middlewares/middleware");
const validator=require("../validators/authvalidator")

//SIGNUP
router.post("/signup",
validator.validatesignuprequest,
validator.isrequestvalidated
,signupcontrol);
//LOGIN
 router.post("/signin",signincontrol);



module.exports=router;