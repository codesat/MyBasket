const express=require("express");
const router=express.Router();
const { addcategory, getallcategory, updatecategory, deletecategories} = require("../controllers/categorycontrol");
const { verifyuser, adminmiddleware } = require("../middlewares/middleware");
const {upload}=require("../middlewares/middleware")

router.post("/category/create",verifyuser,adminmiddleware,upload.single("categoryimage"),addcategory);
router.get("/categories",getallcategory);
router.put("/categories/update",verifyuser,adminmiddleware,upload.array("categoryimage"),updatecategory);
router.delete("/categories/delete",verifyuser,adminmiddleware,deletecategories);

//for single image
// router.put("/categories/update",upload.single("categoryimage"),updatecategory);

module.exports=router;
