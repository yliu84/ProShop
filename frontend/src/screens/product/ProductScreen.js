import React, { Fragment, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {Row, Col, Image, ListGroup, Button, Form, Carousel} from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  listProductDetails,
  createProductReview,
  clearErrors
} from '../../actions/productActions'
import {addToCart} from '../../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import MetaData from '../../components/MetaData'

const ProductScreen = ({match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const alert = useAlert()

    const {user} = useSelector(state => state.auth)

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview
    } = productReviewCreate

    useEffect(() => {
        if(successProductReview){
            alert.success('Review submitted successfully')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
            setComment('')
            setRating(0)
        }

        if(errorProductReview){
            alert.error(errorProductReview)
            dispatch(clearErrors())
        }

        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
        }
    }, [dispatch, match, product._id, errorProductReview, alert, successProductReview])

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        alert.success('Item Added to Cart')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <Fragment>
            <MetaData title={product.name} />
            <Link className='btn btn-light my-3' to='/'>
                &lt; Go Back
            </Link>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                <Fragment>
                    <Row>
                        <Col md={6}>
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <Image src={image.url} alt={product.title} fluid className="d-block mx-auto" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map(
                                            (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            )
                                            )}
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button 
                                        onClick={addToCartHandler} 
                                        className='btn-block' 
                                        type='button' 
                                        disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}> 
                                <Rating value={review.rating} />
                                <p>by <strong>{review.name}</strong> - {review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {loadingProductReview && <Loader />}
                                {user ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                            as='textarea'
                                            row='3'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='primary'
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </Message>
                                )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Fragment>
                )
            }
        </Fragment>
    )
}

export default ProductScreen
