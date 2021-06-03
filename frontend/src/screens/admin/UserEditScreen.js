import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from '../../constants/userConstants'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Sidebar from './Sidebar'
import FormContainer from '../../components/FormContainer'
import MetaData from '../../components/MetaData'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const alert = useAlert()
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const { error: errorUpdate, isUpdated, loading: loadingUpdate } = useSelector(state => state.user);

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }

        if (isUpdated) {
            alert.success('User updated successfully');
            history.push('/admin/users');
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: USER_UPDATE_RESET })
        }

    }, [dispatch, alert, history, isUpdated, userId, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('isAdmin', isAdmin);

        dispatch(updateUser(user._id, formData));
    }

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <Link to='/admin/users' className='btn btn-light my-3'>
                        &lt; Go Back
                    </Link>

                    <FormContainer>
                        <h1>Edit User</h1>
                        {loadingUpdate && <Loader />}
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                        )}
                    </FormContainer>
                </Col>
            </Row>
            
        </Fragment>
    )
}

export default UserEditScreen
