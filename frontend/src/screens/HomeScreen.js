import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import MetaData from '../components/MetaData'

const HomeScreen = ({match}) => {

    const [currentPage] = useState(1)
    const [price] = useState([1, 1000])
    const [category] = useState('')
    const [rating] = useState(0)

    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage, price, category, rating))
    },[dispatch, keyword, currentPage, price, category, rating])

    return (
        <Fragment>
            <MetaData title={'Buy Best Products Online'} />
            <ProductCarousel />
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Row>
                {
                    products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                            <Product product={product} />
                        </Col>
                    ))
                }
            </Row>
            )}
            
        </Fragment>
    )
}

export default HomeScreen
