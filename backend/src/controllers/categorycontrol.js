const slugify=require("slugify");
const Category=require("../models/categorymodel");
const {createCategories}=require("./admin/intialdatacontrol");
const shortid=require("shortid")


const addcategory=(req,res)=>{

    const categoryobj={
        name:req.body.name,
        slug:`${slugify(req.body.name)}-${shortid.generate()}`,
        categoryimage:req.body.categoryimage,
        createdby:req.user._id

    }
    // if(req.file){
    //     categoryobj.categoryimage=req.body.categoryimage;
    //     // console.log(categoryobj.categoryimage)
    // }
    if(req.body.parentid){
        categoryobj.parentid=req.body.parentid;
    }
    console.log(categoryobj)

    const cat=new Category(categoryobj);

    cat.save((err,category)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        if(category){
            return res.status(200).json({
                category
            })
        }

    });

}

const getallcategory=(req,res)=>{
    Category.find({})
    .exec((err,categories)=>{
        if(err){
            return res.status(400).json({err});
        }
        if(categories){
            const categorylist=createCategories(categories);
            return res.status(200).json({categorylist});
        }
    })

}

const updatecategory=async(req,res)=>{
    const {_id,name,parentid,type}=req.body;
    const updatedcategories=[];
    if(name instanceof Array){
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                type:[i],
            };

            if(parentid[i]!==""){
                category.parentid=parentid[i];
            }
           const updatedcategory=await Category.findOneAndUpdate({_id:_id[i]},category,{new:true});
           updatedcategories.push(updatedcategory);
        }
        return res.status(200).json({updatedcategories});
    }else{
        const  category={
            name,type
        };
        if(parentid!==""){
            category.parentid=parentid;
        }
        const updatedcategory=await Category.findOneAndUpdate({_id},category,{new:true});

        return res.status(200).json({updatedcategory});
    }
}


const deletecategories=async(req,res)=>{

    const {ids}=req.body.payload;
    console.log(ids);
    const deletedcategories=[];
    for(let i=0;i<ids.length;i++){
        console.log(ids[i]);
        const deletecategory=await Category.findOneAndDelete({_id:ids[i]._id,createdby:req.user._id});
        deletedcategories.push(deletecategory)
    }
    if(deletedcategories.length==ids.length){
        res.status(200).json({
            msg:"Ctaegories removed "
        })
    }else{
        res.status(400).json({
            msg:"some error occured in deleting "
        })
    }

}

module.exports={addcategory,deletecategories,getallcategory,updatecategory};