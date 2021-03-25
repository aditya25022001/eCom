import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Rating } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'

export const ProductScreen = ( { history, match } ) => {

    const [Quantity, setQuantity] = useState("1")

    const [rating, setRating] = useState(0)
    
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const reviewProduct = useSelector(state => state.reviewProduct)
    const { loading:loadingReview, error:errorReview, success } = reviewProduct

    useEffect( () => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?Quantity=${Quantity}`)
    }

    return (
        <>
            <Link className="btn btn-dark my-3 rounded" to="/">Go Back</Link>
            { loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Row>
                <Col md={3}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4} className='mr-5'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : {String.fromCharCode(8377)}{product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description</strong> : {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} outOff={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>        
                    </ListGroup>
                </Col> 
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>{String.fromCharCode(8377)}{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Availability:</Col>
                                    <Col>
                                        {product.countInStock>0 ? 'In Stock' : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.countInStock > 0 &&  (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col style={{ textAlign:'center' }}>Quantity</Col>
                                            <Col className='ml-5'>
                                                <Form.Control
                                                    style={{ width:'100px' }}
                                                    as='select' 
                                                    value={`${Quantity}`}
                                                    onChange={e => setQuantity(`${e.target.value}`)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}> {x + 1} </option>
                                                        ))
                                                    }         
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    )
                                }
                                <Button 
                                    className="btn-block my-2" 
                                    type='button' 
                                    disabled={product.countInStock>0?false:true}
                                    onClick={addToCartHandler}
                                    >
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h4>Reviews</h4>
                    {product.reviews.length ===0 && <Message variant='primary' >No Reviews</Message>}
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Write a review</h4>
                            {userInfo ? (<h1></h1>) : <Message variant='danger'>Please <Link to="/login">Sign In</Link> to write a review</Message>} 
                        </ListGroup.Item>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <b>{review.name}</b>
                                <Rating rating={review.rating}/>
                                <p>
                                    {review.createdAt.slice(0,10)}
                                </p>
                                <p>
                                    {review.comment}
                                </p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
        </>
    )
}
