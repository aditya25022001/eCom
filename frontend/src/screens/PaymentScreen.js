import React, {useState} from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {FormLogin} from '../components/FormLogin.js';
import { savePaymentMethod } from '../actions/cartActions'
import { CheckoutSteps } from '../components/CheckoutSteps'

export const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)

    const {shippingAddress} = cart;
    
    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormLogin>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Row className='my-3'>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal'
                            onChange={ e=> setPaymentMethod(e.target.value)}
                        />
                        </Row>
                        <Row className='my-3'>
                        <Form.Check 
                            type='radio' 
                            label='BHIM UPI' 
                            id='upi' 
                            name='paymentMethod' 
                            value='upi'
                            onChange={ e=> setPaymentMethod(e.target.value)}
                        />
                        </Row>
                        <Row className='my-3'>
                        <Form.Check 
                            type='radio' 
                            label='Pay on delivery' 
                            id='cod' 
                            name='paymentMethod' 
                            value='cod'
                            onChange={ e=> setPaymentMethod(e.target.value)}
                        />
                        </Row>
                    </Col>
                </Form.Group>
                <Button type="submit" variant='primary'>Proceed</Button>
            </Form>
        </FormLogin>
    )
}
