import React, {useEffect} from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { Link } from 'react-router-dom';
import {orderCreate} from '../actions/orderActions'

export const PlaceorderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress, paymentMethod, cartItems} = cart

    const user = useSelector(state => state.userLogin)
    const {userInfo} = user

    const rupee = String.fromCharCode(8377)

    const addDecimal = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    cart.itemsPrice = addDecimal(cartItems.reduce((acc, item) => acc + item.price * item.Quantity,0))

    cart.shippingPrice = addDecimal(Number((0.01 * cart.itemsPrice).toFixed(2)))

    cart.taxPrice = addDecimal(Number((0.02 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = addDecimal(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice))

    const createOrder = useSelector(state => state.orderCreate)

    const { success, order, error } = createOrder 

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])

    const placeOrderHandler = (e) => {
        console.log(cartItems)
        dispatch(orderCreate({
            orderItems:cartItems,

            //use same variable names in the code which used in the database
            
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice:cart.itemsPrice,
            taxPrice:cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice,
        }))
    }

    return (
        <>
         <CheckoutSteps step1 step2 step3 step4/>
         <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Shipping to :</h3> 
                        <h6>{userInfo.name}</h6>
                    </ListGroup.Item>
                   
                    <ListGroup.Item>
                        <h3>Shipping address : </h3>
                        <h6>{shippingAddress.address} , {shippingAddress.city} , {shippingAddress.postalCode} , {shippingAddress.country}</h6>
                    </ListGroup.Item>
                   
                    <ListGroup.Item>
                        <h3>Payment : </h3>
                        <h6><b>Method : </b> {paymentMethod}</h6>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {cartItems.length === 0 
                            ?<Message>Your cart is empty</Message>
                            :(
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name} </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.Quantity} x {rupee}{item.price} = {rupee}{item.Quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>{rupee}{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{rupee}{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax applied</Col>
                                <Col>{rupee}{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>{rupee}{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
         </Row>   
        </>
    )
}
