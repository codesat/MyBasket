const express=require("express");
const router=express.Router();
const {signupcontrol,signincontrol,signoutcontrol}=require("../../controllers/admin/admincontrol");
const { verifyuser } = require("../../middlewares/middleware");
const validator=require("../../validators/authvalidator");


//LOGIN
 router.post("/admin/signin",
 validator.validatesigninrequest,
 validator.isrequestvalidated,
 signincontrol);
//SIGNUP
router.post("/admin/signup",
validator.validatesignuprequest,
validator.isrequestvalidated
,signupcontrol);

router.post("/admin/signout",signoutcontrol);


module.exports=router;