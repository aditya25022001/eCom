import Product from '../models/productModel.js' 
import asyncHandler from 'express-async-handler'
import products from '../data/products.js'


//description      fetch products
//route            GET/api/products?keyword=keyword
//access           public
const getProducts = asyncHandler(async (req, res) => {
    
    const pageSize = 6
    
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name:{ 
            $regex:req.query.keyword,
            $options:'i'    //case insensitive
        }
    } : {}

    const count = await Product.count({ ...keyword })

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
     
    res.json(products)
})


//description       fetch single product
//route             GET/api/product/id
//access            Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('product not found')

    }
})

//description    add product reviews
//route         POST/api/products/:id/review
//access        private
const addReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const { rating, comment } = req.body
    if(product){
        const alreadyReviewed = product.reviews.find(r => r.name.toString() === req.user.name.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error("Already reviewed")
        }
        else{
            const review={
                name:req.user.name,
                rating:Number(rating),
                comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating+acc,0)/product.reviews.length
            const p = await product.save()
            res.status(201).json(p)
        }
    }
    else{
        res.status(404)
        throw new Error("Not")
    }
})

export { getProductById, getProducts, addReview }