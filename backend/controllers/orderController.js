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

export {addOrderItems}