import User from '../models/userModel.js' 
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js'
import Product from '../models/productModel.js'


//description      authenticate the user and get token
//route            POST/api/users/login
//access           public
const authUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;
    
    const user = await User.findOne({ email:email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

//description      get user profile
//route            GET/api/users/profile
//access           private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//description      Register user
//route            POST/api/users
//access           public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body;
    
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, 
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//description      update user profile
//route            PUT/api/users/profile
//access           private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(user.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
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

//descrption   Get logged in users orders
//route        GET/api/profile/orders
//access       private
const getMyOrders = asyncHandler(async (req,res) => {
    const data = await Order.find({ user:req.user._id })
    console.log(data)
    res.json([...data])
})

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
        product.name = req.body.name || product.name
        product.category = req.body.category || product.category
        product.price = req.body.isAdmin || product.price
        product.countInStock = req.body.countInStock || product.countInStock
        product.publisher = req.body.publisher || product.publisher
        product.description = req.body.description || product.description
        const updatedProduct =  await product.save()
        res.json({
            _id:updatedProduct._id,
            name:updatedProduct.name,
            category:updatedProduct.category,
            price:updatedProduct.price,
            countInStock:updatedProduct.countInStock,
            publisher:updatedProduct.publisher,
            description:updatedProduct.description,
        })
    }
    else{
        res.status(404)
        throw new Error('product not found')
    }

})

export { authUser, getUserProfile, registerUser, updateUserProfile, getMyOrders, getUsers, deleteUser, getUserById, updateUserAccess, getProductListByAdmin }