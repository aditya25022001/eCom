import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Message } from '../components/Message' 
import { Loader } from '../components/Loader' 
import { usersList } from '../actions/userActions'

export const UserListScreen = ({history}) => {

    const listUser = useSelector(state => state.listUser)
    const {loading, error, users} = listUser

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
                dispatch(usersList())
            }
        }
    },[dispatch])

    const deleteUserHandler = (id) => {
        console.log(id)
    }

    return (
        <>
          <h1>Users</h1>
          {loading 
          ? <Loader/> 
          : error 
          ? <Message variant='danger'>{error}</Message>
          :(
              <Table striped responsive hover bordered className='table-sm'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>ADMIN</th>
                          <th>OPERATIONS</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map(user => (
                          <tr key={user._id}>
                              <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                              <td className='px-3'>
                                  <LinkContainer to={`/user/${user._id}/edit`}>
                                      <Button variant='dark' className='btn-sm'>
                                          <i className='fas fa-edit' />
                                      </Button>
                                  </LinkContainer>
                                  <Button className='btn-sm' variant='danger' onClick={() => deleteUserHandler(user._id)}>
                                      <i className='fas fa-trash'/>
                                  </Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          )
        }  
        </>
    )
}
