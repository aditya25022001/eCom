import React, {useState, useEffect} from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../components/Message';
import {Loader} from '../components/Loader'
import { getUserDetails, updateUserProfile, userMyOrders, login } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

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

   const userOrder = useSelector(state => state.myOrders)
   const { loading:loadingOrders, error:errorOrders, userOrders } = userOrder

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
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

    const reload = () => {
        window.location.reload()
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
                    <h1>My orders</h1>
                    <h1>{userOrders}</h1>
                </Col>
            </Row>
    )
}
