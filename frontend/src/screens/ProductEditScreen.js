import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormLogin } from '../components/FormLogin'
import { getProductDetailsByAdmin } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Form, Button, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { adminUpdateProduct } from '../actions/userActions'
import {ADMIN_PRODUCT_UPDATE_RESET} from '../constants/userConstants'
 
export const ProductEditScreen = ({match, history}) => {

    const pid = match.params.id
    
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [publisher, setPublisher] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    
    const dispatch = useDispatch()
    
    const productDetailsByAdmin = useSelector(state => state.productDetailsByAdmin)
    const { loading, error, product } = productDetailsByAdmin
    
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success } = productUpdate
    
    useEffect(() =>{
        if(success){
            dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET })
            dispatch(getProductDetailsByAdmin(pid))
            history.push('/admin/products')
        }
        else{
            if(!product || product._id!==pid){
                dispatch(getProductDetailsByAdmin(pid))
            }
            else{
                setName(product.name)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setPrice(product.price)
                setCategory(product.category)
                setPublisher(product.publisher)
                setImage(product.image)
            }
        }
    },[dispatch, product, pid, success, history])
    
    const updateSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateProduct({_id:pid, name, category, price, description, countInStock, publisher, image}))
        console.log({name},{price},{category},{image},{description},{countInStock},{publisher})
    }
    
    //uploading file via muler but not working fine 
    // import axios from 'axios';
    // const [uploading, setUploading] = useState(false)
    // const uploadFileHandler = async (e) => {
        //     const file = e.target.files[0]
    //     const formData = new FormData()
    //     formData.append('image',file)
    //     setUploading(true)
    //     try {
    //         const config={
    //             headers:{
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //         const data = await axios.post('/api/upload', formData, config)
    //         setImage(data)
    //         setUploading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setUploading(false)
    //     }
    // }

    return (
        <>
            <Link to='/admin/products' className='btn btn-dark my-3'>
                Go Back
            </Link>
            <h3>Update Product Details</h3>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{error}</Message>}
            {loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            :(
            <FormLogin onSubmit={updateSubmitHandler}>
                <Form.Group controlId='image'>
                    <Image src={image} fluid className='mb-2' />
                    <Form.Control value={image} onChange={e=>setImage(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control type="number" value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='publisher'>
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" value={publisher} onChange={e => setPublisher(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} value={description} onChange={e => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' onClick={e => updateSubmitHandler(e)} >Update</Button>
            </FormLogin>
            )}
        </>
    )
}
