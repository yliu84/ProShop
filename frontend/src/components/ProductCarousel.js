import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import {listTopProducts, clearErrors} from '../actions/productActions'
import {useAlert} from 'react-alert'

const ProductCarousel = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(listTopProducts())

    }, [dispatch, error, alert])

    return loading ? (
        <Loader />
    ) : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.images[0].url} alt={product.name} fluid className="d-block mx-auto" />
                        <Carousel.Caption className='carousel-caption'>
                        <h2>
                            {product.name} (${product.price})
                        </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
