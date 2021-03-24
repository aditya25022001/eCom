import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Message } from '../components/Message' 
import { Loader } from '../components/Loader' 
import { listOrdersByAdmin } from '../actions/userActions'
import Tooltip from '@material-ui/core/Tooltip';

export const OrderListScreen = ({history}) => {

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!userInfo.isAdmin){
                history.push('/')
            }
            else{
                dispatch(listOrdersByAdmin())
            }
        }
    },[dispatch,history,userInfo])

    const style={
        fontWeight:600,
        color:'black'
    }

    return (
        <>
          <h1>Orders</h1>
          {loading ? <Loader/>
          : error ? <Message variant='danger'>{error}</Message>
          :(
          <Table striped responsive hover bordered className='table-sm'>
                  <thead>
                      <tr>
                          <th>USER</th>
                          <th>ORDERED ON</th>
                          <th>ORDER ITEMS</th>
                          <th>PRICE</th>
                          <th>PAID</th>
                          <th>DELIVERED</th>
                          <th>OPERATIONS</th>
                      </tr>
                  </thead>
                  <tbody>
                      {orders.map(order => (
                          <tr key={order._id}>
                              <Tooltip title={order.user._id} placement="left">
                                <td>{order.user.name}</td>
                              </Tooltip>
                              <td>{order.createdAt.toString().slice(0,10)}</td>
                              <td>{order.orderItems.length}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.toString().slice(0,10) : 'NO'}</td>
                              <td>{order.isDelivered ? order.deliveredAt.toString().slice(0,10) : 'NO'}</td>
                              <td className='px-3'>
                                <LinkContainer to={`/admin/update/order/${order._id}`} disabled={order.isDelivered} > 
                                    <Button variant='dark' className='btn-sm'>
                                        <i className='fas fa-edit' />
                                    </Button>
                                </LinkContainer> 
                                <LinkContainer to={`/admin/view/order/${order._id}/${order.user.name}`}>
                                    <Button variant='dark' className='btn-sm'>
                                        <i className='fas fa-eye' />
                                    </Button>
                                </LinkContainer>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>)
          }
        </>
    )
}
