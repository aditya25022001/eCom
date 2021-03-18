import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsByAdmin } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { ListGroup, Image, Row, Col } from 'react-bootstrap'

export const ProductListAdminScreen = () => {

    const productListByAdmin = useSelector(state => state.productListByAdmin)
    const { loading, error, products } = productListByAdmin

    const dispatch = useDispatch()

    const rupee = String.fromCharCode(8377)

    useEffect(() => {
        dispatch(listProductsByAdmin())
        console.log(products);
    },[dispatch])


    return (
        <>
        <h3>Products We Have!</h3>
        {loading && <Loader/>}
        {error && <Message variant='danger'>{error}</Message>}
        <ListGroup>
            {products && 
                products.map(product =>(
                    <ListGroup.Item>
                        <Row md={8}>
                            <Col md={4}>
                                <Image src={product.image} md={6} rounded/>
                            </Col>
                            <Col>
                                <Row>Category : {product.category}</Row>
                                <Row>Title : {product.name}</Row>
                                <Row>Price : {rupee}{product.price}</Row>
                                <Row>In Stock : {product.countInStock}</Row>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
        </>

    )
}
