import React, { useState, useEffect, Fragment } from 'react'
import { Button, Row, Col, Figure } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import MetaData from '../../components/MetaData'

const ProfileScreen = () => {

    const { loading, error, user } = useSelector((state) => state.auth)

    return (
        <Fragment>
            <MetaData title={"My Profile"} />
            {loading ? <Loader /> : 
            error ? (
                <Message variant='danger'>{error}</Message>
                ) : (
                    <Fragment>
                        <h2 className="mt-5 ml-5">My Profile</h2>
                        {/* <MetaData title={'Your Profile'} /> */}

                        <Row className="justify-content-around mt-5 user-info">
                            
                                <Col md={3} sm={12} className="text-center">
                                    <Figure className='avatar avatar-profile'>
                                        <Figure.Image className="rounded-circle img-fluid" src='/images/default_avatar.jpg' alt={user.name} />
                                    </Figure>
                                    <LinkContainer to="/profile/update" id="edit_profile">
                                        <Button className='btn-md w-100 my-5' variant='warning'>Edit Profile</Button>
                                    </LinkContainer>
                                </Col>
                        
                                <Col md={5} sm={12}>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                        
                                    <h4>Email Address</h4>
                                    <p>{user.email}</p>

                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>

                                    {!user.isAdmin && (
                                        <LinkContainer to="/orders/me">
                                            <Button className='btn-md w-100 my-3' variant='info'>My Orders</Button>
                                        </LinkContainer>
                                    )}

                                    <LinkContainer to="/password/update">
                                        <Button className='btn-md w-100 my-3' variant='danger'>
                                            Change Password
                                        </Button>
                                    </LinkContainer>
                                </Col>
                            </Row>
                     
                    </Fragment>
                
            )}
        </Fragment>
    )
}

export default ProfileScreen
