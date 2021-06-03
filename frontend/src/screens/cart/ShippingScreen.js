import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'
import MetaData from '../../components/MetaData'

const ShippingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || "")
    const [city, setCity] = useState(shippingAddress.city || "")
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "")
    const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo || "");
    const [country, setCountry] = useState("Canada")

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country, phoneNo }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <MetaData title={"Shipping"} />
        <CheckoutSteps step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
                type='phone'
                placeholder='Enter phone number'
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            Continue
            </Button>
        </Form>
        </FormContainer>
    )
}

export default ShippingScreen
