import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminUpdateUser, getUserDetailsByAdmin } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { FormLogin } from '../components/FormLogin'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { Form, Button } from 'react-bootstrap'
import { USER_UPDATE_RESET } from '../constants/userConstants'

export const EditScreen = ({match, history}) => {

    const uid = match.params.id

    const userDetailsByAdmin = useSelector(state => state.userDetailsByAdmin)
    const { loading, error, user } = userDetailsByAdmin

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success } = userUpdate

    const [name, setName] = useState('')
    
    const [email, setEmail] = useState('')

    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(success){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/users')
        }
        else{
            if(!user || !user.name || user._id!==uid){
                dispatch(getUserDetailsByAdmin(uid))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[user, dispatch, success])

    const submitHandlerAdmin = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({_id:uid, name, email, isAdmin}))
    }

    return (
        <>
            <Link to='/admin/users' className='btn btn-dark my-3'>
                Go Back
            </Link>
            <h3>Update User Access</h3>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            :(
            <FormLogin onSubmit={submitHandlerAdmin}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} disabled></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                </Form.Group>
                <Button type='submit' variant='primary' onClick={e => submitHandlerAdmin(e)} >Update</Button>
            </FormLogin>
            )}
        </>
    )
}
