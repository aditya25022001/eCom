import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsByAdmin, deleteProductByAdmin } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { ListGroup, Image, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Paginate } from '../components/Paginate'
import AddIcon from '@material-ui/icons/Add';

export const ProductListAdminScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1  

    const productListByAdmin = useSelector(state => state.productListByAdmin)
    const { loading, error, products, page, pages } = productListByAdmin

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = deleteProduct

    const dispatch = useDispatch()

    const style={
        fontWeight:600,
        color:'black'
    }

    const rupee = String.fromCharCode(8377)

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!userInfo.isAdmin){
                history.push('/')
            }
            else{
                dispatch(listProductsByAdmin(pageNumber))
            }
        }
    },[dispatch, userInfo, history, successDelete, pageNumber])

    const deleteProductHandler = (id) => {
        if(window.confirm()){
            dispatch(deleteProductByAdmin(id))
        }
    }

    return (
        <>
        <h3>Products We Have!</h3>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message>{errorDelete}</Message>}
        {loading && <Loader/>}
        {error && <Message variant='danger'>{error}</Message>}
        <ListGroup>
            {products && 
                products.map(product =>(
                    <ListGroup.Item key={product._id} style={{ border:'0.5px ridge rgb(219,219,219)'}} className='my-1'>
                        <Row md={8} sm={0}>
                            <Col md={4}>
                                <Image src={product.image} md={6} rounded/>
                            </Col>
                            <Col>
                                <Row><b style={style}>Category : </b> {product.category}</Row>
                                <Row><b style={style}>Title : </b> {product.name}</Row>
                                <Row><b style={style}>Publisher : </b> {product.publisher}</Row>
                                <Row><b style={style}>Description : </b> {product.description.split(" ").slice(0,20).toString().replace(/,/g,' ')}...</Row>
                                <Row><b style={style}>Price : </b> {rupee}{product.price}</Row>
                                <Row><b style={style}>In Stock : </b> {product.countInStock}</Row>
                                <Row className='my-3'>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='mx-2 rounded'>
                                            <i className="fas fa-edit"/>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='rounded' variant='danger' onClick={e => deleteProductHandler(product._id)}>
                                        <i className="fas fa-trash"/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))
            }
            <LinkContainer to="/admin/addproduct">
                <Button className='btn btn-dark my-2 text-align-center'>
                    <AddIcon/>
                    <b style={{color:'white', fontWeight:600}} >Add Item</b>
                </Button>
            </LinkContainer>
        </ListGroup>
        <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin}/>
        </>

    )
}
