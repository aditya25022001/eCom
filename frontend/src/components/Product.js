import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Rating } from '../components/Rating';

export const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>{product.name}</Card.Title>
                </Link>
                <Card.Text as='div'>
                    <b style={{ fontWeight:600 }}>{product.publisher}</b>
                </Card.Text>
                <Card.Text as='div' className='my-2'>
                    <Rating
                        rating={product.rating}
                        outOff={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='h3' style={{ paddingBottom:'1rem' }}>
                    {String.fromCharCode(8377)}{product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
