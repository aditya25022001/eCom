import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

export const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        if(productId)
            dispatch(addToCart(productId, qty))
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 
                ? ( 
                    <Message 
                        variant="primary">
                        Your cart in is empty { }  
                        <Link to="/">
                            Go Back
                        </Link> 
                    </Message>

                ) 
                : (
                    <ListGroup variant="flush">

                    </ListGroup>
                ) }
            </Col>
            <Col md={2}>

            </Col>
            <Col md={2}>

            </Col>
        </Row>
    )
}
