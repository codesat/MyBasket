const express=require("express");
const { Createpage ,getPage} = require("../../controllers/admin/pagecontrol");
const router=express.Router();
const {upload}=require("../../middlewares/middleware")
const { verifyuser,adminmiddleware }=require("../../middlewares/middleware")

router.post("/page/create",verifyuser,adminmiddleware,upload.fields([
    {name:"banners"},
    {name:"products"}
]),Createpage);

router.get("/page/:category/:type",getPage);


module.exports=router;
