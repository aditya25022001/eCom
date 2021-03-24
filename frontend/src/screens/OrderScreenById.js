import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailsByAdmin } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { ListGroup, Image, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const OrderScreenById = ({history, match}) => {

    const oid = match.params.id
    const nameUrl = match.params.name

    const orderDetailsByAdmin = useSelector(state => state.orderDetailsByAdmin)
    const { loading, error, order } = orderDetailsByAdmin

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const style={
        fontWeight:600,
        color:'black'
    }

    const rupee = String.fromCharCode(8377)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrderDetailsByAdmin(oid, nameUrl))
        }
        else{
            if(!userInfo){
                history.push('/login')
            }
            else{
                history.push('/')
            }
        }
    },[dispatch, oid])

    return (
        <>
            <h3>{nameUrl}'s orders</h3>
            <Link to="/admin/orders" className="btn btn-dark my-3 rounded" >
                Go Back
            </Link>
            { loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : (<ListGroup>
                {order && 
                    order.map(eachOrder =>(
                        <ListGroup.Item key={eachOrder._id} style={{ border:'0.5px ridge rgb(219,219,219)'}} className='my-1'>
                            <Row md={8} sm={0}>
                                <Col md={4}>
                                    <Image src={eachOrder.image} md={3} sm={4} rounded/>
                                </Col>
                                <Col>
                                    <Link to={`/product/${eachOrder.product}`}>
                                        <Row><b style={style}>Product Id : </b> {eachOrder.product}</Row>
                                    </Link>
                                    <Row><b style={style}>Product Name : </b> {eachOrder.name}</Row>
                                    <Row><b style={style}>Product Price : </b> {rupee}{eachOrder.price}</Row>
                                    <Row><b style={style}>Quantity Ordered : </b> {eachOrder.Quantity}</Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>)
            }
        </>
        )
    }
