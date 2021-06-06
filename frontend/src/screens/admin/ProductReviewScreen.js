import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import MetaData from '../../components/MetaData'
import { useAlert } from 'react-alert'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { PRODUCT_DELETE_REVIEW_RESET } from '../../constants/productConstants'
import FormContainer from '../../components/FormContainer'

const ProductReviewScreen = () => {
    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviewsList);
    const { isDeleted, error: deleteError } = useSelector(state => state.productReviewDelete)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: PRODUCT_DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, productId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
        dispatch(getProductReviews(productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <Button variant='danger' className="btn-sm py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </Button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <h1 className="my-3">Product Reviews</h1>
                    <FormContainer>
                        <Col md={5}>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='productId'>
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Product ID'
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                ></Form.Control>
                                </Form.Group>
                                <Button
                                    id="search_button"
                                    type="submit"
                                    variant="primary"
                                    className="btn-block py-2"
                                >
                                    SEARCH
                                </Button>
                            </Form>
                        </Col>
                    </FormContainer>

                    {reviews && reviews.length > 0 ? (
                        <MDBDataTable
                            data={setReviews()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            responsive
                        />
                    ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}
                </Col>
            </Row>
            
        </Fragment>
    )
}

export default ProductReviewScreen
