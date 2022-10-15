const ErrorHander = require("../utils/errorhander")

module.exports= (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
//    wrong Mongodb id error
if(err.name === "CastError"){
    const message =`Resource not found. Invalid: ${err.path}`;
    err = new ErrorHander(message,400)
}
//    Mongoose duplicate key error
if(err.code === 11000){
    const message =`Duplicate ${Object.keys(err.keyValue)}Entered`;
    err = new ErrorHander(message,400)
}

// Wrong JWT error
if(err.code === "JsonWebTokenError"){
    const message =`Json Web Token is Invalid, try Again`;
    err = new ErrorHander(message,400)
}
// JWT EXPIRE error
if(err.code === "TokenExpireError"){
    const message =`Json Web Token is Expired,try Again`;
    err = new ErrorHander(message,400)
}
    res.status(err.statusCode).json({
        success:true,
        error:err.message,
    })
}