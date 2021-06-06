import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap'
import { logout } from '../actions/userActions'
import {removeAllItemFromCart} from '../actions/cartActions'
import {useAlert} from 'react-alert'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {user, loading} = useSelector((state) => state.auth)
    const {cartItems} = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(removeAllItemFromCart())
        alert.success('Logged out successfully.');
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <span><i className="fas fa-shopping-cart"></i> Cart</span>
                                    <Badge pill variant="light" id="cart_count" className="ml-1">{cartItems.length}</Badge>
                                </Nav.Link>
                            </LinkContainer>
                            {user ? (
                                <NavDropdown title={user.name} id='username'>
                                <LinkContainer to='/orders/me'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer> 
                                <NavDropdown.Item onClick={logoutHandler} className="text-danger">
                                    Logout
                                </NavDropdown.Item>
                                </NavDropdown>
                            ) : !loading && (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                                </LinkContainer>
                            )}
                            {user && user.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/users'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/products'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/reviews'>
                                    <NavDropdown.Item>Reviews</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orders'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
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

export default Header
