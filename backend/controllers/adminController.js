import User from '../models/userModel.js' 
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//description      get all users
//route            GET/api/admin/users
//access           private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//description      delete a user 
//route            DELETE/api/admin/deleteuser/:id
//access           private/admin
const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.send(true)
    }
    else{
        res.status(404)
        throw new Error('User does not exist')
    }
})

//description        get user by ID
//route              GET/api/admin/user/:id
//access             private/admin
const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//description      Update user access by admin
//route            PUT/api/admin/user/:id/edit
//access           private/admin
const updateUserAccess = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.name = user.name
        user.email = user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser =  await user.save()
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

})

//description     get product list
//route           GET/api/admin/products
//access           private/admin
const getProductListByAdmin = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    if(products){
        res.json(products)
    }
    else{
        res.status(401)
        throw new Error('Not Authorized')
    }
})

//description        get product by ID
//route              GET/api/admin/product/:id
//access             private/admin
const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//description      Update user access by admin
//route            PUT/api/admin/user/:id/edit
//access           private/admin
const updateProductDetails = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = req.body.name ? req.body.name : product.name
        product.category = req.body.category ? req.body.category: product.category
        product.price = req.body.price ? req.body.price : product.price
        product.countInStock = req.body.countInStock ? req.body.countInStock : product.countInStock
        product.publisher = req.body.publisher ? req.body.publisher : product.publisher
        product.description = req.body.description ? req.body.description : product.description
        product.image = req.body.image ? req.body.image : product.image
        console.log(req.body)
        const updatedProduct =  await product.save()
        res.json({
            body:req.body,
            _id:updatedProduct._id,
            name:updatedProduct.name,
            category:updatedProduct.category,
            price:updatedProduct.price,
            countInStock:updatedProduct.countInStock,
            publisher:updatedProduct.publisher,
            description:updatedProduct.description,
            image:updatedProduct.image
        })
    }
    else{
        res.status(404)
        throw new Error('product not found')
    }

})

//description       delete a product
//route             /api/admin/deleteproduct/:id
//access            private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.send(true)
    }
    else{
        res.status(404)
        throw new Error("Product not found")
    }
})

export {getUsers, deleteUser, getUserById, updateUserAccess, getProductListByAdmin, getProductById, updateProductDetails, deleteProduct}