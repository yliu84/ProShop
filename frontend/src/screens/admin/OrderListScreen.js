import React, { Fragment, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { MDBDataTable } from 'mdbreact'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Sidebar from './Sidebar'
import MetaData from '../../components/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import {ORDER_DELETE_RESET} from '../../constants/orderConstants'

const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const { isDeleted, error: deleteError } = useSelector(state => state.orderDelete)

    useEffect(() => {
        dispatch(listOrders())

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully')
            history.push('/admin/orders')
            dispatch({ type: ORDER_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const deleteOrderHandler = (id) => {   
        if (window.confirm('Are you sure to delete this order?')) {
            dispatch(deleteOrder(id))
        }
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Paid',
                    field: 'paid',
                    sort: 'asc'
                },
                 {
                    label: 'Delivered',
                    field: 'delivered',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                paid: order.isPaid
                    ? <p style={{ color: 'green' }}>{order.paidAt.substring(0, 10)}</p>
                    : <i className='fas fa-times' style={{ color: 'red' }}></i>,
                delivered: order.isDelivered
                    ? <p style={{ color: 'green' }}>{order.deliveredAt.substring(0, 10)}</p>
                    : <i className='fas fa-times' style={{ color: 'red' }}></i>,
                actions: <Fragment>
                    <LinkContainer to={`/admin/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                            <i className="fa fa-eye"></i>
                        </Button>
                    </LinkContainer>
                    <Button variant='danger' className="btn-sm ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </Fragment>
            });
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <h1 className="my-3">Orders</h1>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <MDBDataTable
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            responsive
                        />
                    )}
                </Col>
            </Row>
        </Fragment>
    )
}

export default OrderListScreen
