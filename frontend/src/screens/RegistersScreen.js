import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../components/Message';
import {Loader} from '../components/Loader'
import { register } from '../actions/userActions'
import {FormLogin} from '../components/FormLogin.js';

export const RegisterScreen = ({ location, history }) => {
   
   const [email, setEmail] = useState('')

   const [name, setName] = useState('')

   const [password, setPassword] = useState('')
   
   const [cnfPassword, setCnfPassword] = useState('')

   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const userRegister = useSelector(state => state.userRegister)

   const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'
 
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

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
                dispatch(register(name, email, password))
            }
        }
    }

    return (
        <FormLogin>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type='submit' variant='primary' >Sign Up</Button>
            </Form>
            <Row className='py-3' >
                <Col>
                    Already a customer ? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                </Col>
            </Row>
        </FormLogin>
    )
}
