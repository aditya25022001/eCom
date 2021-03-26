import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { Loader } from './Loader'
import { Message } from './Message'
import { Rating } from './Rating'
import { listTopProducts } from '../actions/productActions'

export const ProductCarousel = () => {

    const dispatch = useDispatch()

    const topProducts = useSelector(state => state.topProducts)
    const { loading, error, products } = topProducts

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading ? <Loader/> 
                    : error ? <Message variant='danger'>{error}</Message>
                            :(
                                <Carousel pause='hover' className='bg-dark' fade>
                                    {products.map(product => (
                                        <Carousel.Item key={product._id}>
                                            <Link to={`/product/${product._id}`}>
                                                <Image src={product.image} alt={product.name} fluid/>
                                                <Carousel.Caption className='carousel-caption'>
                                                    <h3>{product.name} {String.fromCharCode(8377)}{product.price}</h3>
                                                    <Rating rating={product.rating}></Rating>
                                                </Carousel.Caption>
                                            </Link>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )
}
