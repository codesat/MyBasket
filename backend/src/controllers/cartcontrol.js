const Cart=require("../../src/models/cartmodel")


const additemtocart=(req,res)=>{

    Cart.findOne({user:req.user._id})
    .exec((err,cart)=>{
        if(err) return res.status(400).json({err});
        if(cart){
            //if cart already exits then update its qunatity
            //  res.status(200).json({
            //     cart
            // })

            const newproduct=req.body.cartitems.product;

            //solving duplicacy of items in cart
            const item=cart.cartitems.find((c)=>c.product==newproduct);

            let condition, update;

            if(item){
                condition={"user":req.user._id,"cartitems.product":newproduct};
                update={
                    "$set":{
                        "cartitems.$":{
                            ...req.body.cartitems,
                            quantity:item.quantity + req.body.cartitems.quantity
                        }
                    }
                };

                Cart.findOneAndUpdate(condition,action)
                .exec((err,cart2)=>{

                    if(err){return res.status(400).json({
                        err
                    })}
                    if(cart2){
                        return res.status(200).json({
                            cart2
                        })
                    }
                })

            }else{
                let condition, action;
                condition={user:req.user._id};
                action={
                    "$push":{
                        "cartitems":req.body.cartitems
                    }
                };

                Cart.findOneAndUpdate(condition,action)
                .exec((err,cart)=>{

                    if(err){return res.status(400).json({
                        err
                    })}
                    if(cart){
                        return res.status(200).json({
                            cart
                        })
                    }

                })

            }
        }else{
             //create new cart
            const cart=new Cart({
                user:req.user._id,
                cartitems:[req.body.cartitems]

            })
            cart.save((err,cartdata)=>{
                if(err){return res.status(400).json({
                    err
                })}

                if(cartdata){
                    return res.status(200).json({
                        cartdata
                    })
                }
            })
        }
    })
}

module.exports={additemtocart}