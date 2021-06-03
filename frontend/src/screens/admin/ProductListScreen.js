import React, { Fragment, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { MDBDataTable } from 'mdbreact'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { PRODUCT_DELETE_RESET } from '../../constants/productConstants'
import MetaData from '../../components/MetaData'

const ProductListScreen = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, products } = useSelector(state => state.productList);
    const { error: deleteError, isDeleted } = useSelector(state => state.productDelete)

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    useEffect(() => {
        dispatch(getAdminProducts());

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: PRODUCT_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.countInStock,
                actions: <Fragment>
                    <LinkContainer to={`/admin/product/${product._id}`}>
                        <Button variant='info' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                        </Button>
                    </LinkContainer>

                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                    >
                        <i className='fas fa-trash'></i>
                  </Button>

                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <h1 className="my-3">All Products</h1>

                    {loading ? 
                        <Loader /> 
                        : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                        <MDBDataTable
                            data={setProducts()}
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

export default ProductListScreen
