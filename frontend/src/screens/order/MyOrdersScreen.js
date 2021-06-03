import React, { useEffect, Fragment } from 'react'
import {MDBDataTable} from 'mdbreact'
import {Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyOrders } from '../../actions/orderActions'
import MetaData from '../../components/MetaData'

const MyOrdersScreen = () => {
    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector(state => state.orderListMy)

    useEffect(() => {
        dispatch(listMyOrders());
        
    }, [dispatch])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Paid',
                    field: 'isPaid',
                    sort: 'asc'
                },
                {
                    label: 'Delivered',
                    field: 'isDelivered',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                createdAt: order.createdAt.substring(0,10),
                amount: `$${order.totalPrice}`,
                isPaid: order.isPaid
                    ? <p style={{ color: 'green' }}>{order.paidAt.substring(0,10)}</p>
                    : <i style={{ color: 'red' }} className='fas fa-times'></i>,
                isDelivered: order.isDelivered
                    ? <p style={{ color: 'green' }}>{order.deliveredAt.substring(0,10)}</p>
                    : <i style={{ color: 'red' }} className='fas fa-times'></i>,
                actions:
                    <LinkContainer to={`/order/${order._id}`} className="btn btn-primary">
                        <Button className='btn-sm' variant='info'><i className="fa fa-eye"></i></Button>
                    </LinkContainer>
            })
        });

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <Loader /> 
            : error ? (
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

        </Fragment>
    )
}

export default MyOrdersScreen
