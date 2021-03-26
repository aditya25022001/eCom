import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { SearchBar } from './SearchBar'
import { Route } from 'react-router-dom'

export const Header = () => {
    
    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin )
    const {userInfo} = userLogin; 
    
    const logOuthandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ECom</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    
                    {/**Study about this more */}
                    <Route render={({ history }) => <SearchBar history={history}/>}/>
                    
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>
                        {
                        userInfo 
                        ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile' >
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logOuthandler}>
                                    Logout
                                </NavDropdown.Item>                            
                            </NavDropdown>
                        ) 
                        :   (
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i>Sign in</Nav.Link>
                            </LinkContainer>
                            )
                        }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="Admin" id='adminMenu'>
                                <LinkContainer to='/admin/users' >
                                    <NavDropdown.Item>
                                        Users
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/products/page/1' >
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orders' >
                                    <NavDropdown.Item>
                                        Orders
                                    </NavDropdown.Item>
                                </LinkContainer>                         
                            </NavDropdown>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
