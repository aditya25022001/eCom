import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import { Link } from 'react-router-dom'

// import { Meta } from '../components/Meta'

import { Paginate } from '../components/Paginate'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { ProductCarousel } from '../components/ProductCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'

export const HomeScreen = ({ match }) => {
    
    const keyWord = match.params.keyword

    const pageNumber = match.params.pageNumber || 1
    
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyWord, pageNumber))
    }, [dispatch, keyWord, pageNumber])
    
    return (
        <>
   
   {/* React helmet not working */}
            {/* <Meta /> */}
            {!keyWord ? (
            <>
                <h2>Top rated books!</h2>
                <ProductCarousel/>
            </>
            ) : <Link to="/" className='btn btn-dark rounded mb-2' >Go Back</Link> }
            <h2>Explore more books!</h2>
            { loading ? ( <Loader /> ) 
                    : error 
                    ? ( <Message variant='danger'>{error}</Message> ) 
                    : ( <>    
                            <Row>
                                {products.map( product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product}/>
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyWord={keyWord ? keyWord : ''} view='home'/>
                        </>
                    )   
            }
        </>
    )
}
