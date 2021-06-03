import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Product from '../../components/Product'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listProducts } from '../../actions/productActions'

const SearchScreen = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating] = useState(0)

    const keyword = match.params.keyword

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, productsCount, pageSize, filteredProductsCount } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage, price, category, rating))
    },[dispatch, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if(keyword){
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Fragment>
                <Link className='btn btn-light my-3' to='/'>
                    &lt; Go Back
                </Link>
                <Row>
                    <Col md={3} className="col-6 mb-5">
                        <div className="px-5">

                            <div className="mt-5">
                                <h4 className="mb-3">
                                    Categories
                                </h4>
                                <ul className="pl-0">
                                    {categories.map(category =>(
                                        <li style={
                                                    {cursor: 'pointer',
                                                        listStyleType: 'none',}
                                                }
                                            key={category}
                                            onClick={() => setCategory(category)}>
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </Col>
                    <Col md={9}>
                        <Row>
                            {
                            products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} className='align-items-stretch d-flex'>
                                    <Product product={product} />
                                </Col>
                            ))
                            }
                        </Row>
                    </Col>
                </Row>
                {pageSize <= count && (
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={filteredProductsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                )}
            </Fragment>
            )}
            
        </Fragment>
    )
}

export default SearchScreen
