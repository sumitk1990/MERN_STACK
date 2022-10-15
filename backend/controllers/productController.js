const Product = require("../models/productModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsynErrors")
const ApiFeatures = require("../utils/apifeatures")

// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product,
    })
})

// Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res,)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
   const apiFeature =  new ApiFeatures(Product.find(),req.query)
   .search()
   .filter().pagination(resultPerPage)
    const product = await apiFeature.query
     res.status(201).json({
         success:true,
         product,
         productCount,
     })
})



// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next (new ErrorHander("Product not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

// Update Product --Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next (new ErrorHander("Product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})
// Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next (new ErrorHander("Product not found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product delete success"
    })
})