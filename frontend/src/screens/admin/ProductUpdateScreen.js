import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Sidebar from './Sidebar'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from '../../constants/productConstants'
import { listProductDetails, updateProduct, clearErrors } from '../../actions/productActions'
import MetaData from '../../components/MetaData'

const ProductUpdateScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [images, setImages] = useState([])

    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product, loading } = useSelector(state => state.productDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.productUpdate);

    const productId = match.params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch({ type: PRODUCT_DETAILS_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId]);

    const onChange = e => {

        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('countInStock', countInStock);
        formData.set('brand', brand);

        images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(updateProduct(product._id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <Link to='/admin/products' className='btn btn-light my-3'>
                        &lt; Go Back
                    </Link>

                    <FormContainer>
                        <h1>Edit Product</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading ? (
                        <Loader />
                        ) : (
                        <Form onSubmit={submitHandler} encType='multipart/form-data'>
                            <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='images'>
                                <Form.Label>Images</Form.Label>
                                <Form.File
                                    id='image-file'
                                    label='Choose Images'
                                    custom
                                    onChange={onChange}
                                    multiple
                                ></Form.File>

                                {oldImages && oldImages.map(img => (
                                    <Image key={img.public_id} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                ))}

                                {imagesPreview.map(img => (
                                    <Image src={img} key={img.public_id} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                ))}
                            </Form.Group>

                            <Button type='submit' variant='primary' disabled={updateLoading ? true : false}>
                                Update
                            </Button>
                        </Form>
                        )}
                </FormContainer>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ProductUpdateScreen
