import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Rating } from '../components/Rating'
import  products  from '../products'

export const ProductScreen = ( { match } ) => {
    
    const product = products.find(p=>p._id===match.params.id)

    return (
        <>
            <Link className="btn btn-dark my-3 rounded" to="/">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
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
                                <Button className="btn-block" type='button' disabled={product.countInStock>0?false:true}>
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
