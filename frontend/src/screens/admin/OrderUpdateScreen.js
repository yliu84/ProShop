import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Sidebar from './Sidebar'
import MetaData from '../../components/MetaData'
import {
  getOrderDetails,
  deliverOrder,
} from '../../actions/orderActions'
import {
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'


const OrderUpdateScreen = ({ match }) => {
    const orderId = match.params.id


    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading: loadingOrder, error } = orderDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
    
    const { user } = useSelector((state) => state.auth)

    if (!loadingOrder) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        
        if (!order || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId)) 
        } 

    }, [dispatch, error, orderId, successDeliver, order])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return <Fragment>
                <MetaData title={`Process Order # ${order && order._id}`} />
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>

                    <Col md={10}>
                        <Link to='/admin/orders' className='btn btn-light my-3'>
                            &lt; Go Back
                        </Link>

                        <Fragment>
                            {loadingOrder ? (
                                <Loader />
                            ) : error ? (
                                <Message variant='danger'>{error}</Message>
                            ) : (
                                <Fragment>
                                    <h1>Order {order._id}</h1>
                                    <Row>
                                        <Col lg={7}>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                            <h2>Shipping</h2>
                                            <p>
                                                <strong>Name: </strong> {order.user.name}
                                            </p>
                                            <p>
                                                <strong>Email: </strong>{' '}
                                                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                                            </p>
                                            <p>
                                                <strong>Address: </strong>
                                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                                {order.shippingAddress.postalCode},{' '}
                                                {order.shippingAddress.country}
                                            </p>
                                            {order.isDelivered ? (
                                                <Message variant='success'>
                                                Delivered on {order.deliveredAt}
                                                </Message>
                                            ) : (
                                                <Message variant='warning'>Not Delivered</Message>
                                            )}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                            <h2>Payment Method</h2>
                                            <p>
                                                <strong>Method: </strong>
                                                {order.paymentMethod}
                                            </p>
                                            {order.isPaid ? (
                                                <Message variant='success'>Paid on {order.paidAt}</Message>
                                            ) : (
                                                <Message variant='warning'>Not Paid</Message>
                                            )}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                            <h2>Order Items</h2>
                                            {order.orderItems.length === 0 ? (
                                                <Message>Order is empty</Message>
                                            ) : (
                                                <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col lg={2} md={1} xs={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                        </Col>
                                                        <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                        </Col>
                                                        <Col md={4} xs={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                    </ListGroup.Item>
                                                ))}
                                                </ListGroup>
                                            )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                        </Col>
                                        <Col lg={4}>
                                        <Card>
                                            <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <h2>Order Summary</h2>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                <Col>Items</Col>
                                                <Col>${order.itemsPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                <Col>Shipping</Col>
                                                <Col>${order.shippingPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                <Col>Tax</Col>
                                                <Col>${order.taxPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                <Col>Total</Col>
                                                <Col>${order.totalPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            
                                            {loadingDeliver && <Loader />}
                                            {user &&
                                                user.isAdmin &&
                                                order.isPaid &&
                                                !order.isDelivered && (
                                                <ListGroup.Item>
                                                    <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={deliverHandler}
                                                    >
                                                        Mark As Delivered
                                                    </Button>
                                                </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Card>
                                        </Col>
                                    </Row>
                                </Fragment>
                            )}
                        </Fragment>
                    </Col>
                </Row>
            </Fragment>
    
    
    
}

export default OrderUpdateScreen
