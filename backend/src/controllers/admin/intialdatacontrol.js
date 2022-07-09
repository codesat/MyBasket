
const Category=require("../../models/categorymodel")
const Product=require("../../models/productmodel")



const createCategories=(categories,parentid=null)=>{
    const categorylist=[];
    let category;
    if(parentid==null){
       category=categories.filter(cat=>cat.parentid==undefined);
    }else{
        category=categories.filter(cat=>cat.parentid==parentid);
    }

    for(let cate of category){
        categorylist.push(
            {
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentid:cate.parentid,
            children:createCategories(categories,cate._id),
            type:cate.type
        })
    }

    return categorylist;

}


const initialdatacontrol=async(req,res)=>{

    const categories=await Category.find({}).exec();
    const allproducts=await Product.find({})
    .select("_id name description productpictures price quantity category")
    .populate({path:"category",select:"_id name"}) //category related all datas
    .exec();
    res.status(200).json({
        categories:createCategories(categories)
        ,allproducts
    })

}


module.exports={initialdatacontrol,createCategories}