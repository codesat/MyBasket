const {check,validationResult}=require("express-validator");

exports.validatesignuprequest=[check('fname').notEmpty().withMessage('Firstname is required'),
check('lname').notEmpty().withMessage('Lasttname is required'),
check('email').notEmpty().withMessage('Email is required'),
check('password').isLength({min:6}).withMessage('Password is required of more than 6')
];

exports.validatesigninrequest=[
check('email').notEmpty().withMessage('Email is required'),
check('password').isLength({min:6}).withMessage('Password is required of more than 6')
];


exports.isrequestvalidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0)
    {
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();
}