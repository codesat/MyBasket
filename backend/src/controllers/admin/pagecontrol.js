const Page=require("../../models/pagemodel")

const Createpage=(req,res)=>{
    const {banners,products}=req.files;

    console.log(req.body)

    if(banners.length>0){
       req.body.banners=banners.map((banner,index)=>({
            img:`$/public/banner.filename`,
            navigateTo:`/bannerclicked?categoryid=${req.body.category}&type=${req.body.type}`
        }))
    }
    if(products.length>0){
       req.body.products=products.map((product,index)=>({
            img:`$/public/product.filename`,
            navigateTo:`/productclicked?categoryid=${req.body.category}&type=${req.body.type}`
        }))
    }


    req.body.createdby=req.user._id;
    Page.findOne({category:req.body.category})
    .exec((error,page)=>{
        if(error) return res.status(400).json({error});
        if(page){
            Page.findOneAndUpdate({category:req.body.category},req.body)
            .exec((err,updatedpage)=>{
                if(err) return res.status(400).json({err})
                if(updatedpage){
                    return res.status(200).json({page:updatedpage});
                }
            })
        }else{
            const page=new Page(req.body);
                console.log(req.body)
                page.save((err,page)=>{
                    if(err) return res.status(400).json({err})
                    if(page){
                        return res.status(200).json({page})
                    }
                })
        }
    })
}


const getPage=(req,res)=>{
    const {category,type}=req.params;
    if(type==="page"){
        Page.findOne({category:category})
        .exec((err,page)=>{
            if(err) return res.status(400).json({err})
            if(page) return res.status(200).json({page})
        })
    }
}
module.exports={Createpage,getPage}