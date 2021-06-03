import asyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import Product from '../models/productModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import APIFeatures from '../utils/apiFeatures.js'

// @desc    Fetch all products
// @route   GET /api/v1/products?keyword=apple&category=Laptops
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const productsCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(Product.find(), req.query)
                              .search()
                              .filter()

  let products = await apiFeatures.query
  let filteredProductsCount = products.length

  apiFeatures.pagination(pageSize)

  products = await apiFeatures.query
  res.status(200).json({
      success: true,
      productsCount,
      filteredProductsCount,
      pageSize,
      products
  })
})

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product){
    return next(new ErrorHandler('Product not found', 404))
  }

  res.json(product)

})

// @desc    Get all products (Admin)
// @route   GET /api/v1/admin/products
// @access  Private/Admin
const getAdminProducts = asyncHandler(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

// @desc    Create a product
// @route   POST /api/v1/admin/product/new
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  let images = [];

  if(Number(req.body.countInStock) < 0 || !Number.isInteger(Number(req.body.countInStock))){
      return next(new ErrorHandler('The stock number must be greater than 0', 400));
  }

  if(typeof req.body.images === 'string'){
      images.push(req.body.images);
  }else{
      images = req.body.images;
  }

  let imageLinks = [];

  if(images === undefined){
    return next(new ErrorHandler('You have to upload at least 1 images', 400));
  }

  for(let i = 0; i < images.length; i++){
      const result = await cloudinary.v2.uploader.upload(images[i],{
          folder: 'products'
      });

      imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url
      });
  }
  
  req.body.images = imageLinks;
  req.body.user = req.user.id;
  
  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  })
})

// @desc    Update a product
// @route   PUT /api/v1/admin/product/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = [];

    if(Number(req.body.countInStock) < 0 || !Number.isInteger(Number(req.body.countInStock))){
        return next(new ErrorHandler('The stock number must be greater than 0', 400));
    }

    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }

    if(images !== undefined){
        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });

})

// @desc    Delete a product
// @route   DELETE /api/v1/admin/product/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product){
      return next(new ErrorHandler('Product not found', 404));
  }

  await product.remove()
  res.status(200).json({
      success: true,
      message: 'Product is deleted.'
  });
 
})

// @desc    Create new review
// @route   POST /api/product/:id/review
// @access  Private
const createProductReview = asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    if(Number(rating) == 0){
        return next(new ErrorHandler('The rating must be greater than 0', 400));
    }

    if(comment === ''){
        return next(new ErrorHandler('The comment cannot be empty', 400));
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      return next(new ErrorHandler('Product already reviewed', 400));
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save({validateBeforeSave: false})

    res.status(201).json({
        success: true
    })
  
})

// @desc    Get product reviews
// @route   GET /api/v1/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if(!product){
      return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})

// @desc    Delete product review
// @route   DELETE /api/v1/review
// @access  Private
const deleteReview = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
      return next(new ErrorHandler('Product not found', 404))
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numReviews = reviews.length;

    const rating = reviews.length > 0 ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0.0;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        rating,
        numReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    });
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(5)

  res.status(200).json(products)
})

export {
  getProducts,
  getProductById,
  getAdminProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getTopProducts
}