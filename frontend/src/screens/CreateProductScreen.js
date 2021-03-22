import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormLogin } from '../components/FormLogin'
// import { getProductDetailsByAdmin } from '../actions/userActions'
import { addProduct } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const CreateProductScreen = ({history}) => {
    
    const [name, setName] = useState(" ")
    const [category, setCategory] = useState(" ")
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [publisher, setPublisher] = useState(" ")
    const [description, setDescription] = useState(" ")
    const [image, setImage] = useState(" ")

    const dispatch = useDispatch()

    const createProduct = useSelector(state=> state.createProduct)
    const { loading, error, success } = createProduct

    useEffect(()=>{
        if(success){
            history.push('/admin/products')
        }
    },[success, history])

    const createSubmitHandler = (e) => {
        e.preventDefault()
        console.log({name, category, price, countInStock, description, publisher, image});
        dispatch(addProduct(name, category, price, countInStock, description, publisher, image))
    }

    return (
        <>
            <Link to='/admin/products' className='btn btn-dark my-3'>
                Go Back
            </Link>
            <h3>Add new product</h3>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            <FormLogin onSubmit={createSubmitHandler}>
                <Form.Group>
                    <Form.File label='Product image' lang='en' custom onChange={e => setImage(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Product Name" onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Product Category" onChange={e => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Product price" onChange={e => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control type="number" placeholder="Product Count in stock" onChange={e => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='publisher'>
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Product publisher" onChange={e => setPublisher(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Product description" onChange={e => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' onClick={e => createSubmitHandler(e) }>Add</Button>
            </FormLogin>
        </>
    )
}
