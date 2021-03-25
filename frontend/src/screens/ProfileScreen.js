import React, {useState, useEffect} from 'react'
import { Form, Row, Button, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {Message} from '../components/Message';
import {Loader} from '../components/Loader'
import { getUserDetails, updateUserProfile, userMyOrders } from '../actions/userActions'
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export const ProfileScreen = ({ location, history }) => {
   
   const [email, setEmail] = useState('')

   const [name, setName] = useState('')

   const [password, setPassword] = useState('')
   
   const [cnfPassword, setCnfPassword] = useState('')

   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const userDetails = useSelector(state => state.userDetails)
   const { loading, error, user } = userDetails

   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin

   const userUpdateProfile = useSelector(state => state.userUpdateProfile)
   const { success } = userUpdateProfile

   const userOrder = useSelector(state => state.userOrder)
   const { loading:loadingOrders, error:errorOrders, userOrders } = userOrder

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!user.name){
                dispatch(getUserDetails('profile'));
                dispatch(userMyOrders())
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password === '' || cnfPassword === '' || email === '' || name === ''){
            setMessage('All fields are necesary')
        }
        else{
            if(password!=cnfPassword){
                setMessage('Passwords must match')
            }
            else{
                dispatch(updateUserProfile({id:user._id, name, email, password}))
            }
        }
    }

    return (
            <Row>
                <Col md={3}>
                    <h2>Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Profile Updated! Sign in again to reflect changes</Message>}
                    {loading && <Loader></Loader>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={name} onChange={ e => setName(e.target.value) } ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email address" value={email} onChange={ e => setEmail(e.target.value) } ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value) } ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={cnfPassword} onChange={ e => setCnfPassword(e.target.value) } ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' >Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h3>My Orders</h3>
                    {loadingOrders 
                    ? <Loader/> 
                    : errorOrders 
                    ? <Message variant='danger'>{errorOrders}</Message> 
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>MORE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10) : 'Not Paid'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.slice(0,10) : 'Not Delivered'}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='dark'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                    }
                </Col>
            </Row>
    )
}
