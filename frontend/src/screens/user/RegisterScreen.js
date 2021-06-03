import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { register, clearErrors } from '../../actions/userActions'
import MetaData from '../../components/MetaData'

const RegisterScreen = ({ location, history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = user
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.auth)
    const { loading, error, isAuthenticated } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }
        if(error){
            window.setTimeout(()=>{
                dispatch(clearErrors())
            },4000)  
        }
    }, [history, isAuthenticated, redirect, dispatch, error])

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(register(user))
        }
    }
    
    return (
        <FormContainer>
            <MetaData title={"Register"} />
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    required
                    onChange={onChange}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    required
                    value={email}
                    onChange={onChange}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    required
                    placeholder='Enter password'
                    value={password}
                    onChange={onChange}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    name='confirmPassword'
                    required
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
                </Col>
            </Row>
            </FormContainer>
    )
}

export default RegisterScreen
