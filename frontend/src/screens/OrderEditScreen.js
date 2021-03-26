import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailsByAdminForUpdate, adminUpdateOrder } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { FormLogin } from '../components/FormLogin'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { Form, Button } from 'react-bootstrap'
import { ADMIN_ORDER_UPDATE_RESET } from '../constants/userConstants'

export const OrderEditScreen = ({match, history}) => {

    const oid = match.params.id

    const orderDetailsForUpdate = useSelector(state => state.orderDetailsForUpdate)
    const { loading, error, order } = orderDetailsForUpdate

    const updateOrder = useSelector(state => state.updateOrder)
    const { loading:loadingUpdate, error:errorUpdate, success } = updateOrder

    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [paid, setPaid] = useState('')
    const [method, setMethod] = useState('')
    const [delivered, setDelivered] = useState('')

    const dispatch = useDispatch()

    useEffect(()=>{
        if(success){
            dispatch({type:ADMIN_ORDER_UPDATE_RESET})
            history.push('/admin/orders')
        }
        else{
            if(!order || order._id!==oid){
                dispatch(getOrderDetailsByAdminForUpdate(oid))
            }
            else{
                setAddress(order.shippingAddress.address+" "+order.shippingAddress.city+" "+order.shippingAddress.postalCode+" "+order.shippingAddress.country)
                setPrice(order.totalPrice)
                setPaid(order.isPaid)
                setMethod(order.paymentMethod)
                setDelivered(order.isDelivered)
            }
        }
    },[order, dispatch, success])

    const submitHandlerAdmin = (e) => {
        e.preventDefault()
        dispatch(adminUpdateOrder({_id:oid, delivered}))
    }

    return (
        <>
            <Link to='/admin/orders/page/1' className='btn btn-dark my-3'>
                Go Back
            </Link>
            <h3>Update Order Status</h3>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            :(
            <FormLogin onSubmit={submitHandlerAdmin}>
                <Form.Group controlId='address'>
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control type="address" value={address} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Amount Concerned</Form.Label>
                    <Form.Control type="price" value={price} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='paid'>
                    <Form.Label>Payment Done On User End</Form.Label>
                    <Form.Control type="price" value={paid} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='method'>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control type="price" value={method} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='delivered'>
                    <Form.Check label="Delivered" checked={delivered} onChange={e => setDelivered(e.target.checked)} />
                </Form.Group>
                <Button type='submit' variant='primary' onClick={e => submitHandlerAdmin(e)}>Update</Button>
            </FormLogin>
            )}
        </>
    )
}
