import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Sidebar from './Sidebar'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { newProduct } from '../../actions/productActions'
import MetaData from '../../components/MetaData'

const ProductCreateScreen = ({history}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [images, setImages] = useState([])
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

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.productCreate);

    useEffect(() => {

        if (success) {
            history.push('/admin/products');
            alert.success('Product created successfully');
            dispatch({ type: PRODUCT_CREATE_RESET })
        }

    }, [dispatch, alert, success, history])

    const onChange = e => {

        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
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
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <Link to='/admin/products' className='btn btn-light my-3'>
                        &lt; Go Back
                    </Link>

                    <FormContainer>
                        <h1>New Product</h1>
                        {error && <Message variant='danger'>{error}</Message>}
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

                                {imagesPreview.map(img => (
                                    <Image src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                ))}
                            </Form.Group>

                            <Button type='submit' variant='primary' disabled={loading ? true : false}>
                                Create
                            </Button>
                        </Form>
                        
                </FormContainer>
                </Col>
            </Row>
            
        </Fragment>
    )
}

export default ProductCreateScreen
