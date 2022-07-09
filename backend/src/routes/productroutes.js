const express=require("express");
const router=express.Router();
const multer=require("multer")

const { addproduct,getallproductsbyslug} = require("../controllers/productcontrol");
const { verifyuser, adminmiddleware } = require("../middlewares/middleware");

const shortid=require("shortid");
const path=require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),"uploads"));
    },
    filename:function(req,file,cb){
        cb(null, shortid.generate() + "-"+ file.originalname);
        // cb(null, file.fieldname + "-"+ Date.now());
    }
})

const upload=multer({storage});

  //for single file
// router.post("/create",verifyuser,adminmiddleware,upload.single('productpicture'),addproduct);

//for multiple files
router.post("/create",verifyuser,adminmiddleware,upload.array('productpictures'),addproduct);
router.get("/products/:slug",getallproductsbyslug);

module.exports=router;
