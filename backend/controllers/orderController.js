import Order from '../models/orderModel.js' 
import asyncHandler from 'express-async-handler'


//description      create new order
//route            POST/api/orders
//access           private
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No Order items')
    }
    else{
        const order = new Order({
            orderItems,
            user : req.user._id, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdorder = await order.save()
        res.status(201).json(createdorder)
    }
})


//description      get order by id
//route            GET/api/orders/:id
//access           private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user',' name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//description      update order paid or not
//route            PUT/api/orders/:id/pay
//access           private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log(order)
    if(order){
        order.isPaid=true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        console.log(updatedOrder)
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export {addOrderItems, getOrderById, updateOrderToPaid}