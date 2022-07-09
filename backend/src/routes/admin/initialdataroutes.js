const express=require("express");
const router=express.Router();
const {initialdatacontrol}=require("../../controllers/admin/intialdatacontrol")
const { verifyuser, adminmiddleware } = require("../../middlewares/middleware");

router.post("/initial/initialdata",verifyuser,adminmiddleware,initialdatacontrol);


module.exports=router;
