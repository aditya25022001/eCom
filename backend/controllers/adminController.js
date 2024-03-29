import User from '../models/userModel.js' 
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

//description      get all users
//route            GET/api/admin/users
//access           private/admin
const getUsers = asyncHandler(async (req, res) => {
    const pageSize = 5
    const page = Number(req.params.pageNumber) || 1
    const count = await User.countDocuments({})
    const users = await User.find({}).limit(pageSize).skip(pageSize*(page-1))
    res.json({users, page, pages:Math.ceil(count/pageSize)})
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
    
    const pageSize = 6
    const page = Number(req.params.pageNumber) || 1
    const count = await Product.countDocuments({})
    const products = await Product.find({}).limit(pageSize).skip(pageSize*(page-1))
    
    if(products){
        res.json({products, page, pages:Math.ceil(count/pageSize)})
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

    const { name, category, price, countInStock, description, publisher, image} = req.body
    if(product){
        product.name = name,
        product.category = category
        product.price = price
        product.countInStock = countInStock
        product.publisher = publisher
        product.description = description
        product.image = image
        
        const updatedProduct =  await product.save()
        
        res.json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('product not found')
    }

})

//description       delete a product
//route             DELETE/api/admin/deleteproduct/:id
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

//description        add a product
//route              POST/api/admin/addproduct
//access             private/admin
const addProduct = asyncHandler(async(req, res) => {
    const { name, category, price, countInStock, description, publisher, image} = req.body;
    // const product = new Product({
    //     user:req.user._id,
    //     name:name,
    //     category:category,
    //     price:price,
    //     countInStock:countInStock,
    //     description:description,
    //     publisher:publisher,
    //     image:image
    // })
    const createdProduct = await Product.create({
        user:req.user._id,
        name:name,
        category:category,
        price:price,
        countInStock:countInStock,
        description:description,
        publisher:publisher,
        image:image
    })
    res.status(201).json(createdProduct)
})

//description       get all orders
//route            GET/api/admin/orders
//access           private/admin
const getOrdersByAdmin = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = Number(req.params.pageNumber) || 1
    const count = await Order.countDocuments({})
    const orders = await Order.find({}).limit(pageSize).skip(pageSize*(page-1)).populate('user', 'id name')
    if(orders){
        res.json({orders, page, pages:Math.ceil(count/pageSize)})
    }
    else{
        res.status(401)
        throw new Error("Not authorized")
    }
})

//description     get order details by admin
//route           GET/api/admin/view/order/:id/:name
//access          private/admin
const getOrderDetailsByAdmin = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    const { orderItems } = order
    if(order){
        res.json(orderItems)
    }
    else{
        res.status(404)
        throw new Error("Not found")
    }
})

//description      get details to mark delivered
//route            GET/api/admin/order/:id/edit
//access           private admin
const getOrderDetailsForUpdate = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error("Not found")
    }
})

//description    update order as delivered
//route          PUT/api/admin/order/:id/edit
//access         private/admin
const updateOrderStatus = asyncHandler(async (req,res) => {
   
    const order = await Order.findById(req.params.id)

    order.isDelivered = req.body.delivered

    order.deliveredAt = Date.now()

    const updatedOrder = await order.save() 
   
    if(order){
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error("Not found")
    }
})

export {getUsers, deleteUser, getUserById, updateUserAccess, getProductListByAdmin, getProductById, updateProductDetails, deleteProduct, addProduct, getOrdersByAdmin, getOrderDetailsByAdmin, getOrderDetailsForUpdate, updateOrderStatus}