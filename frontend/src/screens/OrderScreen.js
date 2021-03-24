import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import {Loader} from '../components/Loader'
import { Link } from 'react-router-dom';
import {getOrderDetails, payOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'

export const OrderScreen = ({match, history}) => {

    const [sdkReady, setSdkReady] = useState(false)

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const user = useSelector(state => state.userLogin)
    const {userInfo} = user

    const rupee = String.fromCharCode(8377)

    const addDecimal = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    if(!loading){
        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.Quantity,0))

        order.shippingPrice = addDecimal(Number((0.01 * order.itemsPrice).toFixed(2)))
    
        order.taxPrice = addDecimal(Number((0.02 * order.itemsPrice).toFixed(2)))
    
        order.totalPrice = addDecimal(Number(order.itemsPrice)+Number(order.shippingPrice)+Number(order.taxPrice))
    
    }

    useEffect(()=>{
        const addPayPalScript = async() => {
            const {data:clientID} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type='text/javascript'
            script.async =true
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientID}`
            script.onload = () => {setSdkReady(true)}
            document.body.appendChild(script)
        }
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!order || successPay){
                dispatch({type:ORDER_PAY_RESET})
                dispatch(getOrderDetails(orderId))
            }
            else if(!order.isPaid){
                    if(!window.paypal){
                        addPayPalScript()
                    }
                    else{
                        setSdkReady(true)
                    }
                }
        }
    },[order,orderId,dispatch,successPay, userInfo])

    const successPaymentHandler = (paymentResult) => {
        // console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }

    return  loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            :<>
                <h3>Order Details</h3>
                <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h5>Id:{order._id}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Shipping to :</h4> 
                        <h6>{userInfo.name}</h6>
                    </ListGroup.Item>
                   
                    <ListGroup.Item>
                        <h4>Shipping address : </h4>
                        <h6>{order.shippingAddress.address} , {order.shippingAddress.city} , {order.shippingAddress.postalCode} , {order.shippingAddress.country}</h6>
                        <p>
                            {order.isDelivered 
                                ? (<Message variant='success'>Delivered on : {order.deliveredAt.toString().slice(0,10)}</Message>) 
                                : (<Message variant='danger'>Not Delivered</Message>)
                            }
                        </p>
                   </ListGroup.Item>
                   
                    <ListGroup.Item>
                        <h4>Payment : </h4>
                        <p>
                        <h6><b>Method : </b> {order.paymentMethod}</h6>
                        </p>
                        <p>
                            {order.isPaid 
                                ? (<Message variant='success'>Paid on : {order.paidAt.toString().slice(0,10)}</Message>) 
                                : (<Message variant='danger'>Not paid</Message>)
                            }
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Order Items</h4>
                        {order.orderItems.length === 0 
                            ?<Message>No items in your orders</Message>
                            :(
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                <Col>Items Price</Col>
                                <Col>{rupee}{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>{rupee}{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax applied</Col>
                                <Col>{rupee}{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>{rupee}{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay  && <Loader/>}
                                {!sdkReady ? <Loader/> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                     </ListGroup>
                </Card>
            </Col>
         </Row>
            </>
        }
