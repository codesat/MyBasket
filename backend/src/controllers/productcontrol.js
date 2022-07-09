const Product=require("../models/productmodel");
const slugify=require("slugify");
const Category=require("../models/categorymodel")


const addproduct=(req,res)=>{

    //for multiple files
    // res.status(200).json({ file:req.files, body:req.body});
    //for single file
    // res.status(200).json({ file:req.file, body:req.body});


    const {name,price,description,productpictures,category,quantity,createdby}=req.body;


    let productpics=[];

    if(req.files.length>0){
       productpics= req.files.map(file=>{
            return {img:file.filename}
        });
    }else{
        return res.status(400).json({
            msg:"no pictures selected"
        })
    }


    const product=new Product({
        name,
        slug:slugify(name),
        price,
        description,
        category,
        productpictures:productpics,
        quantity,
        createdby: req.user._id
    });


product.save((err,productdata)=>{
    if(err){
        return res.status(400).json({
            err
        })
    }
    if(productdata){
        return res.status(200).json({
            product:productdata
        })
    }
});

}

const getallproductsbyslug=(req,res)=>{

    const {slug}=req.params;
    console.log(slug)
    Category.findOne({slug:slug})
    .select("_id")
    .exec((err,category)=>{
        if(err)
        {
            return res.status(400).json({err})
        }

        if(category){
            Product.find({category:category._id})
            .exec((err,products)=>{

                if(err){
                    return res.status(400).json({
                        err
                    })
                }

            if(products.length>0){

                res.status(200).json({
                    products,productsbyprice:{
                        under5k:products.filter(product=>product.price<=5000),
                        under10k:products.filter(product=>product.price>5000 && product.price<=10000),
                        under15k:products.filter(product=>product.price>10000 && product.price<=15000),
                        under20k:products.filter(product=>product.price>15000 && product.price<=20000),
                        under30k:products.filter(product=>product.price>20000 && product.price<=30000),
                    }
                })
            }
            })

            res.status(200).json({
                category
            })

        }



    })






}

module.exports={addproduct,getallproductsbyslug};